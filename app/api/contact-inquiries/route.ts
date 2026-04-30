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

type ContactInquiryRequestBody = Partial<{
  fullName: string;
  email: string;
  phone: string;
  trainingInterest: string;
  message: string;
  honeypot: string;
  elapsedMs: number | string;
}>;

type ContactInquiryInsert = {
  fullName: string;
  email: string;
  phone: string | null;
  trainingInterest: string | null;
  message: string;
};

type ParsedContactInquiryPayload =
  | { ok: true; inquiry: ContactInquiryInsert }
  | { ok: false; message: string };

function parseContactInquiryPayload(
  body: ContactInquiryRequestBody,
): ParsedContactInquiryPayload {
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

  const trainingInterest = normalizeOptionalText(body.trainingInterest, 120);

  if (isNonEmptyString(body.trainingInterest) && !trainingInterest) {
    return {
      ok: false,
      message: "Training interest must be 120 characters or less.",
    };
  }

  if (!isNonEmptyString(body.message)) {
    return { ok: false, message: "Message is required." };
  }

  const message = body.message.trim();

  if (message.length < 10 || message.length > 3000) {
    return {
      ok: false,
      message: "Message must be between 10 and 3000 characters.",
    };
  }

  return {
    ok: true,
    inquiry: {
      fullName,
      email,
      phone,
      trainingInterest,
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

  let body: ContactInquiryRequestBody;

  try {
    body = (await request.json()) as ContactInquiryRequestBody;
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

  const parsedPayload = parseContactInquiryPayload(body);

  if (!parsedPayload.ok) {
    return NextResponse.json(
      { message: parsedPayload.message },
      { status: 400 },
    );
  }

  const ipHash = getIpHash(request);
  const userAgent = getUserAgent(request);

  const rateLimited = await isRateLimited(supabase, {
    tableName: "contact_inquiries",
    ipHash,
  });

  if (rateLimited) {
    return NextResponse.json(
      { message: "Too many inquiry submissions. Please try again shortly." },
      { status: 429 },
    );
  }

  const { data, error } = await supabase
    .from("contact_inquiries")
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
    console.error("Supabase contact inquiry insert failed.", error);

    return NextResponse.json(
      { message: "Inquiry could not be saved." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message: "Inquiry received.",
      inquiryId: data.id,
    },
    { status: 201 },
  );
}
