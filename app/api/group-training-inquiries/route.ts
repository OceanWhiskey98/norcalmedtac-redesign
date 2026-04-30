import { NextResponse } from "next/server";
import {
  getIpHash,
  getUserAgent,
  hasSpamSignal,
  isNonEmptyString,
  isRateLimited,
  isValidEmail,
  normalizeOptionalText,
} from "@/lib/inquiries/server";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type GroupTrainingInquiryRequestBody = Partial<{
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  groupSize: number | string;
  trainingType: string;
  preferredDateRange: string;
  location: string;
  message: string;
  honeypot: string;
  elapsedMs: number | string;
}>;

type GroupTrainingInquiryInsert = {
  fullName: string;
  organization: string | null;
  email: string;
  phone: string | null;
  groupSize: number | null;
  trainingType: string | null;
  preferredDateRange: string | null;
  location: string | null;
  message: string;
};

type ParsedGroupTrainingInquiryPayload =
  | { ok: true; inquiry: GroupTrainingInquiryInsert }
  | { ok: false; message: string };

function parseGroupSize(value: unknown): number | null | "invalid" {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const numeric =
    typeof value === "number" ? value : Number(String(value).trim());

  if (!Number.isInteger(numeric) || numeric < 1 || numeric > 5000) {
    return "invalid";
  }

  return numeric;
}

function parseGroupTrainingInquiryPayload(
  body: GroupTrainingInquiryRequestBody,
): ParsedGroupTrainingInquiryPayload {
  if (!isNonEmptyString(body.fullName)) {
    return { ok: false, message: "Full name is required." };
  }

  const fullName = body.fullName.trim();

  if (fullName.length < 2 || fullName.length > 100) {
    return {
      ok: false,
      message: "Full name must be between 2 and 100 characters.",
    };
  }

  if (!isNonEmptyString(body.email)) {
    return { ok: false, message: "Email is required." };
  }

  const email = body.email.trim().toLowerCase();

  if (!isValidEmail(email)) {
    return { ok: false, message: "Enter a valid email address." };
  }

  const phone = normalizeOptionalText(body.phone, 25);

  if (isNonEmptyString(body.phone)) {
    const normalizedPhone = body.phone.trim();

    if (normalizedPhone.length < 7 || normalizedPhone.length > 25) {
      return {
        ok: false,
        message: "Phone must be between 7 and 25 characters.",
      };
    }
  }

  const organization = normalizeOptionalText(body.organization, 120);
  if (isNonEmptyString(body.organization) && !organization) {
    return {
      ok: false,
      message: "Organization must be 120 characters or less.",
    };
  }

  const groupSize = parseGroupSize(body.groupSize);
  if (groupSize === "invalid") {
    return {
      ok: false,
      message: "Group size must be a whole number from 1 to 5000.",
    };
  }

  const trainingType = normalizeOptionalText(body.trainingType, 120);
  if (isNonEmptyString(body.trainingType) && !trainingType) {
    return {
      ok: false,
      message: "Training type must be 120 characters or less.",
    };
  }

  const preferredDateRange = normalizeOptionalText(body.preferredDateRange, 120);
  if (isNonEmptyString(body.preferredDateRange) && !preferredDateRange) {
    return {
      ok: false,
      message: "Preferred date range must be 120 characters or less.",
    };
  }

  const location = normalizeOptionalText(body.location, 160);
  if (isNonEmptyString(body.location) && !location) {
    return {
      ok: false,
      message: "Location must be 160 characters or less.",
    };
  }

  if (!isNonEmptyString(body.message)) {
    return { ok: false, message: "Message is required." };
  }

  const message = body.message.trim();

  if (message.length < 10 || message.length > 4000) {
    return {
      ok: false,
      message: "Message must be between 10 and 4000 characters.",
    };
  }

  return {
    ok: true,
    inquiry: {
      fullName,
      organization,
      email,
      phone,
      groupSize,
      trainingType,
      preferredDateRange,
      location,
      message,
    },
  };
}

export async function POST(request: Request) {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { message: "Inquiry storage is not configured." },
      { status: 500 },
    );
  }

  let body: GroupTrainingInquiryRequestBody;

  try {
    body = (await request.json()) as GroupTrainingInquiryRequestBody;
  } catch {
    return NextResponse.json(
      { message: "Invalid inquiry request." },
      { status: 400 },
    );
  }

  if (hasSpamSignal(body.honeypot, body.elapsedMs)) {
    return NextResponse.json(
      { message: "Inquiry could not be accepted." },
      { status: 429 },
    );
  }

  const parsedPayload = parseGroupTrainingInquiryPayload(body);

  if (!parsedPayload.ok) {
    return NextResponse.json(
      { message: parsedPayload.message },
      { status: 400 },
    );
  }

  const ipHash = getIpHash(request);
  const userAgent = getUserAgent(request);

  const rateLimited = await isRateLimited(supabase, {
    tableName: "group_training_inquiries",
    ipHash,
  });

  if (rateLimited) {
    return NextResponse.json(
      { message: "Too many inquiry submissions. Please try again shortly." },
      { status: 429 },
    );
  }

  const { data, error } = await supabase
    .from("group_training_inquiries")
    .insert({
      ...parsedPayload.inquiry,
      status: "new",
      source: "website",
      userAgent,
      ipHash,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Supabase group training inquiry insert failed.", error);

    return NextResponse.json(
      { message: "Inquiry could not be saved." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message: "Group training inquiry received.",
      inquiryId: data.id,
    },
    { status: 201 },
  );
}
