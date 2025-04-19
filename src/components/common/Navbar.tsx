
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Bell, LogOut, User, Users, Calendar, Map } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar_url?: string | null;
}

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setIsLoggedIn(!!session);
        if (session?.user) {
          // Get user profile data if available
          const { data: profileData } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', session.user.id)
            .single();
            
          setUserData({
            id: session.user.id,
            name: profileData?.full_name || session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            avatar_url: profileData?.avatar_url || 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=150&h=150'
          });
        } else {
          setUserData(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setIsLoggedIn(!!session);
      if (session?.user) {
        // Get user profile data if available
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name, avatar_url')
          .eq('id', session.user.id)
          .single();
          
        setUserData({
          id: session.user.id,
          name: profileData?.full_name || session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          avatar_url: profileData?.avatar_url || 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=150&h=150'
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Handle login
  const handleLogin = () => {
    navigate('/login');
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out from your account.",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error logging out",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  // Check if a nav item is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-trailmesh-blue">TrailMesh</span>
          </Link>
          
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/trips" 
                className={`flex items-center gap-1 text-sm font-medium ${
                  isActive('/trips') 
                    ? 'text-trailmesh-blue' 
                    : 'text-gray-600 hover:text-trailmesh-blue'
                }`}
              >
                <Map size={18} /> Trips
              </Link>
              <Link 
                to="/groups" 
                className={`flex items-center gap-1 text-sm font-medium ${
                  isActive('/groups') 
                    ? 'text-trailmesh-blue' 
                    : 'text-gray-600 hover:text-trailmesh-blue'
                }`}
              >
                <Users size={18} /> Groups
              </Link>
              <Link 
                to="/discover" 
                className={`flex items-center gap-1 text-sm font-medium ${
                  isActive('/discover') 
                    ? 'text-trailmesh-blue' 
                    : 'text-gray-600 hover:text-trailmesh-blue'
                }`}
              >
                <Map size={18} /> Discover
              </Link>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarImage src={userData?.avatar_url || "/placeholder.svg"} alt={userData?.name || "User"} />
                    <AvatarFallback className="bg-trailmesh-blue text-white">
                      {userData?.name?.substring(0, 2)?.toUpperCase() || "TM"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/places')}>
                    <Map className="mr-2 h-4 w-4" />
                    <span>My Places</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/history')}>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Trip History</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Mobile menu button */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu size={20} />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild className="text-trailmesh-blue hover:text-trailmesh-blue-dark">
                <Link to="/login">Login</Link>
              </Button>
              <Button 
                variant="royal" 
                className="bg-trailmesh-blue hover:bg-trailmesh-blue-dark text-white" 
                onClick={handleLogin}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && isLoggedIn && (
        <div className="md:hidden py-3 px-4 mt-2 bg-white border-t">
          <div className="flex flex-col space-y-3">
            <Link 
              to="/trips" 
              className={`flex items-center gap-2 py-2 px-4 rounded-md ${
                isActive('/trips') 
                  ? 'bg-trailmesh-blue/10 text-trailmesh-blue' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Map size={18} /> Trips
            </Link>
            <Link 
              to="/groups" 
              className={`flex items-center gap-2 py-2 px-4 rounded-md ${
                isActive('/groups') 
                  ? 'bg-trailmesh-blue/10 text-trailmesh-blue' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Users size={18} /> Groups
            </Link>
            <Link 
              to="/discover" 
              className={`flex items-center gap-2 py-2 px-4 rounded-md ${
                isActive('/discover') 
                  ? 'bg-trailmesh-blue/10 text-trailmesh-blue' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Map size={18} /> Discover
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
