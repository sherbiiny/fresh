import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;

export const userSupabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: { storageKey: 'user-auth' },
});

export const adminSupabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: { storageKey: 'admin-auth' },
});
