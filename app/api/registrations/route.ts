import { NextResponse } from "next/server";
import { getClassBySlug } from "@/lib/sanity/classes";
import {
  getSupabaseAdminClient,
  type RegistrationInsert,
} from "@/lib/supabase/server";
import { getRemainingSeatsForClass } from "@/lib/supabase/registrations";

export const dynamic = "force-dynamic";

type RegistrationRequestBody = Partial<RegistrationInsert>;

type ParsedRegistrationPayload =
  | { ok: true; registration: RegistrationInsert }
  | { ok: false; message: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function parseRegistrationPayload(
  body: RegistrationRequestBody,
): ParsedRegistrationPayload {
  const seats = Number(body.seats);

  if (!isNonEmptyString(body.classSlug)) {
    return { ok: false, message: "Class is required." };
  }

  if (!isNonEmptyString(body.firstName)) {
    return { ok: false, message: "First name is required." };
  }

  if (!isNonEmptyString(body.lastName)) {
    return { ok: false, message: "Last name is required." };
  }

  if (!isNonEmptyString(body.email)) {
    return { ok: false, message: "Email is required." };
  }

  if (!emailPattern.test(body.email.trim())) {
    return { ok: false, message: "Enter a valid email address." };
  }

  if (!isNonEmptyString(body.phone)) {
    return { ok: false, message: "Phone is required." };
  }

  if (!Number.isInteger(seats) || seats < 1 || seats > 10) {
    return { ok: false, message: "Seats must be a whole number from 1 to 10." };
  }

  return {
    ok: true,
    registration: {
      classSlug: body.classSlug.trim(),
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      seats,
      notes: isNonEmptyString(body.notes) ? body.notes.trim() : null,
    },
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

  const parsedPayload = parseRegistrationPayload(body);

  if (!parsedPayload.ok) {
    return NextResponse.json(
      { message: parsedPayload.message },
      { status: 400 },
    );
  }

  const { registration } = parsedPayload;

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

  const remainingSeatCount = await getRemainingSeatsForClass(
    registration.classSlug,
    trainingClass.capacity,
  );

  if (remainingSeatCount.error) {
    console.error(
      "Supabase registration seat lookup failed.",
      remainingSeatCount.error,
    );

    return NextResponse.json(
      { message: "Registration could not be saved." },
      { status: 500 },
    );
  }

  const remainingSeats = remainingSeatCount.remainingSeats ?? 0;

  if (registration.seats > remainingSeats) {
    return NextResponse.json(
      {
        message: `Only ${remainingSeats} seat(s) remaining for this class.`,
      },
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
    seatsRequested: registration.seats,
    seatsRemaining: remainingSeats - registration.seats,
  });
}
