// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://jhqllqbvfkmyergzcpvl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpocWxscWJ2ZmtteWVyZ3pjcHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MDUwODgsImV4cCI6MjA2MTE4MTA4OH0.FCOzCM-zzUh_v6zWQUdQ8qlIHn3WDRW86iyXg5REsqc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);