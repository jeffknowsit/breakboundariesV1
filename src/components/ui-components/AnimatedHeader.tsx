
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedHeaderProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
};

const AnimatedHeader = ({
  title,
  subtitle,
  align = "left",
  className,
}: AnimatedHeaderProps) => {
  const textAlign = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.6,
      }
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={cn(textAlign[align], "mb-8", className)}
    >
      <motion.h1
        variants={item}
        className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-3"
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          variants={item}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default AnimatedHeader;
