
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { 
  ChevronRight, 
  Menu, 
  X, 
  Users, 
  HandHelping, 
  ChartBar, 
  Bell, 
  User, 
  ShoppingBag, 
  Mail, 
  Hospital, 
  Search,
  FileText,
  LogOut,
  ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/components/auth/AuthProvider";

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isMobileMenuOpen: boolean;
  onClick?: () => void;
  isActive?: boolean;
};

const NavItem = ({ to, icon, label, isMobileMenuOpen, onClick, isActive }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive: linkIsActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ease-apple-ease group",
          (isActive || linkIsActive)
            ? "bg-break-secondary/20 text-break-accent font-medium"
            : "hover:bg-break-primary/20"
        )
      }
      onClick={onClick}
    >
      <span className={cn(
        "transition-all duration-300",
        (isActive) ? "text-break-accent" : "text-gray-400 group-hover:text-break-accent"
      )}>
        {icon}
      </span>
      <span className={cn(
        "transition-opacity duration-300",
        isMobileMenuOpen ? "opacity-100" : "opacity-0 md:opacity-100"
      )}>
        {label}
      </span>
      {isActive && (
        <motion.div
          layoutId="active-nav-indicator"
          className="ml-auto mr-1 text-break-accent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={16} />
        </motion.div>
      )}
    </NavLink>
  );
};

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  const goBack = () => {
    navigate(-1);
  };

  const navItems = [
    { path: "/", icon: <Users size={20} />, label: "Community" },
    { path: "/sign-translator", icon: <HandHelping size={20} />, label: "Sign Translator" },
    { path: "/therapists", icon: <User size={20} />, label: "Therapists" },
    { path: "/progress", icon: <ChartBar size={20} />, label: "Progress" },
    { path: "/government-schemes", icon: <FileText size={20} />, label: "Gov Schemes" },
    { path: "/scribes", icon: <HandHelping size={20} />, label: "Scribes" },
    { path: "/mentors", icon: <User size={20} />, label: "Mentors" },
    { path: "/accessories", icon: <ShoppingBag size={20} />, label: "Accessories" },
    { path: "/newsletters", icon: <Mail size={20} />, label: "Newsletters" },
    { path: "/hospitals", icon: <Hospital size={20} />, label: "Hospitals" },
    { path: "/job-opportunities", icon: <Search size={20} />, label: "Job Opportunities" },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-background">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          {currentPath !== "/" && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={goBack}
              className="text-foreground mr-1"
            >
              <ArrowLeft size={20} />
            </Button>
          )}
          <img 
            src="/lovable-uploads/4b2f004d-90b0-4a24-936a-cb86ea6675c5.png" 
            alt="Break Boundaries Logo" 
            className="h-8"
          />
          <span className="font-medium text-lg text-foreground">Break Boundaries</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 md:w-64 bg-sidebar-background border-r border-sidebar-border p-4 md:static transition-all duration-300 ease-apple-ease",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        initial={false}
      >
        <div className="hidden md:flex items-center gap-3 mb-4 px-4">
          <img 
            src="/lovable-uploads/4b2f004d-90b0-4a24-936a-cb86ea6675c5.png" 
            alt="Break Boundaries Logo" 
            className="h-9"
          />
          <span className="font-medium text-xl text-sidebar-foreground">Break Boundaries</span>
        </div>

        {/* Back button in desktop view */}
        {currentPath !== "/" && (
          <div className="hidden md:flex items-center px-4 mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goBack}
              className="flex items-center text-sidebar-foreground hover:text-break-accent"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back
            </Button>
          </div>
        )}

        {user && (
          <div className="flex flex-col items-center p-4 border-b border-sidebar-border mb-4">
            <div className="h-12 w-12 rounded-full bg-break-accent/20 flex items-center justify-center text-break-accent mb-2">
              <User size={24} />
            </div>
            <p className="text-sidebar-foreground font-medium">{user.name || user.email}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="mt-2 text-muted-foreground hover:text-break-accent"
            >
              <LogOut size={16} className="mr-1" />
              Logout
            </Button>
          </div>
        )}

        <div className="hidden md:flex justify-between items-center mb-6 px-4">
          <ThemeToggle />
        </div>

        <nav className="mt-6 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              to={item.path}
              icon={item.icon}
              label={item.label}
              isMobileMenuOpen={isMobileMenuOpen}
              onClick={closeMobileMenu}
              isActive={currentPath === item.path}
            />
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 max-w-full min-h-screen flex flex-col">
        <div className="p-4 md:p-8 flex-1">
          {/* Desktop back button for main content area */}
          {currentPath !== "/" && (
            <div className="hidden md:block mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goBack}
                className="flex items-center text-foreground hover:text-break-accent"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back
              </Button>
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="max-w-screen-xl mx-auto"
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={closeMobileMenu}
        />
      )}
    </div>
  );
};

export default MainLayout;
