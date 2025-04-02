
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import AnimatedHeader from "@/components/ui-components/AnimatedHeader";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, GraduationCap, MapPin, Star, MessageCircle, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type MentorProps = {
  name: string;
  avatar: string;
  profession: string;
  expertise: string[];
  experience: string;
  education: string;
  location: string;
  rating: number;
  sessions: number;
  index: number;
};

const mentors = [
  {
    name: "Alex Morgan",
    avatar: "https://i.pravatar.cc/150?img=11",
    profession: "Software Engineer",
    expertise: ["Career Navigation", "Accessibility Tech", "Workplace Accommodations"],
    experience: "15 years",
    education: "MSc Computer Science",
    location: "San Francisco, CA",
    rating: 4.9,
    sessions: 250
  },
  {
    name: "Jasmine Patel",
    avatar: "https://i.pravatar.cc/150?img=12",
    profession: "Paralympic Athlete",
    expertise: ["Sports Training", "Mental Resilience", "Public Speaking"],
    experience: "10 years",
    education: "BSc Sports Science",
    location: "Chicago, IL",
    rating: 4.8,
    sessions: 180
  },
  {
    name: "Robert Chen",
    avatar: "https://i.pravatar.cc/150?img=13",
    profession: "Education Specialist",
    expertise: ["Alternative Learning Methods", "Education Resources", "Assistive Technology"],
    experience: "12 years",
    education: "PhD in Special Education",
    location: "Boston, MA",
    rating: 4.7,
    sessions: 210
  },
  {
    name: "Olivia Washington",
    avatar: "https://i.pravatar.cc/150?img=14",
    profession: "Entrepreneur",
    expertise: ["Business Development", "Social Enterprise", "Inclusive Product Design"],
    experience: "8 years",
    education: "MBA",
    location: "Austin, TX",
    rating: 4.9,
    sessions: 120
  },
  {
    name: "Marcus Johnson",
    avatar: "https://i.pravatar.cc/150?img=15",
    profession: "HR Consultant",
    expertise: ["Workplace Inclusion", "Career Planning", "Interview Skills"],
    experience: "14 years",
    education: "MSc Human Resources",
    location: "Seattle, WA",
    rating: 4.6,
    sessions: 190
  },
  {
    name: "Sofia Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=16",
    profession: "Life Coach",
    expertise: ["Confidence Building", "Independent Living", "Relationship Skills"],
    experience: "9 years",
    education: "Certified Professional Coach",
    location: "Miami, FL",
    rating: 4.8,
    sessions: 240
  }
];

const MentorCard = ({ name, avatar, profession, expertise, experience, education, location, rating, sessions, index }: MentorProps) => {
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
              <Avatar className="w-16 h-16">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Briefcase size={14} />
                  <span>{profession}</span>
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {expertise.map((skill, idx) => (
                <Badge key={idx} variant="outline" className="bg-gray-50">
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <div className="flex items-center">
                <Briefcase size={16} className="mr-2 text-assist-600" />
                <span>{experience}</span>
              </div>
              <div className="flex items-center">
                <GraduationCap size={16} className="mr-2 text-assist-600" />
                <span>{education}</span>
              </div>
              <div className="flex items-center">
                <Star size={16} className="mr-2 text-yellow-500" />
                <span>{rating} Rating</span>
              </div>
              <div className="flex items-center">
                <MessageCircle size={16} className="mr-2 text-assist-600" />
                <span>{sessions} Sessions</span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={16} className="mr-2" />
              <span>{location}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button className="w-full sm:w-auto bg-assist-600 hover:bg-assist-700">Book a Session</Button>
          <Button variant="outline" className="w-full sm:w-auto">View Profile</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const Mentors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <AnimatedHeader
          title="Dedicated Mentors"
          subtitle="Receive guidance from mentors specially trained to understand your needs and help you navigate various aspects of personal and professional life."
          className="max-w-3xl"
        />

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-gray-500" size={16} />
                <Input 
                  className="pl-10"
                  placeholder="Search by name, expertise, or location" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                <span>Filters</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-6 bg-gray-100/80 p-1">
            <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              All Mentors
            </TabsTrigger>
            <TabsTrigger value="career" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Career
            </TabsTrigger>
            <TabsTrigger value="education" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Education
            </TabsTrigger>
            <TabsTrigger value="personal" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Personal
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor, index) => (
                <MentorCard
                  key={index}
                  name={mentor.name}
                  avatar={mentor.avatar}
                  profession={mentor.profession}
                  expertise={mentor.expertise}
                  experience={mentor.experience}
                  education={mentor.education}
                  location={mentor.location}
                  rating={mentor.rating}
                  sessions={mentor.sessions}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="career" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors
                .filter(mentor => mentor.expertise.some(exp => 
                  exp.includes('Career') || exp.includes('Workplace') || exp.includes('Business') || 
                  mentor.profession === 'HR Consultant' || mentor.profession === 'Entrepreneur'
                ))
                .map((mentor, index) => (
                  <MentorCard
                    key={index}
                    name={mentor.name}
                    avatar={mentor.avatar}
                    profession={mentor.profession}
                    expertise={mentor.expertise}
                    experience={mentor.experience}
                    education={mentor.education}
                    location={mentor.location}
                    rating={mentor.rating}
                    sessions={mentor.sessions}
                    index={index}
                  />
                ))
              }
            </div>
          </TabsContent>

          <TabsContent value="education" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors
                .filter(mentor => mentor.expertise.some(exp => 
                  exp.includes('Education') || exp.includes('Learning') || 
                  mentor.profession === 'Education Specialist'
                ))
                .map((mentor, index) => (
                  <MentorCard
                    key={index}
                    name={mentor.name}
                    avatar={mentor.avatar}
                    profession={mentor.profession}
                    expertise={mentor.expertise}
                    experience={mentor.experience}
                    education={mentor.education}
                    location={mentor.location}
                    rating={mentor.rating}
                    sessions={mentor.sessions}
                    index={index}
                  />
                ))
              }
            </div>
          </TabsContent>

          <TabsContent value="personal" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors
                .filter(mentor => mentor.expertise.some(exp => 
                  exp.includes('Mental') || exp.includes('Confidence') || exp.includes('Relationship') || 
                  exp.includes('Independent') || mentor.profession === 'Life Coach'
                ))
                .map((mentor, index) => (
                  <MentorCard
                    key={index}
                    name={mentor.name}
                    avatar={mentor.avatar}
                    profession={mentor.profession}
                    expertise={mentor.expertise}
                    experience={mentor.experience}
                    education={mentor.education}
                    location={mentor.location}
                    rating={mentor.rating}
                    sessions={mentor.sessions}
                    index={index}
                  />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Mentors;
