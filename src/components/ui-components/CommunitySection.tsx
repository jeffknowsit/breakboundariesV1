
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, MessageCircle, Heart, Share2, User, Plus, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import CommunityEvents from "./CommunityEvents";

type PostProps = {
  author: string;
  avatar: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
  index: number;
};

const Post = ({ author, avatar, content, time, likes, comments, index }: PostProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-white rounded-xl p-5 shadow-subtle border border-gray-100"
    >
      <div className="flex items-start gap-3">
        <Avatar className="w-10 h-10 border">
          <AvatarImage src={avatar} alt={author} />
          <AvatarFallback>{author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{author}</h3>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
          <p className="mt-2 text-gray-700">{content}</p>
          
          <div className="mt-4 flex items-center gap-4">
            <button 
              className={cn(
                "flex items-center gap-1 text-sm", 
                liked ? "text-red-500" : "text-gray-600 hover:text-gray-900"
              )}
              onClick={handleLike}
            >
              <Heart size={18} className={cn(liked && "fill-red-500")} />
              <span>{likeCount}</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
              <MessageCircle size={18} />
              <span>{comments}</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 ml-auto">
              <Share2 size={18} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const posts = [
  {
    author: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    content: "Just attended an amazing assistive technology workshop! So many innovations that can help with daily activities. Has anyone tried the new voice-controlled home systems?",
    time: "2 hours ago",
    likes: 24,
    comments: 5,
  },
  {
    author: "Michael Chen",
    avatar: "https://i.pravatar.cc/150?img=2",
    content: "Proud to share that I just got accepted to an inclusive coding bootcamp! Looking forward to connecting with others who are pursuing careers in tech. Any tips from those who've been through similar programs?",
    time: "5 hours ago",
    likes: 35,
    comments: 8,
  },
  {
    author: "Priya Sharma",
    avatar: "https://i.pravatar.cc/150?img=3",
    content: "Found a great resource for accessible travel guides. Planning my first solo trip next month and feeling both nervous and excited! Any recommendations for wheelchair-friendly destinations?",
    time: "Yesterday",
    likes: 42,
    comments: 12,
  },
];

const communities = [
  {
    name: "Tech Accessibility",
    members: 845,
    image: "https://i.pravatar.cc/150?img=4"
  },
  {
    name: "Inclusive Sports",
    members: 1253,
    image: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Creative Arts Therapy",
    members: 678,
    image: "https://i.pravatar.cc/150?img=6"
  }
];

const CommunitySection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users size={24} className="text-assist-600" />
          <h2 className="text-2xl font-medium">Community</h2>
        </div>
        <Button className="bg-assist-600 hover:bg-assist-700">
          <Plus size={18} className="mr-2" />
          New Post
        </Button>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-6 bg-gray-100/80 p-1">
          <TabsTrigger value="feed" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Feed
          </TabsTrigger>
          <TabsTrigger value="events" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Events
          </TabsTrigger>
          <TabsTrigger value="discover" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Discover
          </TabsTrigger>
          <TabsTrigger value="my-communities" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
            My Communities
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="mt-0 space-y-6">
          <div className="bg-white rounded-xl p-4 shadow-subtle border border-gray-100 mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 border">
                <AvatarFallback>
                  <User size={20} />
                </AvatarFallback>
              </Avatar>
              <Input 
                placeholder="Share something with the community..." 
                className="flex-1 bg-gray-50 border-gray-200 focus:ring-assist-500"
              />
            </div>
          </div>

          <AnimatePresence>
            {posts.map((post, index) => (
              <Post
                key={index}
                author={post.author}
                avatar={post.avatar}
                content={post.content}
                time={post.time}
                likes={post.likes}
                comments={post.comments}
                index={index}
              />
            ))}
          </AnimatePresence>
          
          <Button variant="outline" className="w-full border-gray-200 mt-4">
            Load More
          </Button>
        </TabsContent>

        <TabsContent value="events" className="mt-0">
          <CommunityEvents />
        </TabsContent>

        <TabsContent value="discover" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-xl overflow-hidden shadow-subtle border border-gray-100"
              >
                <div className="h-32 bg-assist-100" />
                <div className="p-5">
                  <div className="flex items-start">
                    <Avatar className="w-12 h-12 border-2 border-white -mt-10 shadow-md">
                      <AvatarImage src={community.image} alt={community.name} />
                      <AvatarFallback>{community.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="font-medium text-lg mt-2">{community.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{community.members} members</p>
                  <Button className="w-full bg-assist-600 hover:bg-assist-700">Join Community</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-communities" className="mt-0">
          <div className="bg-white rounded-xl p-8 shadow-subtle border border-gray-100 text-center">
            <Users size={48} className="text-assist-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">Join Communities</h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto">
              Discover and join communities that align with your interests and needs
            </p>
            <Button className="bg-assist-600 hover:bg-assist-700">
              Explore Communities
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunitySection;
