import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus,
  Image as ImageIcon,
  Smile,
  Send,
  Search
} from 'lucide-react';

interface Post {
  id: number;
  avatar: string;
  username: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const CommunityPage = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      username: 'Sarah Chen',
      timeAgo: '2 hours ago',
      content: 'Just attended an amazing assistive technology workshop! So many innovations that can help with daily activities. Has anyone tried the new voice-controlled home system?',
      likes: 24,
      comments: 5,
      isLiked: false
    },
    {
      id: 2,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      username: 'Alex Rivera',
      timeAgo: '3 hours ago',
      content: 'Proud to share that I just got accepted to an inclusive coding bootcamp! Looking forward to connecting with others who are pursuing careers in tech. Any tips from those who\'ve been through similar programs?',
      likes: 35,
      comments: 4,
      isLiked: false
    },
    {
      id: 3,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      username: 'Jordan Taylor',
      timeAgo: 'Yesterday',
      content: 'Found a great resource for accessible travel guides. Planning my first solo trip next month and feeling both nervous and excited! Any recommendations for wheelchair-friendly destinations?',
      likes: 42,
      comments: 12,
      isLiked: false
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const newPostObj: Post = {
      id: posts.length + 1,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${posts.length + 1}`,
      username: 'You',
      timeAgo: 'Just now',
      content: newPost,
      likes: 0,
      comments: 0,
      isLiked: false
    };

    setPosts([newPostObj, ...posts]);
    setNewPost('');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg pb-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Community</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Connect and share with others</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Post
            </motion.button>
          </div>

          {/* Search and filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search discussions..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-full text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* New post form */}
          <motion.form 
            onSubmit={handleSubmit}
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share something with the community..."
                  className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm"
                  rows={2}
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <ImageIcon className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <Smile className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Post
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.form>
        </div>

        {/* Posts list */}
        <motion.div 
          className="space-y-4 mt-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence>
            {posts.map((post) => (
              <motion.div
                key={post.id}
                variants={item}
                layout
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{post.username}</h3>
                      <span className="text-xs text-gray-500">{post.timeAgo}</span>
                    </div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{post.content}</p>
                    <div className="flex items-center gap-6 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Heart 
                          className={`w-4 h-4 ${post.isLiked ? 'fill-blue-600 dark:fill-blue-400 text-blue-600 dark:text-blue-400' : ''}`} 
                        />
                        {post.likes}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Share2 className="w-4 h-4" />
                        Share
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 py-3 text-center text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-xl"
        >
          Load More
        </motion.button>
      </div>
    </div>
  );
};

export default CommunityPage; 