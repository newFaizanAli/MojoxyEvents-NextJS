import { createClient } from "@supabase/supabase-js";
import { env_utils } from "./env_utils";

export const supabase = createClient(
  env_utils.SUPABASE_URL,
  env_utils.SUPABASE_SERVICE_KEY,
);
