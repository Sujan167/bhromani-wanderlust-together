
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { toast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // If Supabase is not configured, we'll use localStorage as a fallback
    if (!isSupabaseConfigured()) {
      console.warn('Supabase not configured. Using localStorage authentication fallback.');
      
      const checkLocalAuth = () => {
        const userData = localStorage.getItem('bhromani_user');
        if (userData) {
          try {
            const user = JSON.parse(userData);
            setIsAuthenticated(user.isAuthenticated);
          } catch (e) {
            console.error('Error parsing user data:', e);
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
        setIsLoading(false);
      };
      
      checkLocalAuth();
      return;
    }

    // If Supabase is configured, use it for authentication
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Auth check - session:', session);
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Error checking auth session:', error);
        setIsAuthenticated(false);
        toast({
          title: "Authentication Error",
          description: "There was a problem connecting to the authentication service.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();

    // Set up auth state change listener
    let subscription: { unsubscribe: () => void } | null = null;
    
    try {
      const { data } = supabase.auth.onAuthStateChange((_event, session) => {
        console.log('Auth state change - session:', session);
        setIsAuthenticated(!!session);
      });
      subscription = data.subscription;
    } catch (error) {
      console.error('Error setting up auth state listener:', error);
    }

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to /login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('Authentication successful, rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;
