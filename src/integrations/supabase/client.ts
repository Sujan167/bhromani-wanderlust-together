
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/database.types';

const SUPABASE_URL = "https://aycufmjtliovtplnxulb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Y3VmbWp0bGlvdnRwbG54dWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5OTU2MDUsImV4cCI6MjA2MDU3MTYwNX0.4R_7WoyC_nBStwUlgpuPEPKd1G2cXwrM3FZaLrSy9uA";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});

// Export a function to get the redirect URL
export const getAuthRedirectURL = () => {
  // Updated to ensure we're using trailmesh consistently
  const redirectTo = window.location.hostname === 'localhost' ? 
    'http://localhost:8080' : 
    'https://trailmesh.sujanb.com.np';
    
  // Include hash to ensure proper redirection
  return `${redirectTo}/dashboard`;
};

// Helper function to fetch user data that can be reused across components
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    
    return user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
