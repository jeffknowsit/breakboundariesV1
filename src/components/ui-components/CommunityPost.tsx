import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share } from "lucide-react";

interface CommunityPostProps {
  avatar: string;
  name: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
}

const CommunityPost = ({ avatar, name, time, content, likes, comments }: CommunityPostProps) => {
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

export default CommunityPost; 