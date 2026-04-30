import { NextResponse } from "next/server";
import { getClassBySlug } from "@/lib/sanity/classes";
import {
  getSupabaseAdminClient,
  type RegistrationInsert,
} from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

type RegistrationRequestBody = Partial<RegistrationInsert>;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseRegistrationPayload(
  body: RegistrationRequestBody,
): RegistrationInsert | null {
  const seats = Number(body.seats);

  if (
    !isNonEmptyString(body.classSlug) ||
    !isNonEmptyString(body.firstName) ||
    !isNonEmptyString(body.lastName) ||
    !isNonEmptyString(body.email) ||
    !isNonEmptyString(body.phone) ||
    !Number.isInteger(seats) ||
    seats < 1
  ) {
    return null;
  }

  return {
    classSlug: body.classSlug.trim(),
    firstName: body.firstName.trim(),
    lastName: body.lastName.trim(),
    email: body.email.trim(),
    phone: body.phone.trim(),
    seats,
    notes: isNonEmptyString(body.notes) ? body.notes.trim() : null,
  };
}

export async function POST(request: Request) {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { message: "Registration storage is not configured." },
      { status: 503 },
    );
  }

  let body: RegistrationRequestBody;

  try {
    body = (await request.json()) as RegistrationRequestBody;
  } catch {
    return NextResponse.json(
      { message: "Invalid registration request." },
      { status: 400 },
    );
  }

  const registration = parseRegistrationPayload(body);

  if (!registration) {
    return NextResponse.json(
      { message: "Please complete the required attendee fields." },
      { status: 400 },
    );
  }

  const trainingClass = await getClassBySlug(registration.classSlug);

  if (!trainingClass) {
    return NextResponse.json(
      { message: "Class could not be found." },
      { status: 404 },
    );
  }

  if (trainingClass.status === "soldOut" || trainingClass.status === "closed") {
    return NextResponse.json(
      { message: "Registration is not available for this class." },
      { status: 409 },
    );
  }

  const { data, error } = await supabase
    .from("registrations")
    .insert(registration)
    .select("id")
    .single();

  if (error) {
    console.error("Supabase registration insert failed.", error);

    return NextResponse.json(
      { message: "Registration could not be saved." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    id: data.id,
    message: "Registration request received.",
  });
}
