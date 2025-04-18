
import Navbar from "@/components/common/Navbar";
import { Calendar } from "lucide-react";

const History = () => {
  return (
    <div className="min-h-screen bg-bhromani-light-gray">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Trip History</h1>
            
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-100 rounded-full p-6 mb-4">
                <Calendar className="h-12 w-12 text-bhromani-purple opacity-60" />
              </div>
              <h2 className="text-xl font-medium mb-2">No trip history yet</h2>
              <p className="text-gray-500 max-w-md">
                Your completed trips and journeys will be shown here once you've marked them as completed.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default History;
