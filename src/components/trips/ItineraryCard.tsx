
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, MapPin, Edit2, Plus, CheckSquare } from "lucide-react";

interface ItineraryItemProps {
  id: string;
  title: string;
  description?: string;
  location?: string;
  date?: string;
  time?: string;
  completed?: boolean;
  checklist?: Array<{
    id: string;
    text: string;
    done: boolean;
  }>;
}

const ItineraryCard = ({
  id,
  title,
  description,
  location,
  date,
  time,
  completed = false,
  checklist = [],
}: ItineraryItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);
  const [items, setItems] = useState(checklist);

  const toggleItemStatus = (itemId: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, done: !item.done } : item
    ));
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border ${
      isCompleted ? "border-green-200 bg-green-50/30" : "border-gray-200"
    } transition-all`}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex space-x-3">
            <Checkbox 
              checked={isCompleted}
              onCheckedChange={() => setIsCompleted(!isCompleted)}
              className={`mt-1 ${isCompleted ? "bg-green-500 text-white" : ""}`}
            />
            <div>
              <h3 className={`font-medium ${isCompleted ? "line-through text-gray-500" : "text-gray-900"}`}>
                {title}
              </h3>
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
              
              <div className="flex flex-wrap gap-3 mt-2">
                {location && (
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{location}</span>
                  </div>
                )}
                {date && (
                  <div className="flex items-center text-xs text-gray-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{date}</span>
                  </div>
                )}
                {time && (
                  <div className="flex items-center text-xs text-gray-600">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{time}</span>
                  </div>
                )}
              </div>
              
              {items.length > 0 && (
                <Button
                  variant="ghost"
                  className="p-0 h-auto text-xs text-bhromani-purple mt-2 flex items-center"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  <CheckSquare className="h-3 w-3 mr-1" />
                  {isExpanded ? "Hide checklist" : `View checklist (${items.filter(i => i.done).length}/${items.length})`}
                </Button>
              )}
            </div>
          </div>
          
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit2 className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
        
        {isExpanded && items.length > 0 && (
          <div className="mt-4 pl-8">
            <div className="border-t pt-3 space-y-2">
              {items.map(item => (
                <div key={item.id} className="flex items-start space-x-2">
                  <Checkbox 
                    id={item.id} 
                    checked={item.done}
                    onCheckedChange={() => toggleItemStatus(item.id)}
                    className={item.done ? "bg-green-500 text-white" : ""}
                  />
                  <label 
                    htmlFor={item.id} 
                    className={`text-sm ${item.done ? "line-through text-gray-500" : "text-gray-700"}`}
                  >
                    {item.text}
                  </label>
                </div>
              ))}
              <Button variant="ghost" className="p-0 h-auto text-xs text-bhromani-purple flex items-center mt-1">
                <Plus className="h-3 w-3 mr-1" />
                Add item
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryCard;
