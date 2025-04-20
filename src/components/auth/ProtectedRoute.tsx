
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingTime, setLoadingTime] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Set up a timer to track loading time
    const interval = setInterval(() => {
      setLoadingTime((prev) => prev + 1);
    }, 1000);

    // Check if the user is authenticated
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
        clearInterval(interval);
      }
    };
    
    checkAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state change - session:', session);
      setIsAuthenticated(!!session);
      setIsLoading(false);
      clearInterval(interval);
    });

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    setLoadingTime(0);
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <Loader2 className="h-12 w-12 animate-spin text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1e40af] mb-2">Loading</h2>
          <p className="text-gray-600 mb-6">Please wait while we set up your account...</p>
          
          {loadingTime > 10 && (
            <div className="mt-4">
              <p className="text-amber-600 mb-2">This is taking longer than expected.</p>
              <Button 
                onClick={handleRetry}
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                Retry
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to /login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('Authentication successful, rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;
