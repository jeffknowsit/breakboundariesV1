
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Lock, User, LogIn, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";

export function LoginDialog({ children }: { children?: React.ReactNode }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { login, signup } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        await signup(name, email, password);
      } else {
        await login(email, password);
      }
      // Close dialog on success
      setIsOpen(false);
    } catch (error) {
      // Error handling is done in the AuthProvider
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || <Button className="bg-break-accent hover:bg-break-secondary">Login</Button>}
      </DialogTrigger>
      <DialogContent className="login-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isSignUp 
              ? "Sign up to access all features and resources" 
              : "Login to access your personalized experience"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required={isSignUp}
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-break-accent hover:bg-break-secondary"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogIn className="mr-2 h-4 w-4" />
            )}
            {isSignUp ? "Create Account" : "Login"}
          </Button>
        </form>

        <DialogFooter className="flex-col sm:flex-col gap-2 mt-6">
          <div className="text-center text-sm">
            {isSignUp 
              ? "Already have an account?" 
              : "Don't have an account yet?"}
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-1 text-break-accent hover:underline focus:outline-none"
              disabled={isLoading}
            >
              {isSignUp ? "Login" : "Sign up"}
            </button>
          </div>
          <DialogClose asChild>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full border-break-accent/30 hover:bg-break-accent/10"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
