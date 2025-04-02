
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
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
  FileText
} from "lucide-react";

const features = [
  {
    title: "Community",
    description: "Connect with like-minded individuals in an inclusive environment designed for support and sharing.",
    icon: <Users size={24} />,
    path: "/",
  },
  {
    title: "Sign Translator",
    description: "Real-time sign language translation using advanced AI technology to facilitate better communication.",
    icon: <HandHelping size={24} />,
    path: "/sign-translator",
  },
  {
    title: "Therapist Support",
    description: "Connect with professional therapists specialized in various areas of assistance and guidance.",
    icon: <User size={24} />,
    path: "/therapists",
  },
  {
    title: "Progress Charts",
    description: "Visualize your progress with detailed charts and analytics to track your development over time.",
    icon: <ChartBar size={24} />,
    path: "/progress",
  },
  {
    title: "Government Schemes",
    description: "Stay updated with the latest government schemes and benefits available for differently-abled individuals.",
    icon: <FileText size={24} />,
    path: "/government-schemes",
  },
  {
    title: "Scribes Assistance",
    description: "Get help from qualified scribes for documentation, applications, and other written tasks.",
    icon: <HandHelping size={24} />,
    path: "/scribes",
  },
  {
    title: "Dedicated Mentors",
    description: "Personalized guidance from mentors specially trained to assist differently-abled individuals.",
    icon: <User size={24} />,
    path: "/mentors",
  },
  {
    title: "Assistive Accessories",
    description: "Discover innovative accessories designed to enhance daily living and independence.",
    icon: <ShoppingBag size={24} />,
    path: "/accessories",
  },
  {
    title: "Success Newsletters",
    description: "Regular newsletters highlighting success stories of differently-abled individuals for inspiration.",
    icon: <Mail size={24} />,
    path: "/newsletters",
  },
  {
    title: "Nearby Hospitals",
    description: "Locate specialized hospitals and healthcare facilities in your vicinity for medical assistance.",
    icon: <Hospital size={24} />,
    path: "/hospitals",
  },
  {
    title: "Job Opportunities",
    description: "Get notified about the latest job opportunities specifically curated for differently-abled individuals.",
    icon: <Search size={24} />,
    path: "/job-opportunities",
  },
];

type FeatureGridProps = {
  className?: string;
};

const FeatureGrid = ({ className }: FeatureGridProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}
    >
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          path={feature.path}
          index={index}
        />
      ))}
    </motion.div>
  );
};

export default FeatureGrid;
