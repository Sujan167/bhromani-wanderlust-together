
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('bhromani_user');
      console.log('Auth check - userData:', userData);
      
      if (userData) {
        try {
          const user = JSON.parse(userData);
          console.log('Parsed user:', user);
          setIsAuthenticated(user.isAuthenticated);
        } catch (e) {
          console.error('Error parsing user data:', e);
          setIsAuthenticated(false);
        }
      } else {
        console.log('No user data found');
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  // Add a loading state while checking authentication
  if (isAuthenticated === null) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to /login');
    // Redirect to login page but save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('Authentication successful, rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;
