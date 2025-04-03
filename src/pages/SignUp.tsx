import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, LogIn, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/components/auth/AuthProvider";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import TypewriterText from "@/components/ui-components/TypewriterText";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signup(name, email, password);
      toast({
        title: "Account created successfully!",
        description: "Please log in with your new credentials.",
      });
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <div className="login-page">
      <div className="absolute top-4 left-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={goBack}
          className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Go back</span>
        </Button>
      </div>
      
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ThemeToggle />
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.img 
            src="/images/logo.svg" 
            alt="Break Boundaries Logo" 
            className="w-[280px] h-auto mb-20 text-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.h1 className="login-heading mb-2">
            <TypewriterText
              text="Create Account"
              speed={40}
              delay={800}
            />
          </motion.h1>
          <motion.p 
            className="login-text text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Sign up to access all features and resources
          </motion.p>
        </div>

        <motion.div 
          className="login-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={0}
              className="space-y-2"
            >
              <Label htmlFor="name" className="login-text">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="login-input pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </motion.div>
            
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={1}
              className="space-y-2"
            >
              <Label htmlFor="email" className="login-text">Email</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors group-hover:text-blue-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="login-input pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </motion.div>
            
            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={2}
              className="space-y-2"
            >
              <Label htmlFor="password" className="login-text">Password</Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500 transition-colors group-hover:text-blue-500" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="login-input pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </motion.div>

            <motion.div
              variants={inputVariants}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <Button 
                type="submit" 
                className="login-button w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <LogIn className="mr-2 h-4 w-4" />
                )}
                Create Account
              </Button>
            </motion.div>
          </form>

          <motion.div
            className="text-center mt-6"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <p className="login-text">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="login-link mt-1 inline-block"
            >
              Login
            </Link>
          </motion.div>
        </motion.div>

        <motion.p
          className="text-gray-500 dark:text-gray-400 text-sm mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          © {new Date().getFullYear()} Break Boundaries. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignUp; 