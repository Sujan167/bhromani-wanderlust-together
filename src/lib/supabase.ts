
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = "https://aycufmjtliovtplnxulb.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Y3VmbWp0bGlvdnRwbG54dWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5OTU2MDUsImV4cCI6MjA2MDU3MTYwNX0.4R_7WoyC_nBStwUlgpuPEPKd1G2cXwrM3FZaLrSy9uA";

// The redirect URL for authentication
const redirectTo = window.location.hostname === 'localhost' ? 
  'http://localhost:8080' : 
  'https://bhromani.sujanb.com.np';

// Create a Supabase client with the proper redirect
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      redirectTo: `${redirectTo}/dashboard`,
    },
  }
);

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return true;
};
