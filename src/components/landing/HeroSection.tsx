
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Users, MessageCircle, CheckSquare } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between py-12 md:py-24">
          {/* Hero Content */}
          <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              <span className="block bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text text-transparent">Group Travel Made</span>
              <span className="block">Easy and Fun</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl">
              TrailMesh helps you organize trips, stay connected with your travel companions, 
              share locations, and create memories together. No more chaotic group travels.
            </p>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white px-8 py-6 rounded-full">
                Get Started
              </Button>
              <Link to="/discover" className="text-sm font-semibold leading-6 text-gray-900 flex items-center">
                Learn more <span aria-hidden="true" className="ml-1">→</span>
              </Link>
            </div>
            
            {/* Feature bullets */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-amber-500" />
                <span className="text-sm text-gray-600">Real-time location sharing</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-amber-500" />
                <span className="text-sm text-gray-600">Easy group creation</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-amber-500" />
                <span className="text-sm text-gray-600">Group messaging</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5 text-amber-500" />
                <span className="text-sm text-gray-600">Trip planning tools</span>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 relative">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Friends traveling together" 
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Floating UI Elements */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Traveling with</p>
                    <p className="text-sm font-medium">5 friends</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-amber-500 flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Current location</p>
                    <p className="text-sm font-medium">Annapurna, Nepal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
