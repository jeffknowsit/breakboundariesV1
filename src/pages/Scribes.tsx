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
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
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
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
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
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
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
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
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
          className="bg-card dark:bg-card/95 p-6 rounded-xl shadow-subtle border border-border"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-assist-100 dark:bg-assist-900/20 p-3 rounded-full text-assist-600 dark:text-assist-400">
              <PenLine size={24} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground">How Scribes Help</h3>
              <p className="text-muted-foreground">Our scribes provide assistance with various documentation needs</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-accent/50 dark:bg-accent/20 p-4 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2 text-foreground">
                <CheckCircle size={18} className="text-assist-600 dark:text-assist-400" />
                Document Preparation
              </h4>
              <p className="text-sm text-muted-foreground">Assistance with creating official documents, letters, and applications</p>
            </div>
            <div className="bg-accent/50 dark:bg-accent/20 p-4 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2 text-foreground">
                <CheckCircle size={18} className="text-assist-600 dark:text-assist-400" />
                Form Filling
              </h4>
              <p className="text-sm text-muted-foreground">Help with filling government forms, medical forms, and other applications</p>
            </div>
            <div className="bg-accent/50 dark:bg-accent/20 p-4 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2 text-foreground">
                <CheckCircle size={18} className="text-assist-600 dark:text-assist-400" />
                Educational Support
              </h4>
              <p className="text-sm text-muted-foreground">Note-taking for classes, transcription services, and educational documentation</p>
            </div>
          </div>
        </motion.div>

        <h2 className="text-2xl font-medium mb-6 text-foreground">Available Scribes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scribes.map((scribe, index) => (
            <motion.div
              key={scribe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-card dark:bg-card/95 border-border">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border border-border">
                        <AvatarImage src={scribe.avatar} alt={scribe.name} />
                        <AvatarFallback>{scribe.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg text-foreground">{scribe.name}</CardTitle>
                        <div className="flex items-center gap-1 text-sm text-yellow-500 dark:text-yellow-400">
                          <Star size={16} fill="currentColor" />
                          <span>{scribe.rating}</span>
                          <CardDescription className="ml-2 text-muted-foreground">{scribe.experience} experience</CardDescription>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-assist-50 dark:bg-assist-900/20 text-assist-700 dark:text-assist-200 border-assist-200 dark:border-assist-800">
                      {scribe.price}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{scribe.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mt-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} className="text-assist-600 dark:text-assist-400" />
                      <span>{scribe.availability}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={16} className="text-assist-600 dark:text-assist-400" />
                      <span>{scribe.languages.join(", ")}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {scribe.specialty.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-accent/50 dark:bg-accent/20 text-foreground dark:text-foreground/80">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-assist-600 hover:bg-assist-700 dark:bg-assist-600/90 dark:hover:bg-assist-700/90 text-white"
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
