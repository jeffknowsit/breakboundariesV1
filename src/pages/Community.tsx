import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Share, Heart, MessageCircle } from "lucide-react";

const CommunityPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Community Header */}
        <div className="text-center space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 dark:text-white"
          >
            Community
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-300"
          >
            Connect, share, and grow with our supportive community
          </motion.p>
        </div>

        {/* New Post Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 space-y-4"
        >
          <div className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Input 
              placeholder="Share something with the community..." 
              className="flex-1"
            />
          </div>
          <div className="flex justify-end">
            <Button>
              New Post
            </Button>
          </div>
        </motion.div>

        {/* Community Posts */}
        <div className="space-y-6">
          <CommunityPost
            avatar="/path-to-avatar1.jpg"
            name="Sarah Johnson"
            time="2 hours ago"
            content="Just attended an amazing assistive technology workshop! So many innovations that can help with daily activities. Has anyone tried the new voice-controlled home systems?"
            likes={24}
            comments={5}
          />

          <CommunityPost
            avatar="/path-to-avatar2.jpg"
            name="Michael Chen"
            time="5 hours ago"
            content="Proud to share that I just got accepted to an inclusive coding bootcamp! Looking forward to connecting with others who are pursuing careers in tech. Any tips from those who've been through similar programs?"
            likes={35}
            comments={8}
          />

          <CommunityPost
            avatar="/path-to-avatar3.jpg"
            name="Priya Sharma"
            time="Yesterday"
            content="Found a great resource for accessible travel guides. Planning my first solo trip next month and feeling both nervous and excited! Any recommendations for wheelchair-friendly destinations?"
            likes={42}
            comments={12}
          />

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full py-3 text-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors bg-gray-50 dark:bg-gray-900 rounded-lg"
          >
            Load More
          </motion.button>
        </div>
      </div>
    </MainLayout>
  );
};

// Community Post Component
const CommunityPost = ({ avatar, name, time, content, likes, comments }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4"
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300">{content}</p>
      <div className="flex items-center gap-6 pt-4 border-t border-gray-100 dark:border-gray-700">
        <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
          <Heart size={20} />
          <span>{likes}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
          <MessageCircle size={20} />
          <span>{comments}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors ml-auto">
          <Share size={20} />
          <span>Share</span>
        </button>
      </div>
    </motion.div>
  );
};

export default CommunityPage; 