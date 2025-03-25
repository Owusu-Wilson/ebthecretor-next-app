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
  LogOut
} from "lucide-react";

type StatCard = {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  change: string;
  trend: "up" | "down" | "neutral";
};

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<StatCard[]>([]);

  useEffect(() => {
    // Mock stats data - in a real app, this would come from an API
    setStats([
      {
        title: "Blog Posts",
        value: "48",
        description: "Total published posts",
        icon: <FileText className="h-8 w-8 text-blue-500" />,
        change: "+12%",
        trend: "up",
      },
      {
        title: "Portfolio Items",
        value: "24",
        description: "Case studies and projects",
        icon: <Image className="h-8 w-8 text-purple-500" />,
        change: "+8%",
        trend: "up",
      },
      {
        title: "Contact Messages",
        value: "156",
        description: "Total received messages",
        icon: <MessageSquare className="h-8 w-8 text-green-500" />,
        change: "-3%",
        trend: "down",
      },
      {
        title: "Team Members",
        value: "8",
        description: "Active team members",
        icon: <Users className="h-8 w-8 text-amber-500" />,
        change: "0%",
        trend: "neutral",
      },
    ]);
  }, []);

  const handleLogout = () => {
    logout();
    // No need to redirect, the ProtectedRoute will handle that
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
                href="/admin/portfolio"
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
              <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

              {/* Stats overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-background p-6 rounded-md border"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-muted-foreground text-sm">
                          {stat.title}
                        </p>
                        <h3 className="text-3xl font-bold">{stat.value}</h3>
                      </div>
                      <div>{stat.icon}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                      <div
                        className={`text-xs font-medium ${
                          stat.trend === "up"
                            ? "text-green-500"
                            : stat.trend === "down"
                            ? "text-red-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        {stat.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent activity */}
              <div className="bg-background p-6 rounded-md border mb-8">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b pb-4 last:border-0"
                    >
                      <div>
                        <h3 className="font-medium">
                          New blog post published: "The Role of Animation in Modern Web Design"
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {index === 0
                            ? "Today at 10:32 AM"
                            : index === 1
                            ? "Yesterday at 4:15 PM"
                            : "2 days ago at 1:45 PM"}
                        </p>
                      </div>
                      <Link
                        href="#"
                        className="text-sm text-accent hover:text-accent/80"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick actions */}
              <div className="bg-background p-6 rounded-md border">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link
                    href="/admin/posts/new"
                    className="bg-primary text-primary-foreground py-3 px-4 rounded-md text-center hover:bg-primary/90"
                  >
                    Create New Post
                  </Link>
                  <Link
                    href="/admin/portfolio/new"
                    className="bg-primary text-primary-foreground py-3 px-4 rounded-md text-center hover:bg-primary/90"
                  >
                    Add Portfolio Item
                  </Link>
                  <Link
                    href="/admin/team/new"
                    className="bg-primary text-primary-foreground py-3 px-4 rounded-md text-center hover:bg-primary/90"
                  >
                    Add Team Member
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
