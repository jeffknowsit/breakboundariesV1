
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import AnimatedHeader from "@/components/ui-components/AnimatedHeader";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hospital, Phone, MapPin, Clock, Star, Search, Filter, ArrowUpDown, Stethoscope, Accessibility, Brain, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SpecialtyItem {
  name: string;
  icon: React.ReactNode;
}

const specialties: SpecialtyItem[] = [
  { name: "Rehabilitation", icon: <Accessibility size={20} /> },
  { name: "Neurology", icon: <Brain size={20} /> },
  { name: "Cardiology", icon: <Heart size={20} /> },
  { name: "General", icon: <Hospital size={20} /> }
];

interface HospitalData {
  id: number;
  name: string;
  address: string;
  distance: string;
  phone: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  facilities: string[];
  hours: {
    weekdays: string;
    weekends: string;
  };
  hasEmergency: boolean;
  imageUrl: string;
  featured?: boolean;
}

const hospitals: HospitalData[] = [
  {
    id: 1,
    name: "National Rehabilitation Center",
    address: "123 Medical Avenue, New York, NY 10001",
    distance: "2.3 miles",
    phone: "(212) 555-7890",
    rating: 4.8,
    reviewCount: 324,
    specialties: ["Rehabilitation", "Neurology", "Occupational Therapy"],
    facilities: ["Wheelchair Access", "Assistive Technology Lab", "Therapy Pool"],
    hours: {
      weekdays: "8:00 AM - 6:00 PM",
      weekends: "9:00 AM - 3:00 PM"
    },
    hasEmergency: true,
    imageUrl: "/placeholder.svg",
    featured: true
  },
  {
    id: 2,
    name: "Inclusive Care Hospital",
    address: "456 Healthcare Drive, New York, NY 10002",
    distance: "3.5 miles",
    phone: "(212) 555-1234",
    rating: 4.7,
    reviewCount: 256,
    specialties: ["General", "Audiology", "Vision Services"],
    facilities: ["Sensory-Friendly Rooms", "Sign Language Interpreters", "Accessible MRI"],
    hours: {
      weekdays: "7:00 AM - 8:00 PM",
      weekends: "8:00 AM - 5:00 PM"
    },
    hasEmergency: true,
    imageUrl: "/placeholder.svg",
    featured: true
  },
  {
    id: 3,
    name: "Mobility Treatment Center",
    address: "789 Wellness Street, New York, NY 10003",
    distance: "1.8 miles",
    phone: "(212) 555-5678",
    rating: 4.5,
    reviewCount: 198,
    specialties: ["Rehabilitation", "Orthopedics", "Physical Therapy"],
    facilities: ["Adaptive Exercise Equipment", "Gait Analysis Lab", "Prosthetics Workshop"],
    hours: {
      weekdays: "8:30 AM - 7:00 PM",
      weekends: "9:00 AM - 2:00 PM"
    },
    hasEmergency: false,
    imageUrl: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Neurodiversity Medical Institute",
    address: "321 Cognitive Lane, New York, NY 10004",
    distance: "4.2 miles",
    phone: "(212) 555-9012",
    rating: 4.9,
    reviewCount: 187,
    specialties: ["Neurology", "Cognitive Therapy", "Behavioral Health"],
    facilities: ["Sensory-Friendly Environment", "AAC Device Support", "Quiet Spaces"],
    hours: {
      weekdays: "8:00 AM - 6:30 PM",
      weekends: "Closed"
    },
    hasEmergency: false,
    imageUrl: "/placeholder.svg"
  },
  {
    id: 5,
    name: "Comprehensive Accessibility Hospital",
    address: "567 Inclusive Boulevard, New York, NY 10005",
    distance: "5.1 miles",
    phone: "(212) 555-3456",
    rating: 4.6,
    reviewCount: 243,
    specialties: ["General", "Cardiology", "Pulmonology"],
    facilities: ["Full Accessibility Features", "Bariatric Equipment", "Adaptive Technology"],
    hours: {
      weekdays: "24 Hours",
      weekends: "24 Hours"
    },
    hasEmergency: true,
    imageUrl: "/placeholder.svg"
  },
  {
    id: 6,
    name: "Adaptive Technology Medical Center",
    address: "890 Innovation Road, New York, NY 10006",
    distance: "3.7 miles",
    phone: "(212) 555-7890",
    rating: 4.4,
    reviewCount: 176,
    specialties: ["Rehabilitation", "Occupational Therapy", "Technology Assessment"],
    facilities: ["Assistive Tech Showroom", "Smart Home Simulation", "Computer Accessibility Lab"],
    hours: {
      weekdays: "9:00 AM - 5:30 PM",
      weekends: "10:00 AM - 2:00 PM"
    },
    hasEmergency: false,
    imageUrl: "/placeholder.svg"
  }
];

const Hospitals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setFilteredHospitals(
      hospitals.filter(hospital => 
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <AnimatedHeader 
          title="Specialized Hospitals"
          subtitle="Find nearby healthcare facilities that are equipped to provide specialized services for differently-abled individuals. These hospitals offer accessible infrastructure, specialized care, and supportive services to ensure comprehensive healthcare."
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
                placeholder="Search by hospital name, location, or specialty" 
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

        {/* Specialty Tabs */}
        <Tabs defaultValue="all" className="mt-8">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Hospitals</TabsTrigger>
            {specialties.map((specialty) => (
              <TabsTrigger key={specialty.name} value={specialty.name} className="flex items-center gap-2">
                {specialty.icon}
                <span>{specialty.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all">
            <HospitalGrid hospitals={filteredHospitals} />
          </TabsContent>
          
          {specialties.map((specialty) => (
            <TabsContent key={specialty.name} value={specialty.name}>
              <HospitalGrid 
                hospitals={filteredHospitals.filter(hospital => 
                  hospital.specialties.includes(specialty.name)
                )} 
              />
            </TabsContent>
          ))}
        </Tabs>

        {/* Featured Facilities Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-medium mb-6 flex items-center gap-2">
            <Stethoscope className="text-assist-600" />
            <span>Featured Specialized Facilities</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              title="Accessibility Evaluation"
              description="Get a comprehensive assessment of mobility needs and recommendations for adaptive equipment."
              icon={<Accessibility size={24} />}
            />
            <FeatureCard 
              title="Sensory-Friendly Environments"
              description="Specially designed spaces that accommodate sensory sensitivities with adjustable lighting and sound."
              icon={<Brain size={24} />}
            />
            <FeatureCard 
              title="Communication Support"
              description="Access to sign language interpreters, text-to-speech devices, and other communication aids."
              icon={<Hospital size={24} />}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const HospitalGrid = ({ hospitals }: { hospitals: HospitalData[] }) => {
  return hospitals.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {hospitals.map((hospital, index) => (
        <HospitalCard key={hospital.id} hospital={hospital} index={index} />
      ))}
    </div>
  ) : (
    <div className="text-center py-12 bg-gray-50 rounded-lg">
      <Hospital className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium">No hospitals found</h3>
      <p className="text-gray-500">Try adjusting your search or filters</p>
    </div>
  );
};

const HospitalCard = ({ hospital, index }: { hospital: HospitalData; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden">
        <div className="relative h-48">
          <img 
            src={hospital.imageUrl} 
            alt={hospital.name} 
            className="w-full h-full object-cover"
          />
          {hospital.featured && (
            <Badge className="absolute top-4 right-4 bg-assist-600">
              Featured
            </Badge>
          )}
          {hospital.hasEmergency && (
            <Badge className="absolute top-4 left-4 bg-red-500">
              24/7 Emergency
            </Badge>
          )}
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{hospital.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <MapPin size={14} className="text-gray-500" />
                <span>{hospital.address}</span>
                <span className="text-assist-600 font-medium ml-2">{hospital.distance}</span>
              </CardDescription>
            </div>
            <div className="flex items-center text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="ml-1 font-medium">{hospital.rating}</span>
              <span className="text-gray-500 text-xs ml-1">({hospital.reviewCount})</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-wrap gap-2 mb-4">
            {hospital.specialties.map((specialty) => (
              <Badge key={specialty} variant="outline" className="bg-gray-50">
                {specialty}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-assist-600" />
              <span>Weekdays: {hospital.hours.weekdays}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-assist-600" />
              <span>Weekends: {hospital.hours.weekends}</span>
            </div>
            <div className="flex items-center gap-2 md:col-span-2">
              <Phone size={16} className="text-assist-600" />
              <span>{hospital.phone}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Specialized Facilities:</h4>
            <div className="flex flex-wrap gap-2">
              {hospital.facilities.map((facility) => (
                <span key={facility} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                  {facility}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View Details</Button>
          <Button className="bg-assist-600 hover:bg-assist-700">Book Appointment</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const FeatureCard = ({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100"
    >
      <div className="inline-flex items-center justify-center p-3 bg-assist-100 rounded-full text-assist-600 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default Hospitals;
