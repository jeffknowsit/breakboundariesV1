import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, Loader2, Upload, Trash2 } from "lucide-react";
import { supabase } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface ProfileUploadProps {
  email: string;
  currentPhotoURL: string | null;
  onPhotoUpdate: (url: string | null) => void;
}

export function ProfileUpload({ email, currentPhotoURL, onPhotoUpdate }: ProfileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 2MB",
        variant: "destructive",
      });
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Only image files are allowed",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsUploading(true);

      // Step 1: Upload to Storage Bucket
      const fileExt = file.type.split('/')[1];
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        throw new Error(`Storage upload failed: ${uploadError.message}`);
      }

      // Step 2: Generate the public URL using storage.getPublicUrl
      const { data: urlData } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(fileName);

      if (!urlData.publicUrl) {
        throw new Error('Failed to generate public URL');
      }

      // Step 3: Update Database with the public URL
      const { error: dbError } = await supabase
        .from('profilepic')
        .upsert({
          EmailID: email,
          PictureUrl: urlData.publicUrl,
          created_at: new Date().toISOString()
        }, {
          onConflict: 'EmailID'
        });

      if (dbError) {
        // If database update fails, clean up the uploaded file
        await supabase.storage
          .from('profile-pictures')
          .remove([fileName]);
        throw new Error(`Database update failed: ${dbError.message}`);
      }

      // Step 4: Clean up old photo if exists
      if (currentPhotoURL) {
        const oldFileName = currentPhotoURL.split('/').pop();
        if (oldFileName) {
          await supabase.storage
            .from('profile-pictures')
            .remove([oldFileName]);
        }
      }

      // Step 5: Update UI with the new public URL
      onPhotoUpdate(urlData.publicUrl);
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile picture",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = async () => {
    if (!currentPhotoURL) return;

    try {
      setIsUploading(true);

      // Step 1: Remove from Storage
      const fileName = currentPhotoURL.split('/').pop();
      if (fileName) {
        const { error: storageError } = await supabase.storage
          .from('profile-pictures')
          .remove([fileName]);

        if (storageError) {
          throw new Error(`Storage removal failed: ${storageError.message}`);
        }
      }

      // Step 2: Remove from Database
      const { error: dbError } = await supabase
        .from('profilepic')
        .delete()
        .eq('EmailID', email);

      if (dbError) {
        throw new Error(`Database removal failed: ${dbError.message}`);
      }

      // Step 3: Update UI
      onPhotoUpdate(null);
      toast({
        title: "Success",
        description: "Profile picture removed successfully",
      });
    } catch (error: any) {
      console.error('Remove error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to remove profile picture",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-blue-500 dark:border-blue-400">
          {currentPhotoURL ? (
            <img 
              src={currentPhotoURL} 
              alt="Profile" 
              className="h-full w-full object-cover"
            />
          ) : (
            <Camera className="h-12 w-12 text-gray-400" />
          )}
        </div>
        <label className="absolute -bottom-1 -right-1 cursor-pointer">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <Button 
            size="icon" 
            variant="outline"
            className="h-7 w-7 rounded-full bg-background border-blue-500 hover:bg-blue-500/10 hover:text-blue-500"
            disabled={isUploading}
          >
            {isUploading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Camera className="h-3 w-3" />
            )}
          </Button>
        </label>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1 text-gray-300 border-gray-700 hover:bg-blue-500/10 hover:text-blue-500"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload New Photo
            </>
          )}
        </Button>
        {currentPhotoURL && (
          <Button
            variant="destructive"
            onClick={handleRemove}
            disabled={isUploading}
            size="icon"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
} 