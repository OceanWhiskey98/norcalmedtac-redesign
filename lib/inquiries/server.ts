import { createHash } from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const defaultIpHashSalt = "norcalmedtac-inquiry";
const maxUserAgentLength = 512;

type RateLimitOptions = {
  ipHash: string | null;
  maxSubmissions?: number;
  tableName: "contact_inquiries" | "group_training_inquiries";
  windowMinutes?: number;
};

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidEmail(value: string): boolean {
  return emailPattern.test(value);
}

export function normalizeOptionalText(
  value: unknown,
  maxLength: number,
): string | null {
  if (!isNonEmptyString(value)) {
    return null;
  }

  const normalized = value.trim();

  if (normalized.length > maxLength) {
    return null;
  }

  return normalized;
}

export function getUserAgent(request: Request): string | null {
  const userAgent = request.headers.get("user-agent");
  const normalized = userAgent?.trim();

  if (!normalized) {
    return null;
  }

  return normalized.slice(0, maxUserAgentLength);
}

function getClientIp(request: Request): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  const realIp = request.headers.get("x-real-ip");
  return realIp?.trim() ? realIp.trim() : null;
}

export function getIpHash(request: Request): string | null {
  const ip = getClientIp(request);

  if (!ip) {
    return null;
  }

  const salt = process.env.INQUIRY_IP_HASH_SALT ?? defaultIpHashSalt;

  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export function hasSpamSignal(
  honeypot: unknown,
  elapsedMs: unknown,
  minimumElapsedMs = 1500,
): boolean {
  if (isNonEmptyString(honeypot)) {
    return true;
  }

  if (typeof elapsedMs === "number" && Number.isFinite(elapsedMs)) {
    if (elapsedMs > 0 && elapsedMs < minimumElapsedMs) {
      return true;
    }
  }

  if (isNonEmptyString(elapsedMs)) {
    const parsed = Number(elapsedMs);
    if (Number.isFinite(parsed) && parsed > 0 && parsed < minimumElapsedMs) {
      return true;
    }
  }

  return false;
}

export async function isRateLimited(
  supabase: SupabaseClient,
  options: RateLimitOptions,
): Promise<boolean> {
  if (!options.ipHash) {
    return false;
  }

  const windowMinutes = options.windowMinutes ?? 10;
  const maxSubmissions = options.maxSubmissions ?? 5;
  const cutoff = new Date(Date.now() - windowMinutes * 60_000).toISOString();

  const { count, error } = await supabase
    .from(options.tableName)
    .select("id", { count: "exact", head: true })
    .eq("ipHash", options.ipHash)
    .gte("createdAt", cutoff);

  if (error) {
    console.error("Inquiry rate-limit check failed.", error);
    return false;
  }

  return (count ?? 0) >= maxSubmissions;
}
