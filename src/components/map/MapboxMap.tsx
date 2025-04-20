
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapPin, User, Navigation, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

// Temporary public token - in production, this should be stored in environment variables
// or retrieved from your backend
mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xzeTg1NmZxMWZ2YjJrcjBma2t3emloYSJ9.nLTk__Y0sMvZ1Z4Wy3uY9A';

// Mock data for group members
const groupMembers = [
  { id: 1, name: 'Sarah', avatar: '/placeholder.svg', location: { lng: 84.1240, lat: 28.3949 } },
  { id: 2, name: 'Michael', avatar: '/placeholder.svg', location: { lng: 84.1299, lat: 28.4085 } },
  { id: 3, name: 'Priya', avatar: '/placeholder.svg', location: { lng: 84.1270, lat: 28.3999 } },
];

const MapboxMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<{ lng: number; lat: number } | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      // Default to Annapurna region if no user location
      const defaultLocation = { lng: 84.1240, lat: 28.3949 };
      
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: userLocation || defaultLocation,
        zoom: 12,
        pitch: 45,
      });
      
      map.current = mapInstance;
      
      // Add navigation controls
      const navControl = new mapboxgl.NavigationControl({
        visualizePitch: true,
        showCompass: true,
      });
      mapInstance.addControl(navControl, 'top-right');
      
      // Wait for map to load
      mapInstance.on('load', () => {
        // Add markers for group members
        const newMarkers = groupMembers.map(member => {
          const markerElement = document.createElement('div');
          markerElement.className = 'map-marker';
          markerElement.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#F97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          `;
          
          const marker = new mapboxgl.Marker(markerElement)
            .setLngLat(member.location)
            .addTo(mapInstance);
          
          // Create popup
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div style="display: flex; align-items: center; padding: 8px;">
                <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; margin-right: 10px; background-color: #f1f5f9;">
                  <img src="${member.avatar}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <div>
                  <p style="margin: 0; font-weight: 600;">${member.name}</p>
                  <p style="margin: 0; font-size: 12px; color: #64748b;">15 minutes ago</p>
                </div>
              </div>
            `);
          
          marker.setPopup(popup);
          return marker;
        });
        
        setMarkers(newMarkers);
        
        if (userLocation) {
          // Add user's own marker
          const userMarkerElement = document.createElement('div');
          userMarkerElement.className = 'user-marker';
          userMarkerElement.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user">
              <circle cx="12" cy="9" r="6"/>
              <path d="M20 12V4"/>
              <path d="M4 12V4"/>
            </svg>
          `;
          
          const userMarker = new mapboxgl.Marker(userMarkerElement)
            .setLngLat(userLocation)
            .addTo(mapInstance);
          
          const userPopup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div style="padding: 8px;">
                <p style="margin: 0; font-weight: 600;">Your location</p>
                <p style="margin: 0; font-size: 12px; color: #64748b;">Currently sharing</p>
              </div>
            `);
          
          userMarker.setPopup(userPopup);
          
          setMarkers(prev => [...prev, userMarker]);
        }
      });
    } catch (error) {
      console.error('Map initialization error:', error);
      setLoadError('Failed to initialize map. Please try again later.');
    }
    
    return () => {
      // Clean up markers
      markers.forEach(marker => marker.remove());
      // Clean up map
      if (map.current) {
        map.current.remove();
      }
    };
  }, [userLocation]);

  // Get user's location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Getting your location...",
      description: "Please wait while we locate you.",
    });
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        };
        setUserLocation(newLocation);
        setIsSharing(true);
        
        if (map.current) {
          map.current.flyTo({
            center: newLocation,
            zoom: 13,
            duration: 2000
          });
        }
        
        toast({
          title: "Location shared",
          description: "Your location is now visible to your group members.",
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = "Failed to get your location.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "You denied the request for geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get your location timed out.";
            break;
        }
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      },
      { enableHighAccuracy: true }
    );
  };

  // Toggle location sharing
  const toggleLocationSharing = () => {
    if (isSharing) {
      setIsSharing(false);
      toast({
        title: "Location sharing stopped",
        description: "Your location is no longer being shared.",
      });
    } else {
      getUserLocation();
    }
  };

  return (
    <div className="h-[500px] relative rounded-lg overflow-hidden border border-gray-200">
      {loadError && (
        <div className="h-full flex items-center justify-center bg-gray-100">
          <div className="text-center p-6">
            <MapPin className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Map loading failed</h3>
            <p className="text-gray-500 mb-4">{loadError}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="mx-auto"
            >
              Retry
            </Button>
          </div>
        </div>
      )}
      
      <div ref={mapContainer} className="h-full w-full"></div>
      
      {/* Group members overlay */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3 max-w-xs">
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Users className="h-4 w-4 mr-1 text-amber-500" />
          <span>Group Members</span>
        </h3>
        <div className="space-y-2">
          {groupMembers.map(member => (
            <div key={member.id} className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-xs">{member.name}</span>
              <div className="ml-auto flex">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Share location button */}
      <div className="absolute bottom-4 right-4">
        <Button
          onClick={toggleLocationSharing}
          className={isSharing ? "bg-red-500 hover:bg-red-600" : "bg-amber-500 hover:bg-amber-600"}
        >
          {isSharing ? (
            <>
              <Navigation className="h-4 w-4 mr-2" /> Stop Sharing
            </>
          ) : (
            <>
              <Navigation className="h-4 w-4 mr-2" /> Share My Location
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MapboxMap;
