import { NextResponse } from "next/server";
import {
  isClassClosedToRequests,
  isClassRegistrationOpen,
  isClassWaitlist,
} from "@/lib/data";
import { getClassBySlug } from "@/lib/sanity/classes";
import {
  type RegistrationInsert,
} from "@/lib/supabase/server";
import { createRegistrationRequestAtomic } from "@/lib/supabase/registrations";

export const dynamic = "force-dynamic";

type RegistrationRequestBody = Partial<
  Pick<
    RegistrationInsert,
    | "classSlug"
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "seats"
    | "notes"
  >
> & {
  requestType?: "registration" | "waitlist";
};

type ParsedRegistration = Pick<
  RegistrationInsert,
  | "classSlug"
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "seats"
  | "notes"
>;

type ParsedRegistrationPayload =
  | { ok: true; registration: ParsedRegistration }
  | { ok: false; message: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatRemainingSeatMessage(remainingSeats: number): string {
  return `${remainingSeats} ${remainingSeats === 1 ? "seat" : "seats"} remaining for this class.`;
}

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

  if (isClassClosedToRequests(trainingClass.status)) {
    return NextResponse.json(
      { message: "Registration is not available for this class." },
      { status: 409 },
    );
  }

  const isWaitlistRequest = isClassWaitlist(trainingClass.status);
  const shouldCheckSeatAvailability =
    isClassRegistrationOpen(trainingClass.status);
  const registrationInsertBase: Pick<
    RegistrationInsert,
    | "classSlug"
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "seats"
    | "notes"
    | "amountDue"
    | "currency"
    | "source"
  > = {
    ...registration,
    amountDue: Math.round(trainingClass.price * registration.seats * 100),
    currency: "usd",
    source: "website",
  };

  const atomicResult = await createRegistrationRequestAtomic({
    ...registrationInsertBase,
    classCapacity: trainingClass.capacity,
    isWaitlistRequest,
  });

  if (!atomicResult.ok) {
    if (atomicResult.errorCode === "supabase_not_configured") {
      return NextResponse.json(
        { message: "Registration storage is not configured." },
        { status: 503 },
      );
    }

    if (atomicResult.errorCode === "insufficient_seats") {
      return NextResponse.json(
        {
          message: formatRemainingSeatMessage(atomicResult.remainingSeats ?? 0),
        },
        { status: 409 },
      );
    }

    if (atomicResult.errorCode === "invalid_input") {
      return NextResponse.json(
        { message: atomicResult.message ?? "Invalid registration request." },
        { status: 400 },
      );
    }

    console.error("Supabase atomic registration insert failed.", {
      errorCode: atomicResult.errorCode,
      error: atomicResult.error,
      message: atomicResult.message,
    });

    return NextResponse.json(
      { message: "Registration could not be saved." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    id: atomicResult.registrationId,
    message: isWaitlistRequest
      ? "Waitlist request received."
      : "Registration request received.",
    seatsRequested: registration.seats,
    seatsRemaining: shouldCheckSeatAvailability
      ? atomicResult.remainingSeats
      : null,
  });
}
