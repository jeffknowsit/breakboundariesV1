
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextProps {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Convert Firebase user to our User type
        const appUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || "",
          name: firebaseUser.displayName || undefined
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Redirect authenticated users to dashboard when they land on login page
  useEffect(() => {
    if (!isLoading && user && location.pathname === "/login") {
      navigate("/dashboard", { replace: true });
    }
  }, [user, isLoading, location.pathname, navigate]);

  // Redirect unauthenticated users to login for protected routes
  useEffect(() => {
    const protectedRoutes = [
      "/dashboard",
      "/sign-translator",
      "/therapists",
      "/progress",
      "/government-schemes",
      "/scribes",
      "/mentors",
      "/accessories",
      "/newsletters",
      "/hospitals",
      "/job-opportunities"
    ];
    
    if (!isLoading && !user && protectedRoutes.includes(location.pathname)) {
      navigate("/login", { replace: true });
    }
  }, [user, isLoading, location.pathname, navigate]);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // After successful login, redirect to dashboard
      // The redirect will be handled by the useEffect above once the auth state changes
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Check specific error codes
      if (error.code === 'auth/user-not-found') {
        toast({
          title: "User not found",
          description: "This email is not registered. Please sign up first.",
          variant: "destructive",
        });
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        toast({
          title: "Invalid credentials",
          description: "The email or password you entered is incorrect.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login failed",
          description: error.message || "An error occurred during login. Please try again.",
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      toast({
        title: "Account created!",
        description: "Welcome to Break Boundaries!",
      });
      
      // After successful signup, the auth state will change and the useEffect above
      // will redirect to dashboard
    } catch (error: any) {
      console.error("Signup error:", error);
      
      if (error.code === 'auth/email-already-in-use') {
        toast({
          title: "Email already in use",
          description: "This email is already registered. Please login instead.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Signup failed",
          description: error.message || "An error occurred during signup. Please try again.",
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // User is set to null via the onAuthStateChanged listener
      navigate("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "An error occurred during logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
