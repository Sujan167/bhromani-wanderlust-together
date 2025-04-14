
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Users, Plus, Map as MapIcon } from "lucide-react";

// This is a mock component that simulates a map
// In a real app, you would integrate with MapBox, Google Maps, etc.
const LocationMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLocationSharing, setIsLocationSharing] = useState(false);
  
  // Toggle location sharing
  const toggleLocationSharing = () => {
    setIsLocationSharing(!isLocationSharing);
  };
  
  // Mock data for group members
  const groupMembers = [
    { id: 1, name: "Aarav", avatar: "/placeholder.svg", latitude: 27.7172, longitude: 85.3240 },
    { id: 2, name: "Sita", avatar: "/placeholder.svg", latitude: 27.7152, longitude: 85.3230 },
    { id: 3, name: "Ravi", avatar: "/placeholder.svg", latitude: 27.7192, longitude: 85.3250 },
  ];

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden bg-bhromani-light-gray">
      {/* This div would be replaced with actual map implementation */}
      <div ref={mapRef} className="w-full h-full bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center">
        {/* Map overlay with user pins would be dynamic in real implementation */}
        <div className="absolute right-4 top-4 flex flex-col space-y-3">
          <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-md hover:bg-white">
            <MapIcon className="h-5 w-5 text-bhromani-purple" />
          </Button>
          <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-md hover:bg-white">
            <Navigation className="h-5 w-5 text-bhromani-purple" />
          </Button>
          <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-md hover:bg-white">
            <Plus className="h-5 w-5 text-bhromani-purple" />
          </Button>
        </div>
        
        {/* Member location indicators */}
        <div className="absolute left-4 top-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-bhromani-purple" />
              <span className="text-sm font-medium">Group Members</span>
            </div>
            <div className="space-y-2">
              {groupMembers.map(member => (
                <div key={member.id} className="flex items-center gap-2">
                  <div className="relative">
                    <img src={member.avatar} alt={member.name} className="h-8 w-8 rounded-full border-2 border-white" />
                    <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-green-500 border border-white"></span>
                  </div>
                  <span className="text-sm">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location sharing toggle */}
        <div className="absolute bottom-4 left-4">
          <Button 
            onClick={toggleLocationSharing}
            className={`flex items-center gap-2 ${
              isLocationSharing 
                ? "bg-bhromani-purple" 
                : "bg-white text-bhromani-purple border border-bhromani-purple"
            }`}
          >
            <MapPin className="h-4 w-4" />
            {isLocationSharing ? "Sharing Location" : "Share Location"}
          </Button>
        </div>

        {/* Mock map pins - in a real app these would be dynamic */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin size={30} className="text-bhromani-purple" />
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-md whitespace-nowrap">
              <p className="text-xs font-medium">Kathmandu Durbar Square</p>
            </div>
          </div>
        </div>
        
        <div className="absolute top-[40%] left-[60%]">
          <MapPin size={30} className="text-bhromani-orange" />
        </div>
        
        <div className="absolute top-[60%] left-[40%]">
          <MapPin size={30} className="text-bhromani-teal" />
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
