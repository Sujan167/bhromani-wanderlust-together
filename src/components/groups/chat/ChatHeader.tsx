
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface GroupDetails {
  id: string;
  name: string;
  description: string | null;
  member_count: number;
}

interface ChatHeaderProps {
  groupDetails: GroupDetails | null;
}

export const ChatHeader = ({ groupDetails }: ChatHeaderProps) => {
  return (
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
  );
};
