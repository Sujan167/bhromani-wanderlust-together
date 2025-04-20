
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MapPin, Star, Calendar, Users } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import MapboxMap from "@/components/map/MapboxMap";

const popularDestinations = [
  {
    id: 1,
    name: "Annapurna Circuit",
    location: "Nepal",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544085701-4d54e9f41c45?auto=format&fit=crop&w=600&q=60",
    description: "One of the most popular trekking routes in Nepal with stunning mountain views and diverse landscapes.",
  },
  {
    id: 2,
    name: "Everest Base Camp",
    location: "Nepal",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=600&q=60",
    description: "Iconic trek to the base of the world's highest mountain with breathtaking views of the Himalayas.",
  },
  {
    id: 3,
    name: "Langtang Valley",
    location: "Nepal",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1559567000-9e249734d3cf?auto=format&fit=crop&w=600&q=60",
    description: "A less crowded trekking destination with beautiful mountain landscapes and rich cultural heritage.",
  },
  {
    id: 4,
    name: "Upper Mustang",
    location: "Nepal",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1570459027562-4a916cc6701f?auto=format&fit=crop&w=600&q=60",
    description: "Remote region with unique desert-like landscapes and ancient Tibetan Buddhist culture.",
  },
];

const upcomingEvents = [
  {
    id: 1,
    name: "Everest Marathon",
    date: "May 29, 2025",
    location: "Everest Region",
    participants: 156,
    image: "https://images.unsplash.com/photo-1533681717801-1bbd2ec8d269?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 2,
    name: "Annapurna Trail Race",
    date: "October 15, 2025",
    location: "Annapurna Region",
    participants: 89,
    image: "https://images.unsplash.com/photo-1533646775097-a3a0ec7b0048?auto=format&fit=crop&w=600&q=60",
  },
  {
    id: 3,
    name: "Kathmandu Valley Hiking Festival",
    date: "November 5, 2025",
    location: "Kathmandu",
    participants: 240,
    image: "https://images.unsplash.com/photo-1510797188266-d0e8874298ba?auto=format&fit=crop&w=600&q=60",
  },
];

const DiscoverPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-6 px-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1e40af]">Discover</h1>
            <p className="text-gray-600 mt-1">Explore new destinations and connect with fellow travelers</p>
          </div>
          
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search destinations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="destinations" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="destinations" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-500">Popular Destinations</TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-500">Upcoming Events</TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-500">Map View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="destinations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popularDestinations.map((destination) => (
                <div key={destination.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gray-200 relative">
                    <img 
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">{destination.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                        <span className="text-sm font-medium">{destination.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1 text-amber-500" />
                      <span>{destination.location}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mt-3 line-clamp-2">{destination.description}</p>
                    
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="text-amber-500 border-amber-500 hover:bg-amber-50">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gray-200 relative">
                    <img 
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                    
                    <div className="flex items-center text-gray-500 text-sm mt-2">
                      <Calendar className="h-4 w-4 mr-1 text-amber-500" />
                      <span>{event.date}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1 text-amber-500" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Users className="h-4 w-4 mr-1 text-amber-500" />
                      <span>{event.participants} participants</span>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" className="text-amber-500 border-amber-500 hover:bg-amber-50">
                        Join Event
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="map">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <MapboxMap />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DiscoverPage;
