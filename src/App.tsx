
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import SignTranslator from "./pages/SignTranslator";
import Therapists from "./pages/Therapists";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import Mentors from "./pages/Mentors";
import FeaturePage from "./pages/FeaturePage";
import NotFound from "./pages/NotFound";
import Scribes from "./pages/Scribes";
import Accessories from "./pages/Accessories";
import Newsletters from "./pages/Newsletters";
import Hospitals from "./pages/Hospitals";
import JobOpportunities from "./pages/JobOpportunities";
import Login from "./pages/Login";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./components/auth/AuthProvider";
import HomePage from "./pages/HomePage"; // Add the new home page

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="break-boundaries-theme">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<HomePage />} /> {/* Default to HomePage */}
                <Route path="/dashboard" element={<Index />} />
                <Route path="/login" element={<Login />} />
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
