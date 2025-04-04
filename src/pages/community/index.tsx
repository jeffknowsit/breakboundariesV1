import React from 'react';
import { MessageCircle, Users, Calendar, Share2 } from 'lucide-react';

const CommunityPage = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "Support Groups",
      description: "Join specialized groups based on specific needs and interests"
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-blue-500" />,
      title: "Discussion Forums",
      description: "Engage in meaningful conversations with community members"
    },
    {
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      title: "Events Calendar",
      description: "Stay updated with community meetups and virtual events"
    },
    {
      icon: <Share2 className="w-6 h-6 text-blue-500" />,
      title: "Resource Sharing",
      description: "Share and access helpful resources within the community"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-500">Community Hub</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="p-6 rounded-lg bg-gray-800 border border-gray-700">
            <div className="flex items-center mb-4">
              {feature.icon}
              <h3 className="ml-3 text-xl font-semibold text-white">{feature.title}</h3>
            </div>
            <p className="text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-white">Latest Community Activities</h2>
        <div className="space-y-4">
          {/* Add activity feed items here */}
          <div className="p-4 bg-gray-700 rounded">
            <p className="text-white">Welcome to our growing community! Join discussions and connect with others.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage; 