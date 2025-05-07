'use client'

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import {
  Edit,
  FileText,
  LogOut,
  Plus,
  Search,
  Trash2
} from "lucide-react";
import { User } from "@/app/types";

export default function AdminTeamMembers() {
  const { user, logout } = useAuth();
  const [teamMembers, setTeamMembers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setTeamMembers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run only once

  // Filter Team Members based on search query and filters
  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch = member.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRole = filterRole ? member.role === filterRole : true;
    
    return matchesSearch && matchesRole;
  });

  // Get unique roles for filter dropdown
  const roles = [...new Set(teamMembers.map((member) => member.role))];

  const handleDelete = async (id: string) => {
    try {
      // In a real app, you'd call an API to delete the user
      const updatedMembers = teamMembers.filter((member) => member.id !== id);
      setTeamMembers(updatedMembers);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return <div className="min-h-screen bg-muted/30 flex items-center justify-center">Loading...</div>;
  }

  return (
   
      <div className="min-h-screen bg-muted/30">
    

        <div className="container-kanik py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Team Members</h1>
            <Link
              href="/admin/team/new"
              className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
            >
              <Plus className="mr-1 h-4 w-4" />
              Create New User
            </Link>
          </div>

          {/* Search and filters */}
          <div className="bg-background p-4 rounded-md border mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  value={filterRole || ""}
                  onChange={(e) => setFilterRole(e.target.value || null)}
                >
                  <option value="">All Roles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
            
            </div>
          </div>

          {/* Team Members list */}
          <div className="bg-background rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    {/* <th className="text-left px-4 py-3 text-sm font-medium">ID</th> */}
                    <th className="text-left px-4 py-3 text-sm font-medium">Name</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Email</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Role</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Actions</th>
                   
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredMembers.map((teamMember) => (
                    <tr key={teamMember.id} className="hover:bg-muted/20">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 relative flex-shrink-0 mr-3">
                            <div className="bg-muted w-full h-full rounded-md flex items-center justify-center">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                            </div>
                          </div>
                          <div className="truncate max-w-xs">
                            <div className="font-medium truncate">{teamMember.name}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {teamMember.email}
                            </div>
                          </div>
                        </div>
                      </td>
                  
                      <td className="px-4 py-4">{teamMember.email}</td>
                 
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            teamMember.role === "user"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {teamMember.role}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2 relative">
                          <Link
                            href={`/admin/team/${teamMember.id}`}
                            className="p-1 rounded-md hover:bg-muted"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                          <button
                            onClick={() => setShowDeleteConfirm(teamMember.id)}
                            className="p-1 rounded-md hover:bg-muted"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete</span>
                          </button>

                          {showDeleteConfirm === teamMember.id && (
                            <div className="absolute right-0 top-8 z-10 w-56 bg-background rounded-md shadow-lg border p-2">
                              <p className="text-sm mb-2">Delete this user?</p>
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => setShowDeleteConfirm(null)}
                                  className="px-2 py-1 text-xs"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleDelete(teamMember.id)}
                                  className="px-2 py-1 text-xs bg-red-500 text-white rounded-md"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredMembers.length === 0 && (
              <div className="p-8 text-center">
                <div className="mb-2">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No users found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchQuery || filterRole
                    ? "Try adjusting your search or filters"
                    : "Add a Team Member to get started!"}
                </p>
                {!searchQuery && !filterRole &&(
                  <Link
                    href="/admin/team/new"
                    className="inline-block mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Create New User
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
   
  );
}
