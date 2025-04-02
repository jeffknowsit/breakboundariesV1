
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import AnimatedHeader from "@/components/ui-components/AnimatedHeader";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, Clock, ExternalLink, Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SchemeProps = {
  title: string;
  category: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  lastDate: string;
  link: string;
  isNew: boolean;
  index: number;
};

const schemes = [
  {
    title: "Accessible India Campaign (Sugamya Bharat Abhiyan)",
    category: "Accessibility",
    description: "A nationwide campaign for achieving universal accessibility for persons with disabilities.",
    eligibility: [
      "Persons with disabilities",
      "All citizens benefiting from accessible infrastructure"
    ],
    benefits: [
      "Accessible public buildings",
      "Accessible transportation",
      "Accessible information and communication systems"
    ],
    lastDate: "Ongoing",
    link: "#",
    isNew: false
  },
  {
    title: "Deendayal Disabled Rehabilitation Scheme",
    category: "Rehabilitation",
    description: "Financial assistance to NGOs for providing education, vocational training, and rehabilitation of persons with disabilities.",
    eligibility: [
      "Registered NGOs/organizations",
      "Organizations working for persons with disabilities"
    ],
    benefits: [
      "Financial support for rehabilitation centers",
      "Vocational training programs",
      "Special education initiatives"
    ],
    lastDate: "December 15, 2023",
    link: "#",
    isNew: true
  },
  {
    title: "Assistance to Disabled Persons Scheme (ADIP)",
    category: "Assistive Devices",
    description: "Provision of aids and assistive devices to persons with disabilities to enhance their mobility and independence.",
    eligibility: [
      "Persons with disabilities (40% or more disability)",
      "Monthly income below ₹20,000"
    ],
    benefits: [
      "Free assistive devices",
      "Subsidized high-end assistive devices",
      "Maintenance and repair support"
    ],
    lastDate: "Ongoing",
    link: "#",
    isNew: false
  },
  {
    title: "Scholarship for Students with Disabilities",
    category: "Education",
    description: "Financial assistance to students with disabilities to pursue higher education and professional courses.",
    eligibility: [
      "Students with 40% or more disability",
      "Enrolled in recognized institutions",
      "Family income below ₹6 lakh per annum"
    ],
    benefits: [
      "Course fee reimbursement",
      "Maintenance allowance",
      "Reader allowance for visually impaired"
    ],
    lastDate: "October 31, 2023",
    link: "#",
    isNew: true
  },
  {
    title: "National Fellowship for Persons with Disabilities",
    category: "Research & Education",
    description: "Fellowship program for persons with disabilities to pursue research degrees like M.Phil and Ph.D.",
    eligibility: [
      "Persons with disabilities (40% or more)",
      "Qualified for JRF/NET or admitted to M.Phil/Ph.D",
      "Below 35 years of age"
    ],
    benefits: [
      "Monthly fellowship amount",
      "Contingency grant",
      "Escorts/Reader assistance"
    ],
    lastDate: "November 30, 2023",
    link: "#",
    isNew: false
  }
];

const SchemeCard = ({ title, category, description, eligibility, benefits, lastDate, link, isNew, index }: SchemeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {title}
                {isNew && <Badge className="bg-assist-100 text-assist-700 hover:bg-assist-100">New</Badge>}
              </CardTitle>
              <CardDescription>{category}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-gray-600 mb-4">{description}</p>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-1">Eligibility:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {eligibility.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Benefits:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {benefits.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center text-sm">
              <Calendar size={16} className="mr-2 text-assist-600" />
              <span>Last Date: {lastDate}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button className="w-full sm:w-auto bg-assist-600 hover:bg-assist-700 flex items-center gap-2">
            <ExternalLink size={16} />
            <span>Apply Now</span>
          </Button>
          <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
            <Download size={16} />
            <span>Download Details</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const GovernmentSchemes = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <AnimatedHeader
          title="Government Schemes"
          subtitle="Stay updated with the latest government initiatives, benefits, and schemes available for differently-abled individuals."
          className="max-w-3xl"
        />

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-gray-500" size={16} />
                <Input 
                  className="pl-10"
                  placeholder="Search by scheme name or category" 
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                <span>Filters</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-6 bg-gray-100/80 p-1">
            <TabsTrigger value="all" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              All Schemes
            </TabsTrigger>
            <TabsTrigger value="education" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Education
            </TabsTrigger>
            <TabsTrigger value="healthcare" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Healthcare
            </TabsTrigger>
            <TabsTrigger value="employment" className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Employment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {schemes.map((scheme, index) => (
                <SchemeCard
                  key={index}
                  title={scheme.title}
                  category={scheme.category}
                  description={scheme.description}
                  eligibility={scheme.eligibility}
                  benefits={scheme.benefits}
                  lastDate={scheme.lastDate}
                  link={scheme.link}
                  isNew={scheme.isNew}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {schemes
                .filter(scheme => scheme.category === "Education" || scheme.category === "Research & Education")
                .map((scheme, index) => (
                  <SchemeCard
                    key={index}
                    title={scheme.title}
                    category={scheme.category}
                    description={scheme.description}
                    eligibility={scheme.eligibility}
                    benefits={scheme.benefits}
                    lastDate={scheme.lastDate}
                    link={scheme.link}
                    isNew={scheme.isNew}
                    index={index}
                  />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="healthcare" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {schemes
                .filter(scheme => scheme.category === "Assistive Devices" || scheme.category === "Rehabilitation")
                .map((scheme, index) => (
                  <SchemeCard
                    key={index}
                    title={scheme.title}
                    category={scheme.category}
                    description={scheme.description}
                    eligibility={scheme.eligibility}
                    benefits={scheme.benefits}
                    lastDate={scheme.lastDate}
                    link={scheme.link}
                    isNew={scheme.isNew}
                    index={index}
                  />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="employment" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {schemes
                .filter(scheme => scheme.category === "Accessibility")
                .map((scheme, index) => (
                  <SchemeCard
                    key={index}
                    title={scheme.title}
                    category={scheme.category}
                    description={scheme.description}
                    eligibility={scheme.eligibility}
                    benefits={scheme.benefits}
                    lastDate={scheme.lastDate}
                    link={scheme.link}
                    isNew={scheme.isNew}
                    index={index}
                  />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default GovernmentSchemes;
