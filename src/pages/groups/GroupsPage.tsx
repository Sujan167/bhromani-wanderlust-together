
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/common/Navbar";
import GroupCard from "@/components/groups/GroupCard";
import { toast } from "@/components/ui/use-toast";

interface Group {
  id: string;
  name: string;
  description: string | null;
  cover_image: string | null;
  created_at: string;
  created_by: string;
  member_count?: number;
  organizer?: {
    name: string;
    avatar?: string;
  };
  members?: Array<{
    name: string;
    avatar?: string;
  }>;
}

const GroupsPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setIsLoading(true);
        
        // Get the current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error("User not authenticated");
        }

        // Get groups the user is a member of
        const { data: memberGroups, error: memberError } = await supabase
          .from("group_members")
          .select("group_id")
          .eq("user_id", user.id);

        if (memberError) throw memberError;

        if (!memberGroups || memberGroups.length === 0) {
          setGroups([]);
          setIsLoading(false);
          return;
        }

        const groupIds = memberGroups.map(member => member.group_id);

        // Get the group details
        const { data: groupData, error: groupError } = await supabase
          .from("groups")
          .select("*")
          .in("id", groupIds);

        if (groupError) throw groupError;

        // For each group, get member count and some sample members
        const enhancedGroups = await Promise.all(
          (groupData || []).map(async (group) => {
            // Get member count
            const { count, error: countError } = await supabase
              .from("group_members")
              .select("*", { count: "exact", head: true })
              .eq("group_id", group.id);

            if (countError) console.error("Error counting members:", countError);

            // Get organizer info (creator)
            const { data: creatorData, error: creatorError } = await supabase
              .from("profiles")
              .select("full_name, avatar_url")
              .eq("id", group.created_by)
              .single();

            if (creatorError) console.error("Error fetching creator:", creatorError);

            // Get some members for preview
            const { data: membersData, error: membersError } = await supabase
              .from("group_members")
              .select("user_id")
              .eq("group_id", group.id)
              .neq("user_id", group.created_by)
              .limit(5);

            if (membersError) console.error("Error fetching members:", membersError);

            // Get member profiles
            let members: { name: string; avatar?: string }[] = [];
            
            if (membersData && membersData.length > 0) {
              const userIds = membersData.map(m => m.user_id);
              
              const { data: profilesData, error: profilesError } = await supabase
                .from("profiles")
                .select("full_name, avatar_url")
                .in("id", userIds);

              if (profilesError) console.error("Error fetching profiles:", profilesError);
              
              members = (profilesData || []).map(profile => ({
                name: profile.full_name || "Member",
                avatar: profile.avatar_url || undefined
              }));
            }

            return {
              ...group,
              member_count: count || 0,
              organizer: {
                name: creatorData?.full_name || "Organizer",
                avatar: creatorData?.avatar_url || undefined
              },
              members
            };
          })
        );

        setGroups(enhancedGroups);
      } catch (error: any) {
        console.error("Error fetching groups:", error);
        toast({
          title: "Error",
          description: "Failed to load groups. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (group.description && group.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateGroup = () => {
    navigate("/groups/create");
  };

  return (
    <div className="min-h-screen bg-bhromani-light-gray">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Groups</h1>
              <p className="text-gray-600 mt-1">Connect with your hiking and trekking communities</p>
            </div>
            
            <Button 
              onClick={handleCreateGroup}
              className="mt-4 sm:mt-0 bg-bhromani-purple hover:bg-bhromani-purple-dark"
            >
              <Plus className="mr-2 h-4 w-4" /> Create Group
            </Button>
          </div>
          
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search groups..."
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
          ) : filteredGroups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  id={group.id}
                  name={group.name}
                  memberCount={group.member_count || 0}
                  description={group.description || ""}
                  image={group.cover_image || undefined}
                  organizer={group.organizer || { name: "Organizer" }}
                  members={group.members || []}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl">
              <h3 className="text-xl font-medium text-gray-900 mb-2">No groups found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? "No groups match your search criteria. Try with a different term."
                  : "You haven't joined any groups yet. Create one or join an existing group."}
              </p>
              <Button onClick={handleCreateGroup} className="bg-bhromani-purple hover:bg-bhromani-purple-dark">
                <Plus className="mr-2 h-4 w-4" /> Create Your First Group
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GroupsPage;
