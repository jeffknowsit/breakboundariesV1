
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  index?: number;
  className?: string;
};

const FeatureCard = ({
  title,
  description,
  icon,
  path,
  index = 0,
  className,
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1 * (index + 1),
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -5 }}
      className={cn(
        "feature-card group",
        className
      )}
    >
      <div className="feature-icon">{icon}</div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{description}</p>
      <Link
        to={path}
        className="inline-flex items-center text-assist-600 text-sm font-medium group-hover:text-assist-700 transition-colors"
      >
        Learn more
        <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.3 }}
          className="ml-1"
        >
          <ChevronRight size={16} />
        </motion.span>
      </Link>
    </motion.div>
  );
};

export default FeatureCard;
