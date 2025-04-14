
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Image, Smile, Paperclip, MapPin } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  isCurrentUser: boolean;
}

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  
  // Sample messages - in a real app, these would come from a database
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey everyone! Excited for our trip to Pokhara next weekend!",
      sender: {
        id: "user1",
        name: "Aarav",
        avatar: "/placeholder.svg",
      },
      timestamp: new Date("2023-11-10T10:30:00"),
      status: "read",
      isCurrentUser: false,
    },
    {
      id: "2",
      text: "Me too! Should we all meet at the bus station at 7 AM?",
      sender: {
        id: "user2",
        name: "Sita",
        avatar: "/placeholder.svg",
      },
      timestamp: new Date("2023-11-10T10:32:00"),
      status: "read",
      isCurrentUser: false,
    },
    {
      id: "3",
      text: "Sounds good. I'll share my location once I'm there.",
      sender: {
        id: "user3",
        name: "You",
        avatar: "/placeholder.svg",
      },
      timestamp: new Date("2023-11-10T10:33:00"),
      status: "delivered",
      isCurrentUser: true,
    },
    {
      id: "4",
      text: "Don't forget to check the weather forecast. I heard it might rain.",
      sender: {
        id: "user4",
        name: "Raj",
        avatar: "/placeholder.svg",
      },
      timestamp: new Date("2023-11-10T10:35:00"),
      status: "read",
      isCurrentUser: false,
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: {
        id: "user3",
        name: "You",
        avatar: "/placeholder.svg",
      },
      timestamp: new Date(),
      status: "sent",
      isCurrentUser: true,
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-md overflow-hidden">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between bg-white">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="Group" />
            <AvatarFallback className="bg-bhromani-purple text-white">GP</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h3 className="font-medium">Pokhara Adventure</h3>
            <p className="text-xs text-gray-500">4 members • 1 active now</p>
          </div>
        </div>
        <div>
          <Button variant="ghost" size="icon">
            <MapPin className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}
          >
            <div className="flex max-w-[75%]">
              {!msg.isCurrentUser && (
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarImage src={msg.sender.avatar} alt={msg.sender.name} />
                  <AvatarFallback className="bg-bhromani-purple-dark text-white text-xs">
                    {msg.sender.name[0]}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                {!msg.isCurrentUser && (
                  <p className="text-xs text-gray-600 mb-1">{msg.sender.name}</p>
                )}
                <div
                  className={`p-3 rounded-lg ${
                    msg.isCurrentUser
                      ? "bg-bhromani-purple text-white rounded-tr-none"
                      : "bg-white border border-gray-200 rounded-tl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">{formatTime(msg.timestamp)}</p>
                  {msg.isCurrentUser && (
                    <p className="text-xs text-gray-500">
                      {msg.status === "sent" && "Sent"}
                      {msg.status === "delivered" && "Delivered"}
                      {msg.status === "read" && "Read"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-3 border-t bg-white">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Image className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 mr-1">
            <Smile className="h-5 w-5" />
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
            disabled={message.trim() === ""}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
