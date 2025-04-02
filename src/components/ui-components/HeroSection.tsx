
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type HeroSectionProps = {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  className?: string;
};

const HeroSection = ({
  title,
  subtitle,
  ctaText = "Sign up now",
  ctaLink = "/login",
  secondaryCtaText,
  secondaryCtaLink,
  className,
}: HeroSectionProps) => {
  return (
    <div className={cn("relative overflow-hidden py-12 px-6 rounded-3xl bg-sky-blue text-white", className)}>
      <div className="absolute w-64 h-64 rounded-full bg-break-red/10 blur-3xl -top-32 -right-32" />
      <div className="absolute w-96 h-96 rounded-full bg-break-secondary/10 blur-3xl -bottom-48 -left-48" />

      <div className="relative max-w-3xl mx-auto text-center z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight"
        >
          {title}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg md:text-xl text-white/80 mb-8"
        >
          {subtitle}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button asChild size="lg" className="bg-break-red hover:bg-break-secondary text-white transition-all duration-300">
            <Link to={ctaLink} className="flex items-center gap-2">
              {ctaText}
              <ChevronRight size={16} />
            </Link>
          </Button>

          {secondaryCtaText && secondaryCtaLink && (
            <Button asChild variant="outline" size="lg" className="bg-transparent hover:bg-break-secondary/10 border border-white/50 text-white transition-all duration-300">
              <Link to={secondaryCtaLink}>{secondaryCtaText}</Link>
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
