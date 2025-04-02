
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import AnimatedHeader from "@/components/ui-components/AnimatedHeader";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PenLine, Star, Calendar, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ScribeProfile {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  specialty: string[];
  languages: string[];
  experience: string;
  availability: string;
  price: string;
  description: string;
}

const scribes: ScribeProfile[] = [
  {
    id: 1,
    name: "Amelia Clarke",
    avatar: "/placeholder.svg",
    rating: 4.9,
    specialty: ["Academic", "Legal", "Medical"],
    languages: ["English", "Spanish"],
    experience: "7 years",
    availability: "Weekdays 9 AM - 5 PM",
    price: "$25/hour",
    description: "Experienced scribe specializing in academic document writing, medical terminologies, and legal documentation with expertise in accessibility standards."
  },
  {
    id: 2,
    name: "James Wilson",
    avatar: "/placeholder.svg",
    rating: 4.8,
    specialty: ["Technical", "Financial", "Academic"],
    languages: ["English", "French"],
    experience: "5 years",
    availability: "Flexible hours",
    price: "$30/hour",
    description: "Technical writer with background in financial documentation and academic papers. Proficient in creating accessible documentation for various needs."
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    avatar: "/placeholder.svg",
    rating: 4.7,
    specialty: ["Creative", "Medical", "Government Applications"],
    languages: ["English", "Portuguese", "Spanish"],
    experience: "6 years",
    availability: "Evenings and weekends",
    price: "$28/hour",
    description: "Multilingual scribe with experience in creative writing, medical documentation, and helping with government application processes."
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "/placeholder.svg",
    rating: 4.9,
    specialty: ["Legal", "Technical", "Educational"],
    languages: ["English", "Korean"],
    experience: "8 years",
    availability: "Weekdays and Saturdays",
    price: "$32/hour",
    description: "Legal document specialist with technical writing expertise. Experienced in educational content creation and accessibility compliant documentation."
  }
];

const Scribes = () => {
  const { toast } = useToast();

  const handleBookScribe = (name: string) => {
    toast({
      title: "Booking Requested",
      description: `Your request to book ${name} has been sent. You'll receive a confirmation shortly.`,
      duration: 5000,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <AnimatedHeader 
          title="Scribes Assistance"
          subtitle="Connect with professional scribes who can assist you with documentation, forms, applications, and other written tasks. Our scribes are trained to understand various needs and can help make written tasks more accessible."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100 mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-assist-100 p-3 rounded-full text-assist-600">
              <PenLine size={24} />
            </div>
            <div>
              <h3 className="text-lg font-medium">How Scribes Help</h3>
              <p className="text-gray-600">Our scribes provide assistance with various documentation needs</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle size={18} className="text-assist-600" />
                Document Preparation
              </h4>
              <p className="text-sm text-gray-600">Assistance with creating official documents, letters, and applications</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle size={18} className="text-assist-600" />
                Form Filling
              </h4>
              <p className="text-sm text-gray-600">Help with filling government forms, medical forms, and other applications</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <CheckCircle size={18} className="text-assist-600" />
                Educational Support
              </h4>
              <p className="text-sm text-gray-600">Note-taking for classes, transcription services, and educational documentation</p>
            </div>
          </div>
        </motion.div>

        <h2 className="text-2xl font-medium mb-6">Available Scribes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scribes.map((scribe, index) => (
            <motion.div
              key={scribe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={scribe.avatar} alt={scribe.name} />
                        <AvatarFallback>{scribe.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{scribe.name}</CardTitle>
                        <div className="flex items-center gap-1 text-sm text-yellow-500">
                          <Star size={16} fill="currentColor" />
                          <span>{scribe.rating}</span>
                          <CardDescription className="ml-2">{scribe.experience} experience</CardDescription>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-assist-50 text-assist-700 border-assist-200">
                      {scribe.price}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{scribe.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-assist-600" />
                      <span>{scribe.availability}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-assist-600" />
                      <span>{scribe.languages.join(", ")}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {scribe.specialty.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-gray-100 text-gray-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-assist-600 hover:bg-assist-700"
                    onClick={() => handleBookScribe(scribe.name)}
                  >
                    Book Scribe
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Scribes;
