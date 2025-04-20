
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, MapPin } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import MapboxMap from "@/components/map/MapboxMap";

const TripsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-6 px-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#1e40af]">Your Trips</h1>
            <p className="text-gray-600 mt-1">Manage and explore your upcoming and past journeys</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search trips..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white" asChild>
              <Link to="/trips/create">
                <Plus className="h-4 w-4 mr-2" /> New Trip
              </Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-500">Upcoming</TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-500">Past</TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-amber-50 data-[state=active]:text-amber-500">Map View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((trip) => (
                <div key={trip} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                  <div className="h-40 bg-gray-200 relative">
                    <img 
                      src={`https://images.unsplash.com/photo-156550118607${trip}-8138cf16a950?auto=format&fit=crop&w=600&h=300`}
                      alt="Trip"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-xs font-medium text-amber-500">
                      In 2 weeks
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">Annapurna Base Camp</h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1 text-amber-500" />
                      <span>Nepal</span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((member) => (
                          <img 
                            key={member}
                            src="/placeholder.svg"
                            alt="Member"
                            className="h-7 w-7 rounded-full border-2 border-white"
                          />
                        ))}
                        <div className="h-7 w-7 rounded-full bg-amber-100 border-2 border-white flex items-center justify-center">
                          <span className="text-xs font-medium text-amber-600">+2</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-amber-500">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[4, 5].map((trip) => (
                <div key={trip} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                  <div className="h-40 bg-gray-200 relative">
                    <img 
                      src={`https://images.unsplash.com/photo-156480118607${trip}-8138cf16a950?auto=format&fit=crop&w=600&h=300`}
                      alt="Trip"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-500">
                      2 months ago
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">Everest Region Trek</h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1 text-amber-500" />
                      <span>Nepal</span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((member) => (
                          <img 
                            key={member}
                            src="/placeholder.svg"
                            alt="Member"
                            className="h-7 w-7 rounded-full border-2 border-white"
                          />
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="text-amber-500">
                        View Details
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

export default TripsPage;
