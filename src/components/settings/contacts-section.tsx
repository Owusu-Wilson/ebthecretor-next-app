"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import {
  ChevronRight,
  FileText,
  Image,
  MessageSquare,
  Settings,
  Users,
  LogOut,
  ListIcon,
  Home,
  Mail,
  Share2,
  Save,
  LucideDribbble,
  LucideFacebook,
  LucideInstagram,
  LucideTwitter,
  Plus,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type ContactInfo = {
  id: number;
  type: string;
  value: string;
  label: string;
};

export default function AdminContactsSettings() {
  const { user, logout } = useAuth();
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState({
    type: "email",
    value: "",
    label: "",
  });

  // Fetch contact handles
  useEffect(() => {
    const fetchContactHandles = async () => {
      try {
        const response = await fetch("/api/contacts");
        const data = await response.json();
        setContactHandles(data);
      } catch (error) {
        console.error("Failed to fetch contact handles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactHandles();
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

  const handleAddContact = async () => {
    if (newContact.value.trim() && newContact.label.trim()) {
      try {
        const response = await fetch("/api/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newContact),
        });

        if (response.ok) {
          const createdContact = await response.json();
          setContactHandles([...contactHandles, createdContact]);
          setNewContact({ type: "email", value: "", label: "" });
          setIsModalOpen(false);
        }
      } catch (error) {
        console.error("Failed to add contact:", error);
      }
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // In a real app, you would show a success notification here
    }, 1500);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-background p-6 rounded-md border mb-8">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="h-5 w-5 text-green-500" />
        <h2 className="text-xl font-semibold">Contact Settings</h2>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 text-sm bg-primary text-primary-foreground py-1.5 px-3 rounded-md hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" /> Add Contact Info
        </Button>
      </div>

      {/* Existing contact methods list */}
      <div className="space-y-4">
        {contactHandles.map((contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
          >
            <div>
              <span className="font-medium capitalize">{contact.type}: </span>
              <span>{contact.label}</span>
              <div className="text-sm text-muted-foreground">
                {contact.value}
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </div>
        ))}
      </div>

      {/* Modal for adding new contact */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-md w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add Contact Method</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Contact Type
                </label>
                <select
                  value={newContact.type}
                  onChange={(e) =>
                    setNewContact({ ...newContact, type: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="address">Address</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={newContact.label}
                  onChange={(e) =>
                    setNewContact({ ...newContact, label: e.target.value })
                  }
                  placeholder="e.g. 'Support Email'"
                  className="w-full p-2 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">
                  {newContact.type === "email"
                    ? "Email Address"
                    : newContact.type === "phone"
                    ? "Phone Number"
                    : "Address Details"}
                </label>
                {newContact.type === "address" ? (
                  <textarea
                    value={newContact.value}
                    onChange={(e) =>
                      setNewContact({ ...newContact, value: e.target.value })
                    }
                    className="w-full p-2 border rounded-md"
                    rows={3}
                  />
                ) : (
                  <input
                    type={newContact.type === "email" ? "email" : "text"}
                    value={newContact.value}
                    onChange={(e) =>
                      setNewContact({ ...newContact, value: e.target.value })
                    }
                    className="w-full p-2 border rounded-md"
                  />
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAddContact}
                  disabled={
                    !newContact.value.trim() || !newContact.label.trim()
                  }
                >
                  Add Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
