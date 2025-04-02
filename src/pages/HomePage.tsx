
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const HomePage = () => {
  const { theme } = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const staggeredVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e17]">
      {/* Header/Navigation */}
      <header className="px-4 py-4 md:px-8 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/4b2f004d-90b0-4a24-936a-cb86ea6675c5.png" 
            alt="Break Boundaries Logo" 
            className="h-10"
          />
          <h1 className="text-xl font-medium text-white">Break Boundaries</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to="/login">
            <Button variant="ghost" className="text-white">
              Contact
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 md:py-24">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggeredVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={fadeInVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Innovate Faster with{" "}
            <span className="text-break-red">Break Boundaries</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInVariants}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto"
          >
            Empowering individuals with cutting-edge adaptive solutions. From
            AI-driven translation to seamless accessibility integrations, we're shaping the
            future of inclusive technology.
          </motion.p>
          
          <motion.div 
            variants={fadeInVariants}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button 
              asChild
              size="lg" 
              className="bg-break-red hover:bg-break-red/80 text-white px-8 py-6 text-lg"
            >
              <Link to="/login" className="flex items-center gap-2">
                Sign up now <ArrowRight size={18} />
              </Link>
            </Button>
            
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="border-gray-600 text-white hover:bg-gray-800 px-8 py-6 text-lg"
            >
              <Link to="/login" className="flex items-center gap-2">
                Sign in <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </main>

      {/* Background image or overlay (optional) */}
      <div 
        className="absolute inset-0 z-[-1]" 
        style={{ 
          backgroundImage: `url('/lovable-uploads/edc33a5f-47c6-4493-83cc-0c5d60de8f7b.png')`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2 
        }}
      ></div>
    </div>
  );
};

export default HomePage;
