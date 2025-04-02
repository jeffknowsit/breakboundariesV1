
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import AnimatedHeader from "@/components/ui-components/AnimatedHeader";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Star, User, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TherapistProps = {
  name: string;
  avatar: string;
  specialty: string;
  experience: string;
  rating: number;
  languages: string[];
  availableToday: boolean;
  index: number;
};

const therapists = [
  {
    name: "Dr. Emma Thompson",
    avatar: "https://i.pravatar.cc/150?img=1",
    specialty: "Speech Therapy",
    experience: "12 years",
    rating: 4.9,
    languages: ["English", "Spanish"],
    availableToday: true
  },
  {
    name: "Dr. Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=2",
    specialty: "Occupational Therapy",
    experience: "8 years",
    rating: 4.7,
    languages: ["English", "Mandarin"],
    availableToday: false
  },
  {
    name: "Dr. Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=3",
    specialty: "Physical Therapy",
    experience: "15 years",
    rating: 4.8,
    languages: ["English", "French"],
    availableToday: true
  },
  {
    name: "Dr. David Williams",
    avatar: "https://i.pravatar.cc/150?img=4",
    specialty: "Cognitive Behavioral Therapy",
    experience: "10 years",
    rating: 4.6,
    languages: ["English"],
    availableToday: true
  },
  {
    name: "Dr. Priya Sharma",
    avatar: "https://i.pravatar.cc/150?img=5",
    specialty: "Art Therapy",
    experience: "7 years",
    rating: 4.9,
    languages: ["English", "Hindi"],
    availableToday: false
  },
  {
    name: "Dr. James Wilson",
    avatar: "https://i.pravatar.cc/150?img=6",
    specialty: "Music Therapy",
    experience: "9 years",
    rating: 4.8,
    languages: ["English", "German"],
    availableToday: true
  }
];

const TherapistCard = ({ name, avatar, specialty, experience, rating, languages, availableToday, index }: TherapistProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{name}</CardTitle>
                <CardDescription>{specialty}</CardDescription>
              </div>
            </div>
            {availableToday && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available Today</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            <div className="flex items-center">
              <Star size={16} className="mr-2 text-yellow-500" />
              <span>{rating} Rating</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-assist-600" />
              <span>{experience}</span>
            </div>
            <div className="col-span-2 mt-1">
              <span className="text-gray-600">Languages: </span>
              <span>{languages.join(", ")}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button className="w-full sm:w-auto bg-assist-600 hover:bg-assist-700">Book Appointment</Button>
          <Button variant="outline" className="w-full sm:w-auto">View Profile</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const Therapists = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <AnimatedHeader
          title="Professional Therapists"
          subtitle="Connect with qualified therapists specialized in various areas to receive personalized guidance, support, and therapy sessions."
          className="max-w-3xl"
        />

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-gray-500 dark:text-[#ea384c]" size={16} />
                <Input 
                  className="pl-10"
                  placeholder="Search by name, specialty, or language" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} className="dark:text-[#ea384c]" />
                <span className="dark:text-[#ea384c]">Filters</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-6 bg-gray-100/80 dark:bg-gray-900/80 p-1">
            <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm">
              All Therapists
            </TabsTrigger>
            <TabsTrigger value="available" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm">
              Available Today
            </TabsTrigger>
            <TabsTrigger value="bookmarked" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow-sm">
              Bookmarked
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {therapists.map((therapist, index) => (
                <TherapistCard
                  key={index}
                  name={therapist.name}
                  avatar={therapist.avatar}
                  specialty={therapist.specialty}
                  experience={therapist.experience}
                  rating={therapist.rating}
                  languages={therapist.languages}
                  availableToday={therapist.availableToday}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="available" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {therapists
                .filter(therapist => therapist.availableToday)
                .map((therapist, index) => (
                  <TherapistCard
                    key={index}
                    name={therapist.name}
                    avatar={therapist.avatar}
                    specialty={therapist.specialty}
                    experience={therapist.experience}
                    rating={therapist.rating}
                    languages={therapist.languages}
                    availableToday={therapist.availableToday}
                    index={index}
                  />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookmarked" className="mt-0">
            <div className="bg-white rounded-xl p-8 shadow-subtle border border-gray-100 text-center">
              <User size={48} className="text-assist-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No Bookmarked Therapists</h3>
              <p className="text-gray-600 mb-4 max-w-md mx-auto">
                You haven't bookmarked any therapists yet. Browse the available therapists and bookmark those you're interested in.
              </p>
              <Button className="bg-assist-600 hover:bg-assist-700">
                Browse Therapists
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Therapists;
