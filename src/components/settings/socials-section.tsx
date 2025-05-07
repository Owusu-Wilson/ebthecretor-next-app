'use client';
import React, { useState } from 'react'
import {

    Share2,
    Save,
    LucideDribbble,
    LucideFacebook,
    LucideInstagram,
    LucideTwitter,
    Plus,
  } from "lucide-react";
function AdminSocialsSettings() {
    const [settings, setSettings] = useState({
        landingPage: {
          title: "Kanik Creative Studio",
          subtitle: "We craft digital experiences",
          featuredImage: "",
          ctaText: "Get in touch",
          ctaLink: "/contact",
        },
        contact: {
          email: "hello@kanikstudio.com",
          phone: "+1 (555) 123-4567",
          address: "123 Creative St, Design City, DC 10001",
          contactFormEnabled: true,
        },
        social: {
          twitter: "kanikstudio",
          instagram: "kanikstudio",
          facebook: "kanikstudio",
          linkedin: "company/kanikstudio",
          dribbble: "kanikstudio",
        },
      });
      const handleChange = (
        section: string,
        field: string,
        value: string | boolean
      ) => {
        setSettings((prev) => ({
          ...prev,
          [section]: {
            ...prev[section as keyof typeof prev],
            [field]: value,
          },
        }));
      };
    
   
  return (
    <div className="bg-background p-6 rounded-md border">
    <div className="flex items-center gap-3 mb-6">
      <Share2 className="h-5 w-5 text-purple-500" />
      <h2 className="text-xl font-semibold">
        Social Media Handles
      </h2>
    </div>

    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Twitter
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-muted-foreground">
              <LucideTwitter className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={settings.social.twitter}
              onChange={(e) =>
                handleChange("social", "twitter", e.target.value)
              }
              className="flex-1 p-2 border rounded-r-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Instagram
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-muted-foreground">
              <LucideInstagram className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={settings.social.instagram}
              onChange={(e) =>
                handleChange("social", "instagram", e.target.value)
              }
              className="flex-1 p-2 border rounded-r-md"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Facebook
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-muted-foreground">
              <LucideFacebook className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={settings.social.facebook}
              onChange={(e) =>
                handleChange("social", "facebook", e.target.value)
              }
              className="flex-1 p-2 border rounded-r-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            LinkedIn
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-muted-foreground">
              company/
            </span>
            <input
              type="text"
              value={settings.social.linkedin}
              onChange={(e) =>
                handleChange("social", "linkedin", e.target.value)
              }
              className="flex-1 p-2 border rounded-r-md"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-1">
          Dribbble
        </label>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-muted text-muted-foreground">
            <LucideDribbble className="h-4 w-4" />
          </span>
          <input
            type="text"
            value={settings.social.dribbble}
            onChange={(e) =>
              handleChange("social", "dribbble", e.target.value)
            }
            className="flex-1 p-2 border rounded-r-md"
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminSocialsSettings