
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, MapPin, Map, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase, getCurrentUser } from "@/integrations/supabase/client";
import Navbar from "@/components/common/Navbar";

interface Group {
  id: string;
  name: string;
  description: string | null;
  cover_image: string | null;
  created_at: string;
}

interface Trip {
  id: string;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
  cover_image: string | null;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [userTrips, setUserTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        
        if (user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single();
            
          setUserName(profileData?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Traveler');
          
          // Fetch user groups
          const { data: groupsData } = await supabase
            .from('group_members')
            .select('group_id')
            .eq('user_id', user.id);
            
          if (groupsData && groupsData.length > 0) {
            const groupIds = groupsData.map(item => item.group_id);
            
            const { data: groups } = await supabase
              .from('groups')
              .select('*')
              .in('id', groupIds);
              
            setUserGroups(groups || []);
          }
          
          // Fetch user trips
          const { data: trips } = await supabase
            .from('trips')
            .select('*')
            .eq('created_by', user.id)
            .order('start_date', { ascending: true });
            
          setUserTrips(trips || []);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e40af] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-8 pb-4 px-6 bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] text-white">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
          <p className="mt-2 text-blue-100">Your adventure dashboard awaits</p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8 bg-white p-1 border">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="your-groups" className="flex-1">Your Groups</TabsTrigger>
            <TabsTrigger value="upcoming-trips" className="flex-1">Upcoming Trips</TabsTrigger>
            <TabsTrigger value="explore-map" className="flex-1">Explore Map</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Users className="h-5 w-5 mr-2 text-amber-500" />
                    Your Groups
                  </CardTitle>
                  <CardDescription>Communities you're part of</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {userGroups.length > 0 ? (
                      userGroups.slice(0, 3).map((group) => (
                        <div key={group.id} className="p-3 bg-gray-50 rounded-lg">
                          <Link to={`/groups/${group.id}`} className="font-medium text-[#1e40af] hover:underline">
                            {group.name}
                          </Link>
                          {group.description && (
                            <p className="text-sm text-gray-600 line-clamp-1">{group.description}</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-500 mb-3">You haven't joined any groups yet</p>
                        <Button 
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600 text-white"
                          asChild
                        >
                          <Link to="/groups/create">
                            <Plus className="h-4 w-4 mr-1" /> Create a Group
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                  {userGroups.length > 0 && (
                    <Button variant="ghost" size="sm" className="w-full mt-4 text-[#1e40af]" asChild>
                      <Link to="/groups">View All Groups</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-amber-500" />
                    Upcoming Trips
                  </CardTitle>
                  <CardDescription>Your planned adventures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {userTrips.length > 0 ? (
                      userTrips.slice(0, 3).map((trip) => (
                        <div key={trip.id} className="p-3 bg-gray-50 rounded-lg">
                          <Link to={`/trips/${trip.id}`} className="font-medium text-[#1e40af] hover:underline">
                            {trip.name}
                          </Link>
                          <p className="text-sm text-gray-600">{trip.location}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-500 mb-3">You haven't planned any trips yet</p>
                        <Button 
                          size="sm"
                          className="bg-amber-500 hover:bg-amber-600 text-white"
                          asChild
                        >
                          <Link to="/trips/create">
                            <Plus className="h-4 w-4 mr-1" /> Create a Trip
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                  {userTrips.length > 0 && (
                    <Button variant="ghost" size="sm" className="w-full mt-4 text-[#1e40af]" asChild>
                      <Link to="/trips">View All Trips</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Map className="h-5 w-5 mr-2 text-amber-500" />
                    Discover
                  </CardTitle>
                  <CardDescription>Explore new trails and spots</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-[#1e40af]">Annapurna Circuit</h4>
                      <p className="text-sm text-gray-600">Nepal, Himalayan Range</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-[#1e40af]">Inca Trail</h4>
                      <p className="text-sm text-gray-600">Peru, Machu Picchu</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-[#1e40af]">Mont Blanc Circuit</h4>
                      <p className="text-sm text-gray-600">France, Switzerland, Italy</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-4 text-[#1e40af]" asChild>
                    <Link to="/discover">Explore More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl overflow-hidden">
              <div className="p-6 md:p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">Ready for your next adventure?</h2>
                <p className="mb-6 max-w-xl">Create a new trip, find travel companions, or discover exciting trails around the world.</p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-white text-amber-600 hover:bg-gray-100" asChild>
                    <Link to="/trips/create">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Trip
                    </Link>
                  </Button>
                  <Button className="bg-white/20 hover:bg-white/30 text-white" asChild>
                    <Link to="/groups">Find Travel Buddies</Link>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="your-groups">
            <div className="bg-white rounded-xl p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Users className="h-6 w-6 mr-2 text-amber-500" />
                  Your Groups
                </h2>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white" asChild>
                  <Link to="/groups/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Group
                  </Link>
                </Button>
              </div>
              
              {userGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userGroups.map((group) => (
                    <div key={group.id} className="border rounded-xl overflow-hidden bg-gray-50 hover:shadow-md transition-shadow">
                      <div className="h-32 bg-gradient-to-r from-[#1e40af] to-[#1e3a8a] relative">
                        {group.cover_image && (
                          <img 
                            src={group.cover_image} 
                            alt={group.name} 
                            className="w-full h-full object-cover opacity-70"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <h3 className="text-xl font-bold text-white drop-shadow-md">{group.name}</h3>
                        </div>
                      </div>
                      <div className="p-4">
                        {group.description && (
                          <p className="text-gray-600 text-sm mb-4">{group.description}</p>
                        )}
                        <div className="flex justify-end">
                          <Button 
                            size="sm" 
                            className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white"
                            asChild
                          >
                            <Link to={`/groups/${group.id}/chat`}>View Group</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Groups Yet</h3>
                  <p className="text-gray-600 mb-6">You haven't joined or created any groups yet. Start by creating your first group!</p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white" asChild>
                    <Link to="/groups/create">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Group
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming-trips">
            <div className="bg-white rounded-xl p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-amber-500" />
                  Your Upcoming Trips
                </h2>
                <Button className="bg-amber-500 hover:bg-amber-600 text-white" asChild>
                  <Link to="/trips/create">
                    <Plus className="h-4 w-4 mr-2" />
                    Plan New Trip
                  </Link>
                </Button>
              </div>
              
              {userTrips.length > 0 ? (
                <div className="space-y-4">
                  {userTrips.map((trip) => (
                    <div key={trip.id} className="border rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center bg-gray-50">
                      <div className="h-20 w-20 bg-[#1e40af]/20 rounded-full flex items-center justify-center">
                        {trip.cover_image ? (
                          <img 
                            src={trip.cover_image} 
                            alt={trip.name}
                            className="h-full w-full rounded-full object-cover" 
                          />
                        ) : (
                          <MapPin className="h-8 w-8 text-[#1e40af]" />
                        )}
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-lg font-bold text-gray-900">{trip.name}</h3>
                        <p className="text-gray-600">{trip.location}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(trip.start_date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })} - {new Date(trip.end_date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div>
                        <Button 
                          className="bg-[#1e40af] hover:bg-[#1e3a8a] text-white"
                          asChild
                        >
                          <Link to={`/trips/${trip.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MapPin className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">No Trips Planned</h3>
                  <p className="text-gray-600 mb-6">You don't have any upcoming trips. Start planning your next adventure!</p>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white" asChild>
                    <Link to="/trips/create">
                      <Plus className="h-4 w-4 mr-2" />
                      Plan Your First Trip
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="explore-map">
            <div className="bg-white rounded-xl p-6 mb-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Map className="h-6 w-6 mr-2 text-amber-500" />
                  Explore Trails & Destinations
                </h2>
                <p className="text-gray-600">Discover popular trails, landmarks, and meet other travelers around the world</p>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="h-[400px] bg-gradient-to-r from-[#1e40af]/10 to-[#1e3a8a]/10 rounded flex items-center justify-center">
                  <div className="text-center">
                    <Map className="h-16 w-16 mx-auto mb-4 text-[#1e40af]/40" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">Interactive Map</h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                      Discover trails, connect with travelers, and share your location with your group.
                    </p>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                      Enable Location Sharing
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-bold text-[#1e40af] mb-2">Popular Destinations</h3>
                  <ul className="space-y-2">
                    <li className="p-2 hover:bg-gray-100 rounded">
                      <span className="font-medium">Annapurna Circuit</span>
                      <p className="text-sm text-gray-600">Nepal, Himalayan Range</p>
                    </li>
                    <li className="p-2 hover:bg-gray-100 rounded">
                      <span className="font-medium">Torres del Paine</span>
                      <p className="text-sm text-gray-600">Chile, Patagonia</p>
                    </li>
                    <li className="p-2 hover:bg-gray-100 rounded">
                      <span className="font-medium">Kilimanjaro</span>
                      <p className="text-sm text-gray-600">Tanzania, Africa</p>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-bold text-[#1e40af] mb-2">Group Activities</h3>
                  <ul className="space-y-2">
                    <li className="p-2 hover:bg-gray-100 rounded">
                      <span className="font-medium">Mountain Biking</span>
                      <p className="text-sm text-gray-600">Find biking groups nearby</p>
                    </li>
                    <li className="p-2 hover:bg-gray-100 rounded">
                      <span className="font-medium">Rock Climbing</span>
                      <p className="text-sm text-gray-600">Connect with climbers</p>
                    </li>
                    <li className="p-2 hover:bg-gray-100 rounded">
                      <span className="font-medium">Kayaking</span>
                      <p className="text-sm text-gray-600">River adventures & tours</p>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h3 className="font-bold text-[#1e40af] mb-2">Trending Now</h3>
                  <ul className="space-y-2">
                    <li className="p-2 hover:bg-gray-100 rounded">
                      <span className="font-medium">Pacific Crest Trail</span>
                      <p className="text-sm text-gray-600">USA, West Coast</p>
                    </li>
                    <li className="p-2 hover:bg-gray-100 rounded">
                      <span className="font-medium">Camino de Santiago</span>
                      <p className="text-sm text-gray-600">Spain, Europe</p>
                    </li>
                    <li className="p-2 hover:bg-gray-100 rounded">
                      <span className="font-medium">Great Ocean Walk</span>
                      <p className="text-sm text-gray-600">Australia, Victoria</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
