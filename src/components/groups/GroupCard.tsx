
import { Link } from "react-router-dom";
import { Users, MapPin, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface GroupCardProps {
  id: string;
  name: string;
  memberCount: number;
  description: string;
  image?: string;
  activeTripName?: string;
  activeTripLocation?: string;
  activeTripDate?: string;
  organizer: {
    name: string;
    avatar?: string;
  };
  members: Array<{
    name: string;
    avatar?: string;
  }>;
}

const GroupCard = ({
  id,
  name,
  memberCount,
  description,
  image,
  activeTripName,
  activeTripLocation,
  activeTripDate,
  organizer,
  members,
}: GroupCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
      {/* Group Header */}
      <div className="relative h-32 bg-gradient-to-r from-bhromani-purple to-bhromani-purple-dark">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <div className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
              <Users className="h-3 w-3 text-white mr-1" />
              <span className="text-xs text-white">{memberCount}</span>
            </div>
          </div>
          <p className="text-sm text-white/90 line-clamp-2">{description}</p>
        </div>
      </div>

      {/* Group Info */}
      <div className="p-4">
        {/* Active Trip Info */}
        {activeTripName && (
          <div className="mb-4 p-3 bg-bhromani-light-gray rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium">Active Trip</h4>
              <Link to={`/trips/${id}`} className="text-xs text-bhromani-purple hover:underline flex items-center">
                View <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
            <p className="text-base font-semibold text-bhromani-purple-dark">{activeTripName}</p>
            
            <div className="mt-2 flex items-start space-x-4 text-xs text-gray-600">
              {activeTripLocation && (
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span>{activeTripLocation}</span>
                </div>
              )}
              {activeTripDate && (
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span>{activeTripDate}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Members */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">Members</h4>
            <span className="text-xs text-gray-500">Organized by {organizer.name}</span>
          </div>
          
          <div className="flex -space-x-2 overflow-hidden">
            <Avatar className="border-2 border-white">
              <AvatarImage src={organizer.avatar || "/placeholder.svg"} alt={organizer.name} />
              <AvatarFallback className="bg-bhromani-orange text-white">
                {organizer.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            {members.slice(0, 4).map((member, index) => (
              <Avatar key={index} className="border-2 border-white">
                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                <AvatarFallback className="bg-bhromani-purple text-white">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
            
            {members.length > 4 && (
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-bhromani-light-gray text-xs font-medium">
                +{members.length - 4}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button asChild className="flex-1" variant="outline">
            <Link to={`/groups/${id}/chat`}>Chat</Link>
          </Button>
          <Button asChild className="flex-1 bg-bhromani-purple hover:bg-bhromani-purple-dark">
            <Link to={`/groups/${id}`}>View Group</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
