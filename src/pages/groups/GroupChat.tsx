import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { Send, Image, Paperclip, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/common/Navbar";

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
    // Check if the user is authenticated and a member of this group
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
        
        // Check if the user is a member of this group
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
        
        // Get group details
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
        
        // Get member count
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
        
        // Fetch messages
        fetchMessages();
        
        // Set up real-time subscription for new messages
        const channel = supabase
          .channel('public:group_messages')
          .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'group_messages',
            filter: `group_id=eq.${groupId}`
          }, (payload) => {
            // Add the new message to the list
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
      
      // Get messages from the database
      const { data, error } = await supabase
        .from("group_messages")
        .select("*")
        .eq("group_id", groupId)
        .order("created_at", { ascending: true });
        
      if (error) throw error;
      
      // Get user profiles for all senders
      const senderIds = [...new Set(data.map(msg => msg.sender_id))];
      
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .in("id", senderIds);
        
      if (profilesError) throw profilesError;
      
      // Create a map of user IDs to profile data
      const userProfiles = (profilesData || []).reduce((acc, profile) => {
        acc[profile.id] = {
          name: profile.full_name || "Unknown User",
          avatar: profile.avatar_url,
        };
        return acc;
      }, {} as Record<string, { name: string; avatar: string | null }>);
      
      // Combine message data with sender information
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
    // If the message is from the current user, we already have the sender info
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
      // Otherwise, fetch the sender's profile
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
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!message.trim() || !currentUser || !groupId) return;
    
    try {
      // Insert the message into the database
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
      
      // Clear the input
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
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between bg-white">
              <div className="flex items-center">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" alt="Group" />
                  <AvatarFallback className="bg-bhromani-purple text-white">
                    {groupDetails?.name.charAt(0) || "G"}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h3 className="font-medium">{groupDetails?.name || "Group Chat"}</h3>
                  <p className="text-xs text-gray-500">
                    {groupDetails?.member_count || 0} members
                  </p>
                </div>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <p>Loading messages...</p>
                </div>
              ) : messages.length > 0 ? (
                <>
                  {messages.map((msg, index) => {
                    const isCurrentUser = msg.sender_id === currentUser?.id;
                    const showDate = index === 0 || 
                      formatDate(messages[index-1].created_at) !== formatDate(msg.created_at);
                      
                    return (
                      <div key={msg.id}>
                        {showDate && (
                          <div className="flex justify-center my-4">
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600">
                              {formatDate(msg.created_at)}
                            </span>
                          </div>
                        )}
                        <div className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                          <div className="flex max-w-[75%]">
                            {!isCurrentUser && (
                              <Avatar className="h-8 w-8 mr-2 mt-1">
                                <AvatarImage src={msg.sender_avatar} alt={msg.sender_name} />
                                <AvatarFallback className="bg-bhromani-purple-dark text-white text-xs">
                                  {msg.sender_name?.charAt(0) || "U"}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              {!isCurrentUser && (
                                <p className="text-xs text-gray-600 mb-1">{msg.sender_name}</p>
                              )}
                              <div
                                className={`p-3 rounded-lg ${
                                  isCurrentUser
                                    ? "bg-bhromani-purple text-white rounded-tr-none"
                                    : "bg-white border border-gray-200 rounded-tl-none"
                                }`}
                              >
                                <p className="text-sm">{msg.content}</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{formatTime(msg.created_at)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                <div className="flex flex-col justify-center items-center h-full text-center">
                  <Users className="h-12 w-12 text-gray-400 mb-2" />
                  <h3 className="text-lg font-medium text-gray-900">No messages yet</h3>
                  <p className="text-gray-600 max-w-md">
                    Be the first to send a message to this group!
                  </p>
                </div>
              )}
            </div>
            
            {/* Message Input */}
            <div className="p-3 border-t bg-white">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-500 mr-1">
                  <Image className="h-5 w-5" />
                </Button>
                
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                />
                
                <Button
                  onClick={handleSendMessage}
                  className="ml-2 bg-bhromani-purple hover:bg-bhromani-purple-dark"
                  size="icon"
                  disabled={!message.trim()}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GroupChat;
