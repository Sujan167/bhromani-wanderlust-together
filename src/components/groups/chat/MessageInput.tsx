
import { Send, Image, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  handleSendMessage: () => void;
}

export const MessageInput = ({ message, setMessage, handleSendMessage }: MessageInputProps) => {
  return (
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
  );
};
