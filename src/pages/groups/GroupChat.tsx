import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/common/Navbar";
import { ChatHeader } from "@/components/groups/chat/ChatHeader";
import { MessageList } from "@/components/groups/chat/MessageList";
import { MessageInput } from "@/components/groups/chat/MessageInput";

interface Message {
  id: string;
  content: string;
  created_at: string;
  group_id: string;
  sender_id: string;
  sender_name?: string;
  sender_avatar?: string;
}

interface GroupDetails {
  id: string;
  name: string;
  description: string | null;
  member_count: number;
}

const GroupChat = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [groupDetails, setGroupDetails] = useState<GroupDetails | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Authentication required",
            description: "Please log in to view this chat.",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }
        
        setCurrentUser(user);
        
        const { data: memberData, error: memberError } = await supabase
          .from("group_members")
          .select("*")
          .eq("group_id", groupId)
          .eq("user_id", user.id)
          .single();
          
        if (memberError || !memberData) {
          toast({
            title: "Access denied",
            description: "You are not a member of this group.",
            variant: "destructive",
          });
          navigate("/groups");
          return;
        }
        
        const { data: groupData, error: groupError } = await supabase
          .from("groups")
          .select("*")
          .eq("id", groupId)
          .single();
          
        if (groupError || !groupData) {
          toast({
            title: "Error",
            description: "Group not found.",
            variant: "destructive",
          });
          navigate("/groups");
          return;
        }
        
        const { count, error: countError } = await supabase
          .from("group_members")
          .select("*", { count: "exact", head: true })
          .eq("group_id", groupId);
          
        if (countError) {
          console.error("Error counting members:", countError);
        }
        
        setGroupDetails({
          id: groupData.id,
          name: groupData.name,
          description: groupData.description,
          member_count: count || 0,
        });
        
        fetchMessages();
        
        const channel = supabase
          .channel('public:group_messages')
          .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'group_messages',
            filter: `group_id=eq.${groupId}`
          }, (payload) => {
            handleNewMessage(payload.new as Message);
          })
          .subscribe();
          
        return () => {
          supabase.removeChannel(channel);
        };
      } catch (error) {
        console.error("Error setting up chat:", error);
        toast({
          title: "Error",
          description: "Failed to load the chat. Please try again.",
          variant: "destructive",
        });
      }
    };
    
    checkAuth();
  }, [groupId, navigate]);
  
  const fetchMessages = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from("group_messages")
        .select("*")
        .eq("group_id", groupId)
        .order("created_at", { ascending: true });
        
      if (error) throw error;
      
      const senderIds = [...new Set(data.map(msg => msg.sender_id))];
      
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .in("id", senderIds);
        
      if (profilesError) throw profilesError;
      
      const userProfiles = (profilesData || []).reduce((acc, profile) => {
        acc[profile.id] = {
          name: profile.full_name || "Unknown User",
          avatar: profile.avatar_url,
        };
        return acc;
      }, {} as Record<string, { name: string; avatar: string | null }>);
      
      const messagesWithSenders = data.map(msg => ({
        ...msg,
        sender_name: userProfiles[msg.sender_id]?.name || "Unknown User",
        sender_avatar: userProfiles[msg.sender_id]?.avatar || undefined,
      }));
      
      setMessages(messagesWithSenders);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to load messages. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNewMessage = async (newMessage: Message) => {
    if (newMessage.sender_id === currentUser?.id) {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", currentUser.id)
        .single();
        
      setMessages(prev => [...prev, {
        ...newMessage,
        sender_name: profileData?.full_name || "You",
        sender_avatar: profileData?.avatar_url || undefined,
      }]);
    } else {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", newMessage.sender_id)
        .single();
        
      setMessages(prev => [...prev, {
        ...newMessage,
        sender_name: profileData?.full_name || "Unknown User",
        sender_avatar: profileData?.avatar_url || undefined,
      }]);
    }
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!message.trim() || !currentUser || !groupId) return;
    
    try {
      const { data, error } = await supabase
        .from("group_messages")
        .insert({
          content: message.trim(),
          group_id: groupId,
          sender_id: currentUser.id,
        })
        .select()
        .single();
        
      if (error) throw error;
      
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };
  
  return (
    <div className="min-h-screen bg-bhromani-light-gray">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-4"
            onClick={() => navigate("/groups")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Groups
          </Button>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[70vh]">
            <ChatHeader groupDetails={groupDetails} />
            
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <MessageList
                messages={messages}
                currentUser={currentUser}
                isLoading={isLoading}
                formatTime={formatTime}
                formatDate={formatDate}
                messagesEndRef={messagesEndRef}
              />
            </div>
            
            <MessageInput
              message={message}
              setMessage={setMessage}
              handleSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GroupChat;
