// app/admin/settings/landing-page-images/page.tsx
"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/protected-route";
import Link from "next/link";
import {
  ChevronLeft,
  Image as ImageIcon,
  Plus,
  Trash2,
  Upload,
  Save
} from "lucide-react";
import Image from "next/image";

export default function LandingPageImages() {
  const [images, setImages] = useState([
    { id: 1, url: "/placeholder1.jpg", alt: "Project 1" },
    { id: 2, url: "/placeholder2.jpg", alt: "Project 2" },
    { id: 3, url: "/placeholder3.jpg", alt: "Project 3" },
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const [newImage, setNewImage] = useState({ url: "", alt: "" });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const file = e.target.files[0];
      const newImageUrl = URL.createObjectURL(file);
      
      setImages(prev => [
        ...prev,
        { id: Date.now(), url: newImageUrl, alt: file.name.split('.')[0] }
      ]);
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (id: number) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleSaveChanges = () => {
    // In a real app, you would save to your database/API here
    console.log("Images saved:", images);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-muted/30">
        <header className="bg-background border-b">
          <div className="container-kanik flex h-16 items-center justify-between">
            <Link href="/admin/settings" className="flex items-center gap-2">
              <ChevronLeft className="h-5 w-5" />
              <span className="font-bold">Back to Settings</span>
            </Link>
          </div>
        </header>

        <div className="container-kanik py-8">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-bold">Landing Page Images</h1>
                <p className="text-muted-foreground">
                  Manage the image grid displayed on your landing page
                </p>
              </div>
              <button
                onClick={handleSaveChanges}
                className="flex items-center gap-2 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>

            <div className="bg-background p-6 rounded-md border">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Image Gallery</h2>
                <label className="flex items-center gap-2 text-sm bg-primary text-primary-foreground py-1.5 px-3 rounded-md hover:bg-primary/90 cursor-pointer">
                  <Upload className="h-4 w-4" />
                  Upload Images
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple
                  />
                </label>
              </div>

              {isUploading && (
                <div className="mb-4 p-4 bg-blue-50 text-blue-700 rounded-md">
                  Uploading images...
                </div>
              )}

              {images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-square overflow-hidden rounded-md bg-muted">
                        <Image
                          src={image.url}
                          alt={image.alt}
                          width={300}
                          height={300}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="mt-2 px-1">
                        <input
                          type="text"
                          value={image.alt}
                          onChange={(e) =>
                            setImages(prev =>
                              prev.map(img =>
                                img.id === image.id
                                  ? { ...img, alt: e.target.value }
                                  : img
                              )
                            )
                          }
                          className="w-full p-1 text-sm border-b bg-transparent focus:outline-none focus:border-primary"
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-md p-12 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 font-medium">No images uploaded</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Upload images to create your landing page grid
                  </p>
                  <label className="mt-4 inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground py-1.5 px-3 rounded-md hover:bg-primary/90 cursor-pointer">
                    <Upload className="h-4 w-4" />
                    Upload Images
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      multiple
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}