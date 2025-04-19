
import { User } from "@supabase/supabase-js";
import { Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  content: string;
  created_at: string;
  group_id: string;
  sender_id: string;
  sender_name?: string;
  sender_avatar?: string;
}

interface MessageListProps {
  messages: Message[];
  currentUser: User | null;
  isLoading: boolean;
  formatTime: (timestamp: string) => string;
  formatDate: (timestamp: string) => string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessageList = ({ 
  messages, 
  currentUser, 
  isLoading, 
  formatTime, 
  formatDate,
  messagesEndRef 
}: MessageListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading messages...</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full text-center">
        <Users className="h-12 w-12 text-gray-400 mb-2" />
        <h3 className="text-lg font-medium text-gray-900">No messages yet</h3>
        <p className="text-gray-600 max-w-md">
          Be the first to send a message to this group!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
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
    </div>
  );
};
