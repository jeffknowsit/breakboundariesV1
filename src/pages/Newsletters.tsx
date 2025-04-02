
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import AnimatedHeader from "@/components/ui-components/AnimatedHeader";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Calendar, Award, TrendingUp, BookOpen, User, ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface SuccessStory {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  featured?: boolean;
}

const stories: SuccessStory[] = [
  {
    id: 1,
    title: "Breaking Barriers in Technology: My Journey as a Blind Software Developer",
    category: "Career",
    excerpt: "How I navigated the tech industry and became a senior software developer at a Fortune 500 company, developing accessibility tools that are now industry standards.",
    author: {
      name: "Michael Chen",
      role: "Senior Software Developer",
      avatar: "/placeholder.svg"
    },
    date: "June 12, 2023",
    readTime: "8 min read",
    featured: true
  },
  {
    id: 2,
    title: "From Paralympic Gold to Business Success: Building an Inclusive Fitness Empire",
    category: "Entrepreneurship",
    excerpt: "After winning gold in wheelchair racing, I channeled my passion into creating an inclusive fitness brand that serves people of all abilities.",
    author: {
      name: "Sarah Johnson",
      role: "Paralympian & Entrepreneur",
      avatar: "/placeholder.svg"
    },
    date: "May 28, 2023",
    readTime: "12 min read",
    featured: true
  },
  {
    id: 3,
    title: "Finding My Voice: How Text-to-Speech Technology Changed My Academic Career",
    category: "Education",
    excerpt: "Living with a speech impairment, I discovered how assistive technologies could help me excel in my studies and eventually become a university professor.",
    author: {
      name: "David Martinez",
      role: "Professor of Literature",
      avatar: "/placeholder.svg"
    },
    date: "June 5, 2023",
    readTime: "10 min read"
  },
  {
    id: 4,
    title: "Dancing Beyond Limitations: Creating an Inclusive Dance Company",
    category: "Arts",
    excerpt: "How I transformed my passion for dance into a professional company that features dancers with and without disabilities, changing perceptions one performance at a time.",
    author: {
      name: "Amelia Wong",
      role: "Choreographer & Artistic Director",
      avatar: "/placeholder.svg"
    },
    date: "May 19, 2023",
    readTime: "7 min read"
  },
  {
    id: 5,
    title: "The Climb to the Top: Conquering Mountains with Prosthetic Limbs",
    category: "Sports",
    excerpt: "After losing both legs in an accident, I set out to climb the highest peaks on each continent, proving that adventure knows no boundaries.",
    author: {
      name: "James Peterson",
      role: "Mountaineer & Motivational Speaker",
      avatar: "/placeholder.svg"
    },
    date: "June 8, 2023",
    readTime: "15 min read"
  },
  {
    id: 6,
    title: "Redefining Beauty Standards: My Journey as a Model with Down Syndrome",
    category: "Fashion",
    excerpt: "How I challenged industry norms and became one of the first professional models with Down Syndrome to walk international runways.",
    author: {
      name: "Olivia Garcia",
      role: "Professional Model & Advocate",
      avatar: "/placeholder.svg"
    },
    date: "May 22, 2023",
    readTime: "9 min read"
  }
];

const Newsletters = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address to subscribe.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Subscription Successful",
      description: "Thank you for subscribing to our newsletter!",
      duration: 5000,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <AnimatedHeader 
          title="Success Newsletters"
          subtitle="Discover inspiring stories of achievements and breakthroughs by differently-abled individuals from around the world. Our curated newsletters highlight personal journeys, career milestones, and innovative contributions that are reshaping society."
        />

        {/* Newsletter Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-assist-50 p-6 rounded-xl border border-assist-100"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-assist-100 p-3 rounded-full text-assist-600">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-medium">Subscribe to Our Newsletter</h3>
                <p className="text-gray-600">Get inspiring stories and community updates delivered to your inbox monthly</p>
              </div>
            </div>
            <div className="flex w-full md:w-auto max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-assist-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button 
                className="rounded-l-none bg-assist-600 hover:bg-assist-700"
                onClick={handleSubscribe}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Featured Stories */}
        <div>
          <h2 className="text-2xl font-medium mb-6">Featured Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {stories.filter(story => story.featured).map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-subtle border border-gray-100 overflow-hidden"
              >
                <div className="h-48 bg-gray-100 relative">
                  <img 
                    src="/placeholder.svg" 
                    alt={story.title} 
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-assist-600">
                    Featured
                  </Badge>
                </div>
                <div className="p-6">
                  <Badge variant="outline" className="mb-2">
                    {story.category}
                  </Badge>
                  <h3 className="text-xl font-medium mb-2">{story.title}</h3>
                  <p className="text-gray-600 mb-4">{story.excerpt}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={story.author.avatar} alt={story.author.name} />
                        <AvatarFallback>{story.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{story.author.name}</div>
                        <div className="text-sm text-gray-500">{story.author.role}</div>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-assist-600 hover:text-assist-700 gap-1">
                      Read more
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Stories Tab Interface */}
        <Tabs defaultValue="all" className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium">All Success Stories</h2>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="career">Career</TabsTrigger>
              <TabsTrigger value="sports">Sports</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="arts">Arts</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <StoryCard key={story.id} story={story} index={index} />
            ))}
          </TabsContent>
          
          <TabsContent value="career" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories
              .filter(story => story.category === "Career" || story.category === "Entrepreneurship")
              .map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))}
          </TabsContent>
          
          <TabsContent value="sports" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories
              .filter(story => story.category === "Sports")
              .map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))}
          </TabsContent>
          
          <TabsContent value="education" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories
              .filter(story => story.category === "Education")
              .map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))}
          </TabsContent>
          
          <TabsContent value="arts" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories
              .filter(story => story.category === "Arts" || story.category === "Fashion")
              .map((story, index) => (
                <StoryCard key={story.id} story={story} index={index} />
              ))}
          </TabsContent>
        </Tabs>
        
        {/* Community Achievements */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Award size={24} className="text-assist-600" />
            <h2 className="text-2xl font-medium">Community Achievements</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <AchievementCard 
              icon={<TrendingUp size={24} />}
              title="Employment Growth"
              value="27%"
              description="Increase in employment within our community over the past year"
            />
            <AchievementCard 
              icon={<User size={24} />}
              title="New Members"
              value="1,243"
              description="Individuals joined our community in the last quarter"
            />
            <AchievementCard 
              icon={<BookOpen size={24} />}
              title="Education Access"
              value="32"
              description="New scholarship programs initiated for community members"
            />
            <AchievementCard 
              icon={<Award size={24} />}
              title="Recognition"
              value="18"
              description="National awards won by community members this year"
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const StoryCard = ({ story, index }: { story: SuccessStory; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
  >
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <Badge variant="outline" className="w-fit mb-2">
          {story.category}
        </Badge>
        <CardTitle className="text-lg">{story.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Calendar size={14} />
          <span>{story.date}</span>
          <span>•</span>
          <span>{story.readTime}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm">{story.excerpt}</p>
      </CardContent>
      <CardFooter className="mt-auto pt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={story.author.avatar} alt={story.author.name} />
            <AvatarFallback>{story.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{story.author.name}</span>
        </div>
        <Button variant="ghost" size="sm" className="text-assist-600 hover:text-assist-700">
          Read more
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const AchievementCard = ({ 
  icon, 
  title, 
  value, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  description: string 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100"
  >
    <div className="text-assist-600 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-medium mb-1">{title}</h3>
    <div className="text-3xl font-bold text-assist-700 mb-2">{value}</div>
    <p className="text-sm text-gray-600">{description}</p>
  </motion.div>
);

export default Newsletters;
