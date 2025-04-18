
import Navbar from "@/components/common/Navbar";
import { MapPin } from "lucide-react";

const Places = () => {
  return (
    <div className="min-h-screen bg-bhromani-light-gray">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Places</h1>
            
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <MapPin className="h-12 w-12 text-bhromani-purple opacity-60" />
              </div>
              <h2 className="text-xl font-medium mb-2">No saved places yet</h2>
              <p className="text-gray-500 max-w-md">
                Your favorite and saved locations will appear here once you start adding them from your trips and explorations.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Places;
