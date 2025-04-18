
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Get environment variables or use fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if supabaseUrl and supabaseAnonKey are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Supabase URL and/or Anon Key are missing. Make sure you have set the VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
  );
}

// Create a Supabase client with appropriate error handling
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Export a helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};
