
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type EventProps = {
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  category: string;
  index: number;
};

const CommunityEvent = ({ title, date, time, location, attendees, maxAttendees, category, index }: EventProps) => {
  const isAlmostFull = attendees / maxAttendees > 0.7;
  const isFull = attendees >= maxAttendees;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
    >
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <CardDescription>{category}</CardDescription>
            </div>
            <Badge variant={isFull ? "destructive" : isAlmostFull ? "secondary" : "outline"}>
              {isFull ? "Full" : `${attendees}/${maxAttendees} Joined`}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex flex-col space-y-2 text-sm">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-assist-600" />
              <span>{date}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-assist-600" />
              <span>{time}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-assist-600" />
              <span>{location}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className={cn("w-full", isFull ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed" : "bg-assist-600 hover:bg-assist-700")}
            disabled={isFull}
          >
            {isFull ? "Event Full" : "Join Event"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const upcomingEvents = [
  {
    title: "Assistive Technology Workshop",
    date: "June 15, 2023",
    time: "2:00 PM - 4:00 PM",
    location: "Community Center, Block A",
    attendees: 18,
    maxAttendees: 25,
    category: "Workshop"
  },
  {
    title: "Career Development Meetup",
    date: "June 18, 2023",
    time: "10:00 AM - 12:30 PM",
    location: "Virtual (Zoom)",
    attendees: 32,
    maxAttendees: 50,
    category: "Networking"
  },
  {
    title: "Inclusive Sports Day",
    date: "June 24, 2023",
    time: "9:00 AM - 3:00 PM",
    location: "City Park",
    attendees: 45,
    maxAttendees: 45,
    category: "Sports"
  },
  {
    title: "Art Therapy Session",
    date: "July 5, 2023",
    time: "3:00 PM - 5:00 PM",
    location: "Creative Studio, Downtown",
    attendees: 12,
    maxAttendees: 15,
    category: "Therapy"
  }
];

const CommunityEvents = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CalendarClock size={24} className="text-assist-600" />
          <h2 className="text-2xl font-medium">Upcoming Events</h2>
        </div>
        <Button className="bg-assist-600 hover:bg-assist-700">
          Create Event
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingEvents.map((event, index) => (
          <CommunityEvent
            key={index}
            title={event.title}
            date={event.date}
            time={event.time}
            location={event.location}
            attendees={event.attendees}
            maxAttendees={event.maxAttendees}
            category={event.category}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityEvents;
