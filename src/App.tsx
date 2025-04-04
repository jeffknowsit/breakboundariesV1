import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./components/auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import RootLayout from "@/components/layout/RootLayout";

// Page imports
import HomePage from "./pages/HomePage";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import SignTranslator from "./pages/SignTranslator";
import Therapists from "./pages/Therapists";
import FeaturePage from "./pages/FeaturePage";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import Scribes from "./pages/Scribes";
import Mentors from "./pages/Mentors";
import Accessories from "./pages/Accessories";
import Newsletters from "./pages/Newsletters";
import Hospitals from "./pages/Hospitals";
import JobOpportunities from "./pages/JobOpportunities";
import CommunityPage from "./pages/Community";
import Dashboard1 from './pages/Dashboard1';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="break-boundaries-theme">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route element={<RootLayout />}>
                    {/* Main routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/community" element={<CommunityPage />} />
                    
                    {/* Feature routes */}
                    <Route path="/sign-translator" element={<SignTranslator />} />
                    <Route path="/therapists" element={<Therapists />} />
                    <Route path="/progress" element={<FeaturePage />} />
                    <Route path="/government-schemes" element={<GovernmentSchemes />} />
                    <Route path="/scribes" element={<Scribes />} />
                    <Route path="/mentors" element={<Mentors />} />
                    <Route path="/accessories" element={<Accessories />} />
                    <Route path="/newsletters" element={<Newsletters />} />
                    <Route path="/hospitals" element={<Hospitals />} />
                    <Route path="/job-opportunities" element={<JobOpportunities />} />
                    
                    {/* Catch all */}
                    <Route path="*" element={<NotFound />} />
                    <Route path="/dashboard1" element={<Dashboard1 />} />
                  </Route>
                </Routes>
              </AnimatePresence>
            </TooltipProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
