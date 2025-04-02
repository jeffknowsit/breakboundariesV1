
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-assist-100 flex items-center justify-center">
            <AlertCircle size={36} className="text-assist-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for cannot be found.
        </p>
        <Button asChild className="bg-assist-600 hover:bg-assist-700">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Return to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
