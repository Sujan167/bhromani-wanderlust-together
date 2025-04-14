
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Lock, User as UserIcon, Phone } from "lucide-react";

type AuthMode = "login" | "signup";

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", mode);
    // This would connect to authentication backend in a real app
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          {mode === "login" 
            ? "Enter your credentials to access your account" 
            : "Join Bhromani to plan your next adventure"}
        </p>
      </div>
      
      <Tabs defaultValue="login" onValueChange={(value) => setMode(value as AuthMode)}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-10" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-bhromani-purple hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-bhromani-purple hover:bg-bhromani-purple-dark">
              Login
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="signup">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="name" type="text" placeholder="John Doe" className="pl-10" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="signup-email" type="email" placeholder="you@example.com" className="pl-10" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number (optional)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="pl-10" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input id="signup-password" type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>
            
            <Button type="submit" className="w-full bg-bhromani-purple hover:bg-bhromani-purple-dark">
              Create Account
            </Button>
            
            <p className="text-xs text-center text-gray-500 mt-4">
              By signing up, you agree to our{" "}
              <a href="#" className="text-bhromani-purple hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-bhromani-purple hover:underline">Privacy Policy</a>.
            </p>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;
