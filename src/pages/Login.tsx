
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, LogIn, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth/AuthProvider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        await signup(name, email, password);
        // Redirect will be handled in AuthProvider
      } else {
        await login(email, password);
        // Redirect will be handled in AuthProvider
      }
    } catch (error) {
      // Error handling is done in the AuthProvider
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 animated-gradient-purple">
      <div className="absolute top-4 left-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={goBack}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Go back</span>
        </Button>
      </div>
      
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ThemeToggle />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/lovable-uploads/4b2f004d-90b0-4a24-936a-cb86ea6675c5.png" 
            alt="Break Boundaries Logo" 
            className="h-24 mb-6"
          />
          <h1 className="text-3xl font-bold text-foreground">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground mt-2 text-center">
            {isSignUp 
              ? "Sign up to access all features and resources" 
              : "Login to access your personalized experience"}
          </p>
        </div>

        <div className="theme-galaxy-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            {isSignUp && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-pink" />
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="pl-10 border-pink/30 bg-black/30 text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-pink" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 border-pink/30 bg-black/30 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-pink" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10 border-pink/30 bg-black/30 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-pink hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              {isSignUp ? "Create Account" : "Login"}
            </Button>
          </form>

          <div className="text-center text-sm mt-6 text-white">
            {isSignUp 
              ? "Already have an account?" 
              : "Don't have an account yet?"}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-1 text-yellow hover:text-yellow focus:outline-none font-medium hover:underline"
              disabled={isLoading}
            >
              {isSignUp ? "Login" : "Sign up"}
            </button>
          </div>
        </div>

        <p className="text-white text-sm mt-8 text-center">
          © {new Date().getFullYear()} Break Boundaries. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
