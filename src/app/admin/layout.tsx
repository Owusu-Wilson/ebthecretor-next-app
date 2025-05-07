"use client";

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
  ListIcon
} from "lucide-react";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-muted/30">
        {/* Admin header */}
        <header className="bg-background border-b">
          <div className="container-kanik flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="font-bold text-xl">
                Kanik Admin
              </Link>
              <span className="text-sm text-muted-foreground">
                Welcome back, {user?.name}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <LogOut className="mr-1 h-4 w-4" />
              Logout
            </button>
          </div>
        </header>

        <div className="container-kanik py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar navigation */}
            <aside className="w-full lg:w-64 space-y-1">
              <div className="text-sm font-medium text-muted-foreground mb-4">
                CONTENT MANAGEMENT
              </div>
              <Link
                href="/admin/posts"
                className="flex items-center justify-between p-3 rounded-md bg-background border hover:bg-muted/50"
              >
                <div className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Blog Posts</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>

              <Link
                href="/admin/categories"
                className="flex items-center justify-between p-3 rounded-md bg-background border hover:bg-muted/50"
              >
                <div className="flex items-center">
                  <ListIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Portfolio Categories</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              
              <Link
                href="/admin/portfolios"
                className="flex items-center justify-between p-3 rounded-md bg-background border hover:bg-muted/50"
              >
                <div className="flex items-center">
                  <Image className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Portfolio</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            
              <Link
                href="/admin/team"
                className="flex items-center justify-between p-3 rounded-md bg-background border hover:bg-muted/50"
              >
                <div className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Team Members</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link
                href="/admin/messages"
                className="flex items-center justify-between p-3 rounded-md bg-background border hover:bg-muted/50"
              >
                <div className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Messages</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center justify-between p-3 rounded-md bg-background border hover:bg-muted/50"
              >
                <div className="flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Settings</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </aside>

            {/* Main content */}
            <main className="flex-1">
              {children}

             
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
