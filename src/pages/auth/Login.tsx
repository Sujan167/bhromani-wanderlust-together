
import { Link } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex flex-col">
      <div className="py-4 px-8">
        <Button variant="ghost" asChild className="flex items-center text-gray-700">
          <Link to="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <h1 className="text-3xl font-bold text-trailmesh-blue">TrailMesh</h1>
              <p className="text-sm text-gray-600 mt-1">Stay connected. Explore together.</p>
            </Link>
          </div>
          
          <AuthForm />
          
          <p className="text-sm text-center text-gray-600 mt-8">
            By using TrailMesh, you agree to our{" "}
            <a href="#" className="text-trailmesh-blue hover:underline">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="text-trailmesh-blue hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
      
      <footer className="py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} TrailMesh. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;
