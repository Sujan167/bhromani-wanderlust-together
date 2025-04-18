
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

// Get environment variables or use fallback values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if supabase credentials are available
const hasValidCredentials = !!supabaseUrl && !!supabaseAnonKey;

// Log warning if credentials are missing
if (!hasValidCredentials) {
  console.warn(
    'Supabase URL and/or Anon Key are missing. Using fallback authentication mode. Make sure you have set the VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
  );
}

// Create a Supabase client only if we have valid credentials
export const supabase = hasValidCredentials 
  ? createClient<Database>(
      supabaseUrl,
      supabaseAnonKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      }
    )
  : null as any; // Use null with type assertion for development without credentials

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return hasValidCredentials;
};
