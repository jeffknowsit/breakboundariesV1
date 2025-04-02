
import React, { useState, useRef } from "react";
import MainLayout from "@/components/layout/MainLayout";
import AnimatedHeader from "@/components/ui-components/AnimatedHeader";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, FileVideo, Mic, Play, Square, HandHelping, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const SignTranslator = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [translation, setTranslation] = useState("");
  const [activeTab, setActiveTab] = useState("camera");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleStartStream = () => {
    setIsStreaming(true);
    // In a real implementation, this would activate the camera and start processing
    // For demo purposes, we'll just set a sample translation after a delay
    setTimeout(() => {
      setTranslation("Hello, how are you today? I'm glad to meet you.");
    }, 3000);
  };

  const handleStopStream = () => {
    setIsStreaming(false);
    setTranslation("");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <AnimatedHeader
          title="Sign Language Translator"
          subtitle="Our AI-powered sign language translator enables real-time communication by translating sign language to text and speech, breaking down barriers in everyday conversations."
          className="max-w-3xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HandHelping className="text-assist-600" size={20} />
                <span>Sign Language Input</span>
              </CardTitle>
              <CardDescription>
                Use your camera or upload a video to translate sign language to text
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-2 mb-6">
                  <TabsTrigger value="camera" className="flex items-center gap-2">
                    <Camera size={16} />
                    <span>Camera</span>
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center gap-2">
                    <FileVideo size={16} />
                    <span>Upload Video</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="camera" className="mt-0">
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                    {isStreaming ? (
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Camera size={48} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center mt-4">
                    {!isStreaming ? (
                      <Button onClick={handleStartStream} className="bg-assist-600 hover:bg-assist-700">
                        <Play size={16} className="mr-2" />
                        Start Translating
                      </Button>
                    ) : (
                      <Button onClick={handleStopStream} variant="destructive">
                        <Square size={16} className="mr-2" />
                        Stop Translating
                      </Button>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="video" className="mt-0">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FileVideo size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">
                      Drag and drop your video here, or click to browse
                    </p>
                    <Button className="bg-assist-600 hover:bg-assist-700">
                      Upload Video
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="text-assist-600" size={20} />
                <span>Translation Output</span>
              </CardTitle>
              <CardDescription>
                Real-time text and audio translation results
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isStreaming ? (
                <div className="space-y-4">
                  <div className="h-40 overflow-y-auto bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p>{translation}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Text-to-Speech</span>
                    <Button variant="secondary" size="sm" className="flex items-center gap-2">
                      <Mic size={16} />
                      <span>Play Audio</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <AlertCircle size={32} className="text-gray-400 mb-2" />
                  <p className="text-gray-500">Translation will appear here once you start translating</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>How to Use the Sign Language Translator</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Position yourself in front of the camera with good lighting</li>
                <li>Click "Start Translating" to begin the translation process</li>
                <li>Make clear sign language gestures at a moderate pace</li>
                <li>View the translated text in real-time on the right panel</li>
                <li>Use the text-to-speech feature if you need audio output</li>
              </ol>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default SignTranslator;
