
import { useState } from "react";
import Navbar from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, MapPin, Calendar, Navigation } from "lucide-react";
import GroupCard from "@/components/groups/GroupCard";
import LocationMap from "@/components/map/LocationMap";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("trips");
  
  // Mock data for groups
  const groups = [
    {
      id: "1",
      name: "Nepal Trek Squad",
      memberCount: 5,
      description: "Our hiking group for Annapurna Circuit trek in September.",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      activeTripName: "Annapurna Circuit",
      activeTripLocation: "Annapurna, Nepal",
      activeTripDate: "Sep 15 - Sep 25",
      organizer: {
        name: "Aarav",
        avatar: "/placeholder.svg",
      },
      members: [
        { name: "Sita", avatar: "/placeholder.svg" },
        { name: "Raj", avatar: "/placeholder.svg" },
        { name: "Priya", avatar: "/placeholder.svg" },
        { name: "Dev", avatar: "/placeholder.svg" },
      ],
    },
    {
      id: "2",
      name: "College Reunion",
      memberCount: 8,
      description: "Planning our annual college friends meet-up.",
      organizer: {
        name: "Raj",
        avatar: "/placeholder.svg",
      },
      members: [
        { name: "Aarav", avatar: "/placeholder.svg" },
        { name: "Sita", avatar: "/placeholder.svg" },
        { name: "Maya", avatar: "/placeholder.svg" },
        { name: "Arjun", avatar: "/placeholder.svg" },
        { name: "Leela", avatar: "/placeholder.svg" },
        { name: "Vikram", avatar: "/placeholder.svg" },
        { name: "Tara", avatar: "/placeholder.svg" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-bhromani-light-gray">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
            <p className="text-gray-600">Here's what's happening with your trips and groups</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>New Trip</span>
            </Button>
            <Button className="flex items-center gap-2 bg-bhromani-purple hover:bg-bhromani-purple-dark">
              <Plus className="h-4 w-4" />
              <span>New Group</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="trips" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="trips" className="flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              <span>Your Trips</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Your Groups</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Explore Map</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="trips">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Upcoming Trip Card */}
              <Card>
                <CardHeader className="relative pb-0">
                  <img 
                    src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Annapurna" 
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-bhromani-purple" />
                    <span>In 7 days</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardTitle className="mb-1">Annapurna Circuit Trek</CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <MapPin className="h-3 w-3 mr-1 text-bhromani-orange" />
                    <span>Annapurna, Nepal</span>
                  </CardDescription>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <img
                          key={i}
                          src="/placeholder.svg"
                          alt={`Member ${i}`}
                          className="h-6 w-6 rounded-full border-2 border-white"
                        />
                      ))}
                      <div className="h-6 w-6 rounded-full bg-bhromani-light-gray border-2 border-white flex items-center justify-center text-xs">
                        +1
                      </div>
                    </div>
                    <Button size="sm" className="bg-bhromani-purple hover:bg-bhromani-purple-dark">
                      View Trip
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Create New Trip Card */}
              <Card className="border-dashed flex flex-col items-center justify-center p-6 h-full">
                <div className="w-16 h-16 rounded-full bg-bhromani-light-gray flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-bhromani-purple" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Create a New Trip</h3>
                <p className="text-gray-600 text-sm text-center mb-4">
                  Plan your next adventure with friends or family
                </p>
                <Button className="bg-bhromani-purple hover:bg-bhromani-purple-dark">
                  Start Planning
                </Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="groups">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map(group => (
                <GroupCard key={group.id} {...group} />
              ))}
              
              {/* Create New Group Card */}
              <Card className="border-dashed flex flex-col items-center justify-center p-6 h-full">
                <div className="w-16 h-16 rounded-full bg-bhromani-light-gray flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-bhromani-purple" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Create a New Group</h3>
                <p className="text-gray-600 text-sm text-center mb-4">
                  Start a group with your travel companions
                </p>
                <Button className="bg-bhromani-purple hover:bg-bhromani-purple-dark">
                  Create Group
                </Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="map">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-4">Your Travel Map</h2>
              <LocationMap />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
