import { getSupabaseAdminClient } from "@/lib/supabase/server";

type ExistingRegistrationSeat = {
  seats: number | null;
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
    .eq("classSlug", classSlug);

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
