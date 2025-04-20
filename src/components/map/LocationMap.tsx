
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Users, Plus, Map as MapIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import mapboxgl from 'mapbox-gl';

// Temporary public token - in production, this should be stored in environment variables
mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xzeTg1NmZxMWZ2YjJrcjBma2t3emloYSJ9.nLTk__Y0sMvZ1Z4Wy3uY9A';

const LocationMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [isLocationSharing, setIsLocationSharing] = useState(false);
  const [userLocation, setUserLocation] = useState<{lng: number; lat: number} | null>(null);
  
  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [85.3240, 27.7172], // Default to Kathmandu
      zoom: 13
    });
    
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    mapRef.current = map;
    
    // Mock data for group members
    const groupMembers = [
      { id: 1, name: "Aarav", avatar: "/placeholder.svg", longitude: 85.3240, latitude: 27.7172 },
      { id: 2, name: "Sita", avatar: "/placeholder.svg", longitude: 85.3230, latitude: 27.7152 },
      { id: 3, name: "Ravi", avatar: "/placeholder.svg", longitude: 85.3250, latitude: 27.7192 },
    ];
    
    // Add member markers once map is loaded
    map.on('load', () => {
      // Add markers for each group member
      groupMembers.forEach(member => {
        // Create custom HTML element for marker
        const el = document.createElement('div');
        el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1e40af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
        
        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div style="display: flex; align-items: center; padding: 4px">
              <img src="${member.avatar}" alt="${member.name}" style="width: 24px; height: 24px; border-radius: 50%; margin-right: 8px">
              <span style="font-weight: 500">${member.name}</span>
            </div>
          `);
        
        // Add marker to map
        const marker = new mapboxgl.Marker(el)
          .setLngLat([member.longitude, member.latitude])
          .setPopup(popup)
          .addTo(map);
          
        markersRef.current.push(marker);
      });
    });
    
    // Clean up on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);
  
  // Update user location marker when userLocation changes
  useEffect(() => {
    if (!mapRef.current || !userLocation) return;
    
    // Remove existing user marker if any
    const userMarkerIndex = markersRef.current.findIndex(marker => 
      marker.getElement().classList.contains('user-marker')
    );
    
    if (userMarkerIndex !== -1) {
      markersRef.current[userMarkerIndex].remove();
      markersRef.current.splice(userMarkerIndex, 1);
    }
    
    // Create custom HTML element for marker
    const el = document.createElement('div');
    el.className = 'user-marker';
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="#d97706"/></svg>`;
    
    // Create popup
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div style="padding: 4px">
          <span style="font-weight: 500">Your Location</span>
        </div>
      `);
    
    // Add marker to map
    const marker = new mapboxgl.Marker(el)
      .setLngLat([userLocation.lng, userLocation.lat])
      .setPopup(popup)
      .addTo(mapRef.current);
      
    // Store marker reference
    markersRef.current.push(marker);
    
    // Pan map to user location
    mapRef.current.flyTo({
      center: [userLocation.lng, userLocation.lat],
      zoom: 14,
      essential: true
    });
    
  }, [userLocation]);
  
  // Toggle location sharing
  const toggleLocationSharing = () => {
    if (!isLocationSharing) {
      // Start sharing location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { longitude, latitude } = position.coords;
            setUserLocation({ lng: longitude, lat: latitude });
            setIsLocationSharing(true);
            toast({
              title: "Location Sharing Enabled",
              description: "Other group members can now see your location.",
            });
          },
          (error) => {
            console.error("Error getting location:", error);
            toast({
              title: "Location Error",
              description: "Unable to get your location. Please check your browser permissions.",
              variant: "destructive",
            });
          }
        );
      } else {
        toast({
          title: "Location Not Supported",
          description: "Your browser doesn't support geolocation.",
          variant: "destructive",
        });
      }
    } else {
      // Stop sharing location
      setIsLocationSharing(false);
      toast({
        title: "Location Sharing Disabled",
        description: "You are no longer sharing your location.",
      });
    }
  };

  return (
    <div className="relative w-full h-[600px] rounded-xl overflow-hidden bg-trailmesh-light-gray">
      <div ref={mapContainerRef} className="w-full h-full">
        {/* Map controls */}
        <div className="absolute right-4 top-4 flex flex-col space-y-3 z-10">
          <Button size="icon" variant="secondary" className="bg-white shadow-md hover:bg-gray-100">
            <MapIcon className="h-5 w-5 text-amber-500" />
          </Button>
          <Button size="icon" variant="secondary" className="bg-white shadow-md hover:bg-gray-100">
            <Navigation className="h-5 w-5 text-amber-500" />
          </Button>
          <Button size="icon" variant="secondary" className="bg-white shadow-md hover:bg-gray-100">
            <Plus className="h-5 w-5 text-amber-500" />
          </Button>
        </div>
        
        {/* Member location indicators */}
        <div className="absolute left-4 top-4 bg-white p-3 rounded-lg shadow-md z-10">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium">Group Members</span>
            </div>
            <div className="space-y-2">
              {["Aarav", "Sita", "Ravi"].map((name, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="relative">
                    <img src="/placeholder.svg" alt={name} className="h-8 w-8 rounded-full border-2 border-white" />
                    <span className="absolute -right-1 -bottom-1 h-3 w-3 rounded-full bg-green-500 border border-white"></span>
                  </div>
                  <span className="text-sm">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location sharing toggle */}
        <div className="absolute bottom-4 left-4 z-10">
          <Button 
            onClick={toggleLocationSharing}
            className={`flex items-center gap-2 ${
              isLocationSharing 
                ? "bg-amber-500 text-white hover:bg-amber-600" 
                : "bg-white text-amber-500 border border-amber-500 hover:bg-amber-50"
            }`}
          >
            <MapPin className="h-4 w-4" />
            {isLocationSharing ? "Sharing Location" : "Share Location"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
