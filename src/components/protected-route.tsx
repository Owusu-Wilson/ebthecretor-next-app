"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false
}: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Redirect to login if not authenticated
      router.push("/admin/login");
    } else if (!loading && adminOnly && user?.role !== "admin") {
      // Redirect to dashboard if not admin
      router.push("/admin/dashboard");
    }
  }, [loading, isAuthenticated, adminOnly, user, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full border-t-2 border-r-2 border-b-2 border-primary h-12 w-12"></div>
      </div>
    );
  }

  // Only render children if user is authenticated and has appropriate role
  if (!isAuthenticated) return null;
  if (adminOnly && user?.role !== "admin") return null;

  return <>{children}</>;
}
