import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import HomeSplineModel from "./HomeSplineModel";
import AdvancedTypewriter from "./AdvancedTypewriter";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  className?: string;
  splineScene?: string;
};

const HeroSection = ({
  title,
  subtitle,
  ctaText = "Login",
  ctaLink = "/login",
  secondaryCtaText,
  secondaryCtaLink,
  className,
  splineScene,
}: HeroSectionProps) => {
  return (
    <div className={cn("relative overflow-hidden py-20 px-4", className)}>
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
              >
                <AdvancedTypewriter 
                  text={title} 
                  speed={5}
                  delay={100}
                  className="inline-block"
                  cursorBlinkSpeed={500}
                  typingSound={true}
                  soundVolume={0.1}
                  highlightColor="text-blue-500 dark:text-blue-400"
                />
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg text-gray-600 dark:text-gray-300 mb-8"
              >
                {subtitle}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
                >
                  <Link to={ctaLink} className="flex items-center gap-2">
                    {ctaText}
                    <ArrowRight size={18} />
                  </Link>
                </Button>

                {secondaryCtaText && secondaryCtaLink && (
                  <Button 
                    asChild 
                    variant="outline" 
                    size="lg" 
                    className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-8 py-6 text-lg"
                  >
                    <Link to={secondaryCtaLink} className="flex items-center gap-2">
                      {secondaryCtaText}
                      <ArrowRight size={18} />
                    </Link>
                  </Button>
                )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex items-center gap-4"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">U{i}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">1,000+</span> users already joined
                </p>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-blue-100 dark:bg-blue-900/30 rounded-3xl blur-2xl opacity-30"></div>
              <div className="relative h-[600px] w-full">
                <HomeSplineModel />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
