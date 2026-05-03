import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { RegistrationInsert } from "@/lib/supabase/server";

type ExistingRegistrationSeat = {
  seats: number | null;
};

type AtomicRegistrationRpcRow = {
  ok: boolean;
  registrationId: string | null;
  remainingSeats: number | null;
  errorCode: string | null;
  message: string | null;
};

type CreateRegistrationRequestAtomicInput = Pick<
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
> & {
  classCapacity: number;
  isWaitlistRequest: boolean;
};

export type CreateRegistrationRequestAtomicResult =
  | {
      ok: true;
      registrationId: string;
      remainingSeats: number | null;
      message: string | null;
    }
  | {
      ok: false;
      registrationId: null;
      remainingSeats: number | null;
      errorCode: string;
      message: string | null;
      error?: unknown;
    };

type RegistrationSeatCountResult = {
  seats: number;
  error: unknown | null;
};

type RemainingSeatsResult = {
  remainingSeats: number | null;
  registeredSeats: number;
  error: unknown | null;
};

export async function getRegisteredSeatCount(
  classSlug: string,
): Promise<RegistrationSeatCountResult> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return { seats: 0, error: new Error("Supabase is not configured.") };
  }

  const { data, error } = await supabase
    .from("registrations")
    .select("seats")
    .eq("classSlug", classSlug)
    .is("canceledAt", null)
    .in("registrationStatus", ["pending", "confirmed"]);

  if (error) {
    return { seats: 0, error };
  }

  const registeredSeats = (
    (data as ExistingRegistrationSeat[] | null) ?? []
  ).reduce((total, registration) => total + (registration.seats ?? 0), 0);

  return { seats: registeredSeats, error: null };
}

export async function getRemainingSeatsForClass(
  classSlug: string,
  capacity: number,
): Promise<RemainingSeatsResult> {
  const registeredSeatCount = await getRegisteredSeatCount(classSlug);

  if (registeredSeatCount.error) {
    return {
      remainingSeats: null,
      registeredSeats: registeredSeatCount.seats,
      error: registeredSeatCount.error,
    };
  }

  return {
    remainingSeats: Math.max(capacity - registeredSeatCount.seats, 0),
    registeredSeats: registeredSeatCount.seats,
    error: null,
  };
}

export async function createRegistrationRequestAtomic(
  input: CreateRegistrationRequestAtomicInput,
): Promise<CreateRegistrationRequestAtomicResult> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      ok: false,
      registrationId: null,
      remainingSeats: null,
      errorCode: "supabase_not_configured",
      message: "Registration storage is not configured.",
      error: new Error("Supabase is not configured."),
    };
  }

  const { data, error } = await supabase.rpc(
    "create_registration_request_atomic",
    {
      p_class_slug: input.classSlug,
      p_first_name: input.firstName,
      p_last_name: input.lastName,
      p_email: input.email,
      p_phone: input.phone,
      p_seats: input.seats,
      p_notes: input.notes,
      p_amount_due: input.amountDue,
      p_currency: input.currency,
      p_source: input.source,
      p_class_capacity: input.classCapacity,
      p_is_waitlist_request: input.isWaitlistRequest,
    },
  );

  if (error) {
    return {
      ok: false,
      registrationId: null,
      remainingSeats: null,
      errorCode: "rpc_error",
      message: "Registration could not be saved.",
      error,
    };
  }

  const row = Array.isArray(data)
    ? (data[0] as AtomicRegistrationRpcRow | undefined)
    : (data as AtomicRegistrationRpcRow | null);

  if (!row) {
    return {
      ok: false,
      registrationId: null,
      remainingSeats: null,
      errorCode: "rpc_empty_result",
      message: "Registration could not be saved.",
    };
  }

  if (!row.ok || !row.registrationId) {
    return {
      ok: false,
      registrationId: null,
      remainingSeats: row.remainingSeats ?? null,
      errorCode: row.errorCode ?? "rpc_rejected",
      message: row.message ?? "Registration could not be saved.",
    };
  }

  return {
    ok: true,
    registrationId: row.registrationId,
    remainingSeats: row.remainingSeats ?? null,
    message: row.message ?? null,
  };
}
