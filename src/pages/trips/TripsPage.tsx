
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/common/Navbar";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";

interface Trip {
  id: string;
  name: string;
  description: string | null;
  location: string;
  start_date: string;
  end_date: string;
  cover_image: string | null;
  created_at: string;
  created_by: string;
}

const TripsPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setIsLoading(true);
        
        // Get the current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error("User not authenticated");
        }

        // Get trips created by the user
        const { data, error } = await supabase
          .from("trips")
          .select("*")
          .eq("created_by", user.id);

        if (error) throw error;

        setTrips(data || []);
      } catch (error: any) {
        console.error("Error fetching trips:", error);
        toast({
          title: "Error",
          description: "Failed to load trips. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const filteredTrips = trips.filter(trip => 
    trip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (trip.description && trip.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateTrip = () => {
    navigate("/trips/create");
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${format(start, 'MMM d')} - ${format(end, 'd, yyyy')}`;
    } else if (start.getFullYear() === end.getFullYear()) {
      return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
    } else {
      return `${format(start, 'MMM d, yyyy')} - ${format(end, 'MMM d, yyyy')}`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Trips</h1>
              <p className="text-gray-600 mt-1">Plan and organize your trekking adventures</p>
            </div>
            
            <Button 
              onClick={handleCreateTrip}
              variant="royal"
              className="mt-4 sm:mt-0"
            >
              <Plus className="mr-2 h-4 w-4" /> Create Trip
            </Button>
          </div>
          
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search trips by name or location..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl h-64 animate-pulse" />
              ))}
            </div>
          ) : filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip) => (
                <div key={trip.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-40 bg-gradient-to-r from-trailmesh-blue to-trailmesh-blue-dark relative">
                    {trip.cover_image && (
                      <img
                        src={trip.cover_image}
                        alt={trip.name}
                        className="w-full h-full object-cover opacity-70"
                      />
                    )}
                    <div className="absolute inset-0 p-4 flex flex-col justify-end">
                      <h3 className="text-xl font-bold text-white">{trip.name}</h3>
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 text-white opacity-90 mr-1" />
                        <p className="text-sm text-white opacity-90">{trip.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-600">
                        {formatDateRange(trip.start_date, trip.end_date)}
                      </span>
                    </div>
                    
                    {trip.description && (
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{trip.description}</p>
                    )}
                    
                    <div className="flex justify-end space-x-2 mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/trips/${trip.id}/edit`)}
                      >
                        Edit
                      </Button>
                      <Button 
                        size="sm"
                        variant="royal"
                        onClick={() => navigate(`/trips/${trip.id}`)}
                      >
                        View Trip
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No trips found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? "No trips match your search criteria. Try with a different term."
                  : "You haven't created any trips yet. Start planning your next adventure!"}
              </p>
              <Button onClick={handleCreateTrip} variant="royal">
                <Plus className="mr-2 h-4 w-4" /> Create Your First Trip
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TripsPage;
