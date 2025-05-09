
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import HeroSection from "../components/landing/HeroSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Users, MessageCircle, Calendar, Check, Globe, Route } from "lucide-react";

const Index = () => {
  const [isLoggedIn] = useState(false);
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <HeroSection />
      
      {/* Features Section */}
      <div className="py-16 bg-trailmesh-light-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Your All-in-One Travel Companion</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              TrailMesh brings all your group travel needs into one seamless platform, 
              so you can focus on creating memories, not managing logistics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-amber-500 mb-2" />
                <CardTitle>Real-time Location Sharing</CardTitle>
                <CardDescription>
                  Stay connected with your travel buddies with live location tracking.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">See everyone's location on a map</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Privacy controls for when to share</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Safety check-ins for peace of mind</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Calendar className="h-10 w-10 text-amber-500 mb-2" />
                <CardTitle>Trip Planning Made Simple</CardTitle>
                <CardDescription>
                  Organize your travel itinerary with ease and clarity.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Create detailed day-by-day plans</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Add checklists for must-do activities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Collaborate with your travel mates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <MessageCircle className="h-10 w-10 text-amber-500 mb-2" />
                <CardTitle>Group Chat & Coordination</CardTitle>
                <CardDescription>
                  Keep all your travel conversations in one organized place.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Real-time messaging with your group</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Share photos, locations, and updates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Never lose important travel information</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* New testimonial section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Travelers Are Saying</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of adventurers who have transformed their group travel experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img src="/placeholder.svg" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Sarah J.</h4>
                  <p className="text-sm text-gray-500">Backpacker</p>
                </div>
              </div>
              <p className="text-gray-600">
                "TrailMesh made coordinating our 6-person trek through Nepal so much easier! We never lost track of each other and planning was a breeze."
              </p>
              <div className="flex mt-4 text-amber-500">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img src="/placeholder.svg" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Michael T.</h4>
                  <p className="text-sm text-gray-500">Adventure Guide</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As someone who leads group tours for a living, TrailMesh has been a game-changer. The location sharing keeps everyone safe and the planning tools are top-notch."
              </p>
              <div className="flex mt-4 text-amber-500">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <img src="/placeholder.svg" alt="User" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold">Priya K.</h4>
                  <p className="text-sm text-gray-500">Family Traveler</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Traveling with extended family used to be stressful, but TrailMesh has made our annual reunions so much more enjoyable. Everyone stays in sync!"
              </p>
              <div className="flex mt-4 text-amber-500">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-amber-500 to-yellow-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Group Travel?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join TrailMesh today and make your next adventure with friends and family 
            the most organized, connected, and memorable one yet.
          </p>
          <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100">
            {isLoggedIn ? "Create Your First Trip" : "Get Started for Free"}
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">TrailMesh</h3>
              <p className="text-sm text-gray-300">
                Making group travel easier, more organized, and fun.
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/features" className="text-sm text-gray-300 hover:text-white">Features</Link></li>
                <li><Link to="/about" className="text-sm text-gray-300 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-sm text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-sm text-gray-300 hover:text-white">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-sm text-gray-300 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-sm text-gray-300 hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-medium mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-400 text-center">
              © {new Date().getFullYear()} TrailMesh. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
