
import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AnimatedHeader from "@/components/ui-components/AnimatedHeader";
import { 
  Users, 
  HandHelping, 
  ChartBar, 
  Bell, 
  User, 
  ShoppingBag, 
  Mail, 
  Hospital, 
  Search,
  FileText,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import CommunitySection from "@/components/ui-components/CommunitySection";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

// Community feature doesn't use comingSoon property, so create a separate type
interface CommunityFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const featureMap: Record<string, Feature> = {
  "sign-translator": {
    title: "Sign Language Translator",
    description: "Our AI-powered sign language translator enables real-time communication by translating sign language to text and speech, breaking down barriers in everyday conversations.",
    icon: <HandHelping size={24} className="text-assist-600" />,
    comingSoon: true
  },
  "therapists": {
    title: "Professional Therapists",
    description: "Connect with qualified therapists specialized in various areas to receive personalized guidance, support, and therapy sessions.",
    icon: <User size={24} className="text-assist-600" />,
    comingSoon: true
  },
  "progress": {
    title: "Progress Tracking",
    description: "Visualize your development journey with detailed charts and metrics that track improvements and milestones over time.",
    icon: <ChartBar size={24} className="text-assist-600" />,
    comingSoon: true
  },
  "government-schemes": {
    title: "Government Schemes",
    description: "Stay updated with the latest government initiatives, benefits, and schemes available for differently-abled individuals.",
    icon: <FileText size={24} className="text-assist-600" />,
    comingSoon: true
  },
  "scribes": {
    title: "Scribes Assistance",
    description: "Access qualified scribes who can assist with documentation, application forms, and other written tasks to ensure clarity and accuracy.",
    icon: <HandHelping size={24} className="text-assist-600" />,
    comingSoon: true
  },
  "mentors": {
    title: "Dedicated Mentors",
    description: "Receive guidance from mentors specially trained to understand your needs and help you navigate various aspects of personal and professional life.",
    icon: <User size={24} className="text-assist-600" />,
    comingSoon: true
  },
  "accessories": {
    title: "Assistive Accessories",
    description: "Discover innovative accessories and tools designed to enhance independence and make daily activities more accessible.",
    icon: <ShoppingBag size={24} className="text-assist-600" />,
    comingSoon: true
  },
  "newsletters": {
    title: "Success Newsletters",
    description: "Gain inspiration from regular newsletters highlighting achievements and success stories of differently-abled individuals from around the world.",
    icon: <Mail size={24} className="text-assist-600" />,
    comingSoon: true
  },
  "hospitals": {
    title: "Nearby Hospitals",
    description: "Locate specialized healthcare facilities in your vicinity that offer services tailored to the needs of differently-abled individuals.",
    icon: <Hospital size={24} className="text-assist-600" />,
    comingSoon: true
  },
  "job-opportunities": {
    title: "Job Opportunities",
    description: "Receive notifications about job openings specifically curated for differently-abled individuals across various industries and roles.",
    icon: <Search size={24} className="text-assist-600" />,
    comingSoon: true
  },
};

const FeaturePage = () => {
  const { featureId } = useParams<{ featureId: string }>();
  
  // Define the community feature separately
  const communityFeature: CommunityFeature = {
    title: "Community",
    description: "Connect with a supportive community of like-minded individuals to share experiences, advice, and encouragement.",
    icon: <Users size={24} className="text-assist-600" />
  };
  
  // Default to community if no feature ID is provided or if it's not found
  const feature = featureId && featureMap[featureId] 
    ? featureMap[featureId] 
    : communityFeature;

  // Check if the feature has comingSoon property and it's true
  const isComingSoon = 'comingSoon' in feature && feature.comingSoon === true;

  return (
    <MainLayout>
      <div className="space-y-8">
        <AnimatedHeader 
          title={feature.title}
          subtitle={feature.description}
          className="max-w-2xl"
        />

        {isComingSoon ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl p-8 shadow-subtle border border-gray-100 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-assist-100 text-assist-600 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-medium mb-3">Coming Soon</h3>
            <p className="text-gray-600 max-w-lg mx-auto mb-6">
              We're working hard to bring this feature to you. In the meantime, explore our community and other available features.
            </p>
            <div className="flex items-center justify-center gap-3 text-sm text-assist-600">
              <AlertCircle size={16} />
              <span>This feature will be available in the next update</span>
            </div>
          </motion.div>
        ) : (
          <CommunitySection />
        )}
      </div>
    </MainLayout>
  );
};

export default FeaturePage;
