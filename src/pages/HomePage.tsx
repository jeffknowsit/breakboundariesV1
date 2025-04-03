import React from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Check, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import HeroSection from "@/components/ui-components/HeroSection";
import FeatureGrid from "@/components/ui-components/FeatureGrid";
import CommunitySection from "@/components/ui-components/CommunitySection";
import { useAuth } from "@/components/auth/AuthProvider";

const HomePage = () => {
  const { theme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800/80 transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/4b2f004d-90b0-4a24-936a-cb86ea6675c5.png" 
              alt="Break Boundaries Logo" 
              className="h-10"
            />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors">Break Boundaries</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-break-accent/20 flex items-center justify-center">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.name || "User"} 
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <User size={16} className="text-break-accent" />
                    )}
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {user.name || user.email}
                  </span>
                </div>
                <Button 
                  asChild
                  variant="default"
                  className="relative overflow-hidden bg-transparent border-2 border-blue-500 dark:border-blue-400 text-white hover:bg-blue-500/10 dark:hover:bg-blue-400/10 shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-300 group"
                >
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <span className="relative z-10">Go to Dashboard</span>
                    <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/5 dark:to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </Link>
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 pt-20">
        <HeroSection
          title="Breaking Boundaries for Differently Abled"
          subtitle="Empowering differently abled individuals through innovative technology and community support."
          ctaText="Join Now"
          ctaLink="/signup"
          secondaryCtaText="Learn More"
          secondaryCtaLink="/about"
        />

        {/* Feature Grid Section */}
        <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] -z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-950" />
          
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                Comprehensive Support System
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Explore our range of services designed to provide comprehensive support and empower differently-abled individuals.
              </p>
            </div>
            
            <FeatureGrid />
          </div>
        </section>

        {/* Community Section with improved styling */}
        <section className="py-20 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm transition-colors duration-300">
          <div className="container mx-auto max-w-6xl px-4">
            <CommunitySection />
          </div>
        </section>

        {/* How It Works Section - improved styling */}
        <section className="py-20 bg-gray-50/50 dark:bg-gray-900/30 backdrop-blur-sm transition-colors duration-300">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
                Enhanced corporate framework
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-colors">
                Our platform provides the tools and insights you need to succeed in today's competitive landscape.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Extremely Flexible",
                  description: "We believe in pushing the boundaries of what's possible explore emerging technology",
                  icon: "🔧"
                },
                {
                  title: "Easy To Customize",
                  description: "Enjoy a unified workspace by bringing together to all your favorite tools under one",
                  icon: "⚙️"
                },
                {
                  title: "Concrete Security",
                  description: "Knowing the cost of acquiring customers and the costing of the main service.",
                  icon: "🔒"
                },
                {
                  title: "Easy Payment",
                  description: "Comprehend the behavior of group participants in relation to tasks, standards.",
                  icon: "💳"
                },
                {
                  title: "Cloud based access",
                  description: "The cloud offers easy setup, high availability and lower to maintenance costs.",
                  icon: "☁️"
                },
                {
                  title: "Advanced Analytics",
                  description: "We believe in pushing the boundaries of what's possible explore emerging technology",
                  icon: "📊"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg dark:shadow-gray-900/20 border border-gray-200/50 dark:border-gray-800/50 hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - improved styling */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-12 text-center relative overflow-hidden shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Streamline Your Project Management?
                </h2>
                <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
                  Join thousands of teams worldwide who trust Break Boundaries to simplify their workflows and drive success.
                </p>
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to={isAuthenticated ? "/dashboard" : "/login"} className="flex items-center gap-2">
                    {isAuthenticated ? "Go to Dashboard" : "Get Started Today"} <ArrowRight size={18} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
