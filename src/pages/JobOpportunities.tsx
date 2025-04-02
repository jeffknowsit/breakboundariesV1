
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import AnimatedHeader from "@/components/ui-components/AnimatedHeader";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, MapPin, Clock, Building, Search, Bookmark, Calendar, Filter, ArrowUpDown, CheckCircle, BookOpen, Code, HeartHandshake, PenTool } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface JobCategory {
  name: string;
  icon: React.ReactNode;
}

const categories: JobCategory[] = [
  { name: "All", icon: <Briefcase size={20} /> },
  { name: "Technology", icon: <Code size={20} /> },
  { name: "Healthcare", icon: <HeartHandshake size={20} /> },
  { name: "Education", icon: <BookOpen size={20} /> },
  { name: "Creative", icon: <PenTool size={20} /> }
];

interface JobListing {
  id: number;
  title: string;
  company: string;
  location: string;
  locationType: "Remote" | "Hybrid" | "On-site";
  jobType: "Full-time" | "Part-time" | "Contract" | "Internship";
  salary: string;
  postedDate: string;
  closingDate: string;
  description: string;
  requirements: string[];
  accommodations: string[];
  reservedForDA: boolean;
  featured?: boolean;
  category: string;
  logo: string;
}

const jobs: JobListing[] = [
  {
    id: 1,
    title: "Accessibility Specialist",
    company: "TechSolutions Inc.",
    location: "San Francisco, CA",
    locationType: "Remote",
    jobType: "Full-time",
    salary: "$80,000 - $100,000",
    postedDate: "June 5, 2023",
    closingDate: "July 10, 2023",
    description: "We're looking for an Accessibility Specialist to ensure our products meet WCAG standards and are usable by people of all abilities. You'll conduct audits, provide recommendations, and work with development teams to implement accessibility features.",
    requirements: [
      "Knowledge of WCAG 2.1 guidelines",
      "Experience with accessibility testing tools",
      "Understanding of assistive technologies",
      "3+ years of experience in web accessibility"
    ],
    accommodations: [
      "Flexible work hours",
      "Assistive technology provided",
      "Remote work options",
      "Accessible workspace"
    ],
    reservedForDA: true,
    featured: true,
    category: "Technology",
    logo: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Inclusive Education Coordinator",
    company: "Metropolitan School District",
    location: "Chicago, IL",
    locationType: "Hybrid",
    jobType: "Full-time",
    salary: "$65,000 - $75,000",
    postedDate: "June 8, 2023",
    closingDate: "July 15, 2023",
    description: "Join our team as an Inclusive Education Coordinator to develop and implement inclusive education strategies that support students with diverse abilities. You'll collaborate with teachers, parents, and specialists to ensure all students receive quality education.",
    requirements: [
      "Master's degree in Special Education or related field",
      "5+ years of experience in inclusive education",
      "Knowledge of IEP development and implementation",
      "Strong communication and collaboration skills"
    ],
    accommodations: [
      "Accessible classroom environment",
      "Modified work schedule available",
      "Assistive technology support",
      "Professional development opportunities"
    ],
    reservedForDA: true,
    category: "Education",
    logo: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Software Developer (Accessibility Focus)",
    company: "AccessTech Innovations",
    location: "Boston, MA",
    locationType: "Remote",
    jobType: "Full-time",
    salary: "$90,000 - $120,000",
    postedDate: "June 10, 2023",
    closingDate: "July 20, 2023",
    description: "We're seeking a Software Developer with expertise in creating accessible applications. You'll work on developing and enhancing our suite of assistive technology products, ensuring they meet the highest standards of accessibility and user experience.",
    requirements: [
      "Strong front-end development skills (React, JavaScript)",
      "Experience with ARIA and semantic HTML",
      "Understanding of accessibility guidelines",
      "3+ years of software development experience"
    ],
    accommodations: [
      "Flexible work schedule",
      "Remote work options",
      "Adaptive equipment provided",
      "Inclusive team environment"
    ],
    reservedForDA: true,
    featured: true,
    category: "Technology",
    logo: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Rehabilitation Counselor",
    company: "Wellness Recovery Center",
    location: "Denver, CO",
    locationType: "On-site",
    jobType: "Full-time",
    salary: "$60,000 - $72,000",
    postedDate: "June 12, 2023",
    closingDate: "July 12, 2023",
    description: "As a Rehabilitation Counselor, you'll provide guidance and support to individuals with disabilities, helping them achieve personal and professional goals. You'll develop rehabilitation plans, connect clients with resources, and advocate for their needs.",
    requirements: [
      "Master's degree in Rehabilitation Counseling or related field",
      "Licensed or eligible for licensure as a rehabilitation counselor",
      "Experience working with individuals with diverse disabilities",
      "Strong case management skills"
    ],
    accommodations: [
      "Accessible workplace",
      "Assistive technology available",
      "Flexible scheduling options",
      "Supportive team environment"
    ],
    reservedForDA: true,
    category: "Healthcare",
    logo: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Graphic Designer",
    company: "Creative Visions Studio",
    location: "Austin, TX",
    locationType: "Hybrid",
    jobType: "Part-time",
    salary: "$25 - $35 per hour",
    postedDate: "June 15, 2023",
    closingDate: "July 5, 2023",
    description: "We're looking for a talented Graphic Designer to join our creative team. You'll work on a variety of projects including digital media, print materials, and branding assets for our diverse client base. This position offers flexible hours and a collaborative environment.",
    requirements: [
      "Proficiency in Adobe Creative Suite",
      "Strong portfolio demonstrating design skills",
      "Understanding of design principles and typography",
      "Ability to meet deadlines and manage multiple projects"
    ],
    accommodations: [
      "Flexible work hours",
      "Adaptive design equipment available",
      "Remote work options",
      "Supportive team culture"
    ],
    reservedForDA: true,
    category: "Creative",
    logo: "/placeholder.svg"
  },
  {
    id: 6,
    title: "Customer Support Specialist",
    company: "Inclusive Solutions",
    location: "Atlanta, GA",
    locationType: "Remote",
    jobType: "Full-time",
    salary: "$45,000 - $55,000",
    postedDate: "June 18, 2023",
    closingDate: "July 18, 2023",
    description: "Join our customer support team to assist users with our accessible technology products. You'll provide technical assistance, troubleshoot issues, and ensure our customers have a positive experience with our services. Training on our specific products will be provided.",
    requirements: [
      "Excellent communication skills",
      "Problem-solving abilities",
      "Patient and empathetic approach",
      "Basic technical knowledge",
      "Customer service experience preferred"
    ],
    accommodations: [
      "Fully remote position",
      "Flexible scheduling",
      "Assistive technology provided",
      "Comprehensive training program"
    ],
    reservedForDA: true,
    category: "Technology",
    logo: "/placeholder.svg"
  }
];

const JobOpportunities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [activeCategory, setActiveCategory] = useState("All");
  const { toast } = useToast();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    filterJobs(searchTerm, activeCategory);
  };

  const filterJobs = (term: string, category: string) => {
    let filtered = jobs;
    
    // Filter by search term
    if (term) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(term.toLowerCase()) || 
        job.company.toLowerCase().includes(term.toLowerCase()) ||
        job.description.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter(job => job.category === category);
    }
    
    setFilteredJobs(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    filterJobs(searchTerm, category);
  };

  const handleSaveJob = (jobTitle: string) => {
    toast({
      title: "Job Saved",
      description: `${jobTitle} has been saved to your profile.`,
      duration: 3000,
    });
  };

  const handleApplyJob = (jobTitle: string) => {
    toast({
      title: "Application Started",
      description: `You're applying for ${jobTitle}. Complete your profile to continue.`,
      duration: 5000,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <AnimatedHeader 
          title="Job Opportunities"
          subtitle="Discover employment opportunities specifically reserved for differently-abled individuals across various industries. These positions offer inclusive work environments, reasonable accommodations, and meaningful career paths."
        />

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Search jobs by title, company or keywords" 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Button type="button" variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                <span>Filters</span>
              </Button>
              <Button type="button" variant="outline" className="flex items-center gap-2">
                <ArrowUpDown size={16} />
                <span>Sort</span>
              </Button>
              <Button type="submit" className="bg-assist-600 hover:bg-assist-700">
                Search
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Job Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8"
        >
          <StatCard 
            title="Available Jobs" 
            value={jobs.length.toString()} 
            description="Currently active job listings" 
            icon={<Briefcase size={24} />}
          />
          <StatCard 
            title="Companies" 
            value="24+" 
            description="Inclusive employers" 
            icon={<Building size={24} />}
          />
          <StatCard 
            title="Remote Jobs" 
            value="60%" 
            description="Offer work-from-home options" 
            icon={<MapPin size={24} />}
          />
          <StatCard 
            title="New This Week" 
            value="12" 
            description="Recently posted opportunities" 
            icon={<Calendar size={24} />}
          />
        </motion.div>

        {/* Category Tabs */}
        <Tabs defaultValue="All" className="mt-8">
          <TabsList className="mb-6">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.name} 
                value={category.name}
                onClick={() => handleCategoryChange(category.name)}
                className="flex items-center gap-2"
              >
                {category.icon}
                <span>{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category.name} value={category.name}>
              {filteredJobs.length > 0 ? (
                <div className="space-y-6">
                  {filteredJobs.map((job, index) => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      index={index}
                      onSave={() => handleSaveJob(job.title)}
                      onApply={() => handleApplyJob(job.title)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">No jobs found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 bg-assist-50 p-8 rounded-xl border border-assist-100"
        >
          <h2 className="text-2xl font-medium mb-6">Why Choose Our Job Board</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-assist-100 text-assist-600 mb-4">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Verified Opportunities</h3>
              <p className="text-gray-600">All listings are verified to ensure they genuinely accommodate the needs of differently-abled individuals.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-assist-100 text-assist-600 mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Resume Building</h3>
              <p className="text-gray-600">Get assistance with creating an accessible resume that highlights your skills and qualifications.</p>
            </div>
            <div className="bg-white p-6 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-assist-100 text-assist-600 mb-4">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Inclusive Employers</h3>
              <p className="text-gray-600">Partner with companies committed to creating diverse and accessible workplaces.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

const JobCard = ({ 
  job, 
  index,
  onSave,
  onApply
}: { 
  job: JobListing; 
  index: number;
  onSave: () => void;
  onApply: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                <img src={job.logo} alt={job.company} className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{job.title}</CardTitle>
                  {job.featured && (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      Featured
                    </Badge>
                  )}
                  {job.reservedForDA && (
                    <Badge className="bg-assist-600 hover:bg-assist-700">
                      Reserved Position
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-base font-medium mt-1">
                  {job.company}
                </CardDescription>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-400 hover:text-assist-600"
              onClick={onSave}
            >
              <Bookmark size={18} />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 text-sm mb-4">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-assist-600" />
              <span>{job.location}</span>
              <Badge variant="outline" className="ml-1 bg-gray-50">
                {job.locationType}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-assist-600" />
              <span>{job.jobType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-assist-600" />
              <span>{job.salary}</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">{job.description}</p>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Requirements:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {job.requirements.slice(0, 3).map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
              {job.requirements.length > 3 && <li>+ {job.requirements.length - 3} more</li>}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Accommodations Provided:</h4>
            <div className="flex flex-wrap gap-2">
              {job.accommodations.map((acc, idx) => (
                <span key={idx} className="text-xs px-2 py-1 bg-assist-50 text-assist-700 rounded-full">
                  {acc}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>Posted: {job.postedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>Closes: {job.closingDate}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline">View Details</Button>
          <Button 
            className="bg-assist-600 hover:bg-assist-700"
            onClick={onApply}
          >
            Apply Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon 
}: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ReactNode 
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100">
      <div className="text-assist-600 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-1">{title}</h3>
      <div className="text-3xl font-bold text-assist-700 mb-2">{value}</div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default JobOpportunities;
