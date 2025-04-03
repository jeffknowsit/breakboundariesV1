import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureBoxProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  index?: number;
}

const FeatureBox = ({ icon, title, description, link, index = 0 }: FeatureBoxProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      viewport={{ once: true }}
      className="group relative overflow-hidden"
    >
      <Link 
        to={link}
        className="block h-full"
      >
        <div className="relative h-full p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300 
          hover:border-blue-500/20 dark:hover:border-blue-500/20
          hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]
          group-hover:translate-y-[-2px]">
          
          {/* Icon Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full -translate-y-16 translate-x-16 group-hover:translate-y-[-4rem] group-hover:translate-x-20 transition-transform duration-500" />
          
          {/* Content */}
          <div className="relative">
            {/* Icon */}
            <div className="w-12 h-12 mb-4 rounded-xl bg-blue-50 dark:bg-gray-800 flex items-center justify-center text-blue-500 dark:text-blue-400 transition-colors duration-300">
              {icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              {title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
              {description}
            </p>

            {/* Learn More Link */}
            <div className="flex items-center text-blue-500 dark:text-blue-400 font-medium transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-300">
              Learn more
              <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default FeatureBox; 