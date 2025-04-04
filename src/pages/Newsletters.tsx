import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Mail, Share2 } from "lucide-react";

// Sample success stories data
const successStories = [
  {
    id: 1,
    title: "How I navigated the tech industry and became a senior software developer at a Fortune 500 company, developing accessibility tools that are now industry standards.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop",
    category: "Career",
    author: {
      name: "Alex Chen",
      role: "Senior Software Developer",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    featured: true
  },
  {
    id: 2,
    title: "After winning gold in wheelchair racing, I channeled my passion into creating an inclusive fitness brand that serves people of all abilities.",
    image: "https://images.unsplash.com/photo-1530213786676-41ad9f7736f6?q=80&w=1000&auto=format&fit=crop",
    category: "Entrepreneurship",
    author: {
      name: "Sarah Johnson",
      role: "Paralympian & Entrepreneur",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    featured: true
  },
  {
    id: 3,
    title: "Breaking barriers in education: My journey from special education to becoming a university professor.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1000&auto=format&fit=crop",
    category: "Education",
    author: {
      name: "Dr. Michael Brown",
      role: "Professor of Education",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    featured: false
  }
];

const SuccessStoryCard = ({ story }: { story: typeof successStories[0] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group overflow-hidden h-full bg-[#0A0118] hover:shadow-lg transition-all duration-300 border-0 cursor-pointer">
        <div className="relative">
          {/* Image with gradient overlay */}
          <div className="aspect-[4/3] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0118]/70 to-[#0A0118] z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0118] via-transparent to-transparent opacity-60 z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0118]/50 via-transparent to-transparent z-10" />
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          {story.featured && (
            <Badge className="absolute top-4 right-4 bg-blue-500/90 backdrop-blur-sm z-20">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="p-6 relative z-20 -mt-20">
          <div className="space-y-4">
            <Badge variant="outline" className="mb-2 bg-transparent border-gray-700 text-gray-300">
              {story.category}
            </Badge>
            <h3 className="text-xl font-semibold leading-tight line-clamp-2 text-white">
              {story.title}
            </h3>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={story.author.avatar} />
                <AvatarFallback>{story.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-white">{story.author.name}</p>
                <p className="text-sm text-gray-400">{story.author.role}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <Button 
                variant="ghost" 
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 pl-0"
              >
                Read full story <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-gray-400 hover:text-gray-300 hover:bg-gray-800"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Newsletters = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Featured Success Stories</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Inspiring journeys of differently-abled individuals breaking barriers and achieving their dreams.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe to Newsletter
              </Button>
              <Button variant="outline">
                <Star className="mr-2 h-4 w-4" />
                Featured Stories
              </Button>
            </div>
          </motion.div>

          {/* Featured Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <SuccessStoryCard key={story.id} story={story} />
            ))}
          </div>

          {/* Newsletter Subscription Card */}
          <Card className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <CardContent className="p-8">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-4">Get Inspired Weekly</h2>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter to receive weekly success stories and updates from our community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    Subscribe Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Newsletters;
