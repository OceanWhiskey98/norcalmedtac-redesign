import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type RegistrationInsert = {
  amountDue: number;
  classSlug: string;
  currency: "usd";
  firstName: string;
  lastName: string;
  email: string;
  paymentStatus: "unpaid";
  phone: string;
  registrationStatus: "pending" | "waitlist_requested";
  seats: number;
  notes: string | null;
  source: "website";
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
