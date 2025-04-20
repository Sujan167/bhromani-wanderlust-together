
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
  // Use window.location.origin to get the current domain with protocol
  const origin = window.location.origin;
  
  // Return the complete URL with the dashboard path
  return `${origin}/dashboard`;
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

// Google OAuth configuration with credentials (updated to use the correct type)
export const googleOAuthConfig = {
  provider: 'google' as const,
  options: {
    clientId: '88565335308-ti1urvnnn75i0fdh0gr2913cbaqpctm3.apps.googleusercontent.com',
    redirectTo: getAuthRedirectURL(),
    queryParams: {
      access_type: 'offline',
      prompt: 'consent',
    }
  }
};
