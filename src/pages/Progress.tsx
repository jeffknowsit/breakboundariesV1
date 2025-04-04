import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";
import { Calendar, Target, TrendingUp, Award, Clock } from "lucide-react";

// Sample data for the charts
const progressData = [
  { month: 'Jan', progress: 30 },
  { month: 'Feb', progress: 45 },
  { month: 'Mar', progress: 55 },
  { month: 'Apr', progress: 65 },
  { month: 'May', progress: 75 },
  { month: 'Jun', progress: 85 },
];

const skillsData = [
  { name: "Communication Skills", progress: 75 },
  { name: "Physical Therapy", progress: 85 },
  { name: "Cognitive Development", progress: 60 },
  { name: "Social Interaction", progress: 70 },
  { name: "Daily Living Skills", progress: 80 },
];

const ProgressCharts = () => {
  const [timeframe, setTimeframe] = useState("6months");

  return (
    <MainLayout>
      <div className="space-y-6 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Progress Analytics</h1>
          <p className="text-muted-foreground mb-6">
            Track your development and visualize improvements over time
          </p>
        </motion.div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-blue-500/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-blue-600">Overall Progress</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">75%</div>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-green-500/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Goals Achieved</CardTitle>
              <Award className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">12/15</div>
              <Progress value={80} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-purple-500/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-purple-600">Active Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">15 Days</div>
              <Progress value={60} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-orange-500/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">Time Invested</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">45.5 hrs</div>
              <Progress value={90} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Development Progress</CardTitle>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="progress" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Skills Progress */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Skills Development</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {skillsData.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                  </div>
                  <Progress value={skill.progress} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Calendar View */}
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Activity Calendar</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }, (_, i) => (
                <div
                  key={i}
                  className={`h-10 rounded-md border flex items-center justify-center text-sm
                    ${i % 3 === 0 ? 'bg-blue-500/10 border-blue-500/20' : 'border-gray-200'}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ProgressCharts; 