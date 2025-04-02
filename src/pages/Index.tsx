
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/components/ui-components/HeroSection";
import FeatureGrid from "@/components/ui-components/FeatureGrid";
import CommunitySection from "@/components/ui-components/CommunitySection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If not authenticated and not in the process of loading auth state,
  // redirect to the home page
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <MainLayout>
      <div className="space-y-12">
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1"></div>
          <div className="flex-1 flex justify-center">
            <img 
              src="/lovable-uploads/4b2f004d-90b0-4a24-936a-cb86ea6675c5.png" 
              alt="Break Boundaries Logo" 
              className="h-24 md:h-28"
            />
          </div>
          <div className="flex-1 flex justify-end">
            {/* User greeting instead of login button */}
            {user && (
              <span className="text-foreground hidden md:block">
                Welcome, <span className="font-medium">{user.name || user.email}</span>
              </span>
            )}
          </div>
        </div>

        <HeroSection
          title="Empowering Through Breaking Boundaries"
          subtitle="Break Boundaries is an AI-powered scaffold designed to enhance communication, mobility, and daily activities for differently-abled individuals."
          ctaText="Join Our Community"
          ctaLink="/community"
          secondaryCtaText="Try Translator"
          secondaryCtaLink="/sign-translator"
          className="bg-sky-blue border border-break-red/20"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium text-foreground">Features</h2>
            <Button variant="ghost" asChild className="text-break-red hover:text-break-secondary">
              <Link to="/sign-translator" className="flex items-center gap-1">
                View all features
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          <FeatureGrid />
        </motion.div>

        <CommunitySection />

        {/* Footer Preview */}
        <div className="glass-card p-8 text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-medium mb-4 text-break-red">Break Boundaries</h2>
            <p className="text-muted-foreground mb-6">
              Scaffolder for Divyangs: Designed with accessibility at its core, empowering differently-abled individuals with technology that adapts to their needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="border-break-secondary/30 hover:bg-break-secondary/10">About Us</Button>
              <Button variant="outline" className="border-break-secondary/30 hover:bg-break-secondary/10">Privacy Policy</Button>
              <Button variant="outline" className="border-break-secondary/30 hover:bg-break-secondary/10">Terms of Service</Button>
              <Button variant="outline" className="border-break-secondary/30 hover:bg-break-secondary/10">Contact</Button>
            </div>
            <p className="text-muted-foreground text-sm mt-8">
              © {new Date().getFullYear()} Break Boundaries. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
