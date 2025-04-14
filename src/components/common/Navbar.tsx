
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Menu, Bell, MapPin, MapPinOff, LogOut, User, Users, Calendar, Map } from "lucide-react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Mock login function for demonstration
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  // Mock logout function for demonstration
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-bhromani-purple">Bhromani</span>
          </Link>
          
          {isLoggedIn && (
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/trips" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-bhromani-purple">
                <Map size={18} /> Trips
              </Link>
              <Link to="/groups" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-bhromani-purple">
                <Users size={18} /> Groups
              </Link>
              <Link to="/discover" className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-bhromani-purple">
                <MapPin size={18} /> Discover
              </Link>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-bhromani-orange"></span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-9 w-9 cursor-pointer">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="bg-bhromani-purple text-white">NN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>My Places</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
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
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-bhromani-purple hover:bg-bhromani-purple-dark" onClick={handleLogin}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
