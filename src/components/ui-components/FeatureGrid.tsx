import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  Handshake,
  UserCog, 
  LineChart, 
  FileText, 
  Link2, 
  Building2, 
  Briefcase, 
  Mail, 
  Box, 
  Search,
  Stethoscope,
  Pen,
  Package2
} from 'lucide-react';
import FeatureBox from './FeatureBox';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  index: number;
  variant?: 'default' | 'primary' | 'dark';
};

const FeatureCard = ({ title, description, icon, link, index, variant = 'default' }: FeatureCardProps) => {
  const variants = {
    default: 'bg-[#0D1117]/80',
    primary: 'bg-[#0D1117]',
    dark: 'bg-[#0D1117]'
  };

  const baseDelay = 0.1;
  const staggerDelay = index * 0.1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: baseDelay + staggerDelay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      whileHover={{ scale: 1.02 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <Link 
        to={link}
        className={`
          block rounded-2xl p-8 h-full
          ${variants[variant]}
          transition-all duration-300
          border border-[#1a2234]
          hover:border-blue-500/50
          relative
          overflow-hidden
        `}
      >
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="mb-4">
            <div className={`
              p-3 rounded-xl w-12 h-12 flex items-center justify-center
              ${variant === 'primary' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-500/10 text-blue-400'}
              group-hover:bg-blue-500 group-hover:text-white
              transition-all duration-300
            `}>
              {icon}
            </div>
          </div>
          
          <h3 className="text-lg font-semibold mb-2 text-white">
            {title}
          </h3>
          
          <p className="text-sm mb-4 text-gray-400">
            {description}
          </p>

          <div className="flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
            <span className="relative">
              Learn more
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-blue-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </span>
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const features = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community",
    description: "Connect with like-minded individuals in an inclusive environment designed for support and sharing.",
    link: "/community"
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: "Sign Translator",
    description: "Real-time sign language translation using advanced AI technology to facilitate better communication.",
    link: "/translator"
  },
  {
    icon: <Stethoscope className="w-6 h-6" />,
    title: "Therapist Support",
    description: "Connect with professional therapists specialized in various areas of assistance and guidance.",
    link: "/therapist"
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Progress Charts",
    description: "Visualize your progress with detailed charts and analytics to track your development over time.",
    link: "/progress"
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Government Schemes",
    description: "Stay updated with the latest government schemes and benefits available for differently-abled individuals.",
    link: "/schemes"
  },
  {
    icon: <Pen className="w-6 h-6" />,
    title: "Scribes Assistance",
    description: "Get help from qualified scribes for documentation, applications, and other written tasks.",
    link: "/scribes"
  },
  {
    icon: <UserCog className="w-6 h-6" />,
    title: "Dedicated Mentors",
    description: "Personalized guidance from mentors specially trained to assist differently-abled individuals.",
    link: "/mentors"
  },
  {
    icon: <Package2 className="w-6 h-6" />,
    title: "Assistive Accessories",
    description: "Discover innovative accessories designed to enhance daily living and independence.",
    link: "/accessories"
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Success Newsletters",
    description: "Regular newsletters highlighting success stories of differently-abled individuals for inspiration.",
    link: "/newsletters"
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Nearby Hospitals",
    description: "Locate specialized hospitals and healthcare facilities in your vicinity for medical assistance.",
    link: "/hospitals"
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Job Opportunities",
    description: "Get notified about the latest job opportunities specifically curated for differently-abled individuals.",
    link: "/jobs"
  }
];

const FeatureGrid = () => {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Empower your journey with strategic insights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Our platform provides cutting-edge solutions to help you innovate and grow.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureBox
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              link={feature.link}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;
