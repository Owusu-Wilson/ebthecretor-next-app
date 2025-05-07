"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Home, Save, Plus } from "lucide-react";
import { ContactInfo } from "@prisma/client";
import { Button } from "@/components/ui/button";
import AdminContactsSettings from "@/components/settings/contacts-section";
import AdminSocialsSettings from "@/components/settings/socials-section";

export default function AdminSettings() {
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

  const [isSaving, setIsSaving] = useState(false);
  const [contactHandles, setContactHandles] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/contacts");
        const data = await response.json();
        setContactHandles(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // In a real app, you would show a success notification here
    }, 1500);
  };

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {isSaving ? (
            "Saving..."
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Landing Page Settings */}
      <div className="bg-background p-6 rounded-md border mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Home className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold">Landing Page Settings</h2>
          <Link
            href="/admin/settings/landing-page"
            className="flex items-center gap-1 text-sm bg-primary text-primary-foreground py-1.5 px-3 rounded-md hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> Manage Images
          </Link>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Page Title
            </label>
            <input
              type="text"
              value={settings.landingPage.title}
              onChange={(e) =>
                handleChange("landingPage", "title", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Subtitle
            </label>
            <input
              type="text"
              value={settings.landingPage.subtitle}
              onChange={(e) =>
                handleChange("landingPage", "subtitle", e.target.value)
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">
              Featured Image URL
            </label>
            <input
              type="text"
              value={settings.landingPage.featuredImage}
              onChange={(e) =>
                handleChange("landingPage", "featuredImage", e.target.value)
              }
              className="w-full p-2 border rounded-md"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={settings.landingPage.ctaText}
                onChange={(e) =>
                  handleChange("landingPage", "ctaText", e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                CTA Button Link
              </label>
              <input
                type="text"
                value={settings.landingPage.ctaLink}
                onChange={(e) =>
                  handleChange("landingPage", "ctaLink", e.target.value)
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact Settings */}
      <AdminContactsSettings />

      {/* Social Media Handles */}
      <AdminSocialsSettings />
    </div>
  );
}
