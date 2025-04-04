import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import FeatureGrid from "@/components/ui-components/FeatureGrid";
import CommunitySection from "@/components/ui-components/CommunitySection";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Camera, 
  Lock, 
  Mail, 
  Moon, 
  Sun, 
  User, 
  Eye, 
  EyeOff,
  Shield,
  History,
  Trash2,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/Logo";
import { ProfileUpload } from "@/components/ui/ProfilePictureDialog";
import { supabase } from "@/lib/supabase";

// Font size type
type FontSize = 'small' | 'medium' | 'large';

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  // State for accessibility settings
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  // Apply font size to document root
  useEffect(() => {
    const root = document.documentElement;
    switch (fontSize) {
      case 'small':
        root.style.fontSize = '14px';
        break;
      case 'medium':
        root.style.fontSize = '16px';
        break;
      case 'large':
        root.style.fontSize = '18px';
        break;
    }
  }, [fontSize]);

  // Apply high contrast mode
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Theme toggle handlers
  const toggleTheme = (mode: 'light' | 'dark') => {
    setTheme(mode);
  };

  // Font size handler
  const handleFontSize = (size: FontSize) => {
    setFontSize(size);
    // Save to local storage or user preferences
    localStorage.setItem('preferred-font-size', size);
  };

  // High contrast handler
  const handleHighContrast = (checked: boolean) => {
    setHighContrast(checked);
    // Save to local storage or user preferences
    localStorage.setItem('high-contrast', String(checked));
  };

  // Load saved preferences on mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem('preferred-font-size') as FontSize;
    const savedHighContrast = localStorage.getItem('high-contrast') === 'true';
    
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }
    if (savedHighContrast) {
      setHighContrast(true);
    }
  }, []);

  // Fetch profile picture on mount
  useEffect(() => {
    async function fetchProfilePic() {
      if (!user?.email) return;

      const { data, error } = await supabase
        .from('profilepic')
        .select('PictureUrl')
        .eq('EmailID', user.email)
        .single();

      if (data?.PictureUrl) {
        setProfilePicUrl(data.PictureUrl);
      }
    }

    fetchProfilePic();
  }, [user?.email]);

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
            <Logo height={200} />
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

        {/* Profile Settings Section */}
        <div className="bg-[#111827] dark:bg-[#111827] rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <Tabs defaultValue="profile" className="w-full">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4">
                <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900 p-1 text-gray-500 dark:text-gray-400">
                  <TabsTrigger value="profile" className="rounded-md px-3 py-1 text-sm font-medium transition-all hover:text-gray-900 dark:hover:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white">
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="account" className="rounded-md px-3 py-1 text-sm font-medium transition-all hover:text-gray-900 dark:hover:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white">
                    Account
                  </TabsTrigger>
                  <TabsTrigger value="accessibility" className="rounded-md px-3 py-1 text-sm font-medium transition-all hover:text-gray-900 dark:hover:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white">
                    Accessibility
                  </TabsTrigger>
                  <TabsTrigger value="security" className="rounded-md px-3 py-1 text-sm font-medium transition-all hover:text-gray-900 dark:hover:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white">
                    Security
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="profile" className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-[#111827] border-0">
                  <CardHeader>
                    <CardTitle className="text-white">Profile Photo</CardTitle>
                    <CardDescription className="text-gray-300">Update your profile picture</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-6">
                      <ProfileUpload
                        email={user?.email || ""}
                        currentPhotoURL={profilePicUrl}
                        onPhotoUpdate={(url) => setProfilePicUrl(url)}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-300">
                          Update your profile picture
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#111827] border-0">
                  <CardHeader>
                    <CardTitle className="text-white">Personal Information</CardTitle>
                    <CardDescription className="text-gray-300">Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                      <Input id="name" defaultValue={user?.name || ""} className="bg-white" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input id="email" type="email" defaultValue={user?.email || ""} disabled className="bg-white" />
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="account" className="p-6">
              <div className="grid gap-6">
                <Card className="bg-[#111827] border-0">
                  <CardHeader>
                    <CardTitle className="text-white">Email Preferences</CardTitle>
                    <CardDescription className="text-gray-300">Manage your email notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-white">Community Updates</Label>
                        <p className="text-sm text-gray-300">Receive notifications about community activity</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-white">Feature Announcements</Label>
                        <p className="text-sm text-gray-300">Get notified about new features and updates</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="accessibility" className="p-6">
              <div className="grid gap-6">
                <Card className="bg-[#111827] border-0">
                  <CardHeader>
                    <CardTitle className="text-white">Display Settings</CardTitle>
                    <CardDescription className="text-gray-300">Customize your viewing experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-white">Theme</Label>
                        <p className="text-sm text-gray-300">Choose between light and dark mode</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className={`h-8 w-8 ${theme === 'light' ? 'bg-blue-500 text-white' : ''}`}
                          onClick={() => toggleTheme('light')}
                        >
                          <Sun className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className={`h-8 w-8 ${theme === 'dark' ? 'bg-blue-500 text-white' : ''}`}
                          onClick={() => toggleTheme('dark')}
                        >
                          <Moon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Font Size</Label>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={fontSize === 'small' ? 'bg-blue-500 text-white' : ''}
                          onClick={() => handleFontSize('small')}
                        >
                          Small
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={fontSize === 'medium' ? 'bg-blue-500 text-white' : ''}
                          onClick={() => handleFontSize('medium')}
                        >
                          Medium
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={fontSize === 'large' ? 'bg-blue-500 text-white' : ''}
                          onClick={() => handleFontSize('large')}
                        >
                          Large
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-white">High Contrast</Label>
                        <p className="text-sm text-gray-300">Increase contrast for better visibility</p>
                      </div>
                      <Switch 
                        checked={highContrast}
                        onCheckedChange={handleHighContrast}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security" className="p-6">
              <div className="grid gap-6">
                <Card className="bg-[#111827] border-0">
                  <CardHeader>
                    <CardTitle className="text-white">Security Settings</CardTitle>
                    <CardDescription className="text-gray-300">Manage your account security</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Shield className="h-8 w-8 text-blue-500" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">Two-Factor Authentication</h4>
                          <p className="text-sm text-gray-300">Add an extra layer of security to your account</p>
                        </div>
                        <Button variant="outline">Enable</Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <History className="h-8 w-8 text-blue-500" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">Login History</h4>
                          <p className="text-sm text-gray-300">View your recent login activity</p>
                        </div>
                        <Button variant="outline">View</Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <Trash2 className="h-8 w-8 text-red-500" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">Delete Account</h4>
                          <p className="text-sm text-gray-300">Permanently delete your account and data</p>
                        </div>
                        <Button variant="destructive">Delete</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

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
