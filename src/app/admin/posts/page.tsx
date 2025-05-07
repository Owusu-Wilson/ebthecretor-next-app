"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/protected-route";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import {
  Edit,
  FileText,
  Image as ImageIcon,
  LogOut,
  MoreHorizontal,
  Plus,
  Search,
  Trash2
} from "lucide-react";

// Mocked blog post data - in a real app, this would come from an API
const MOCK_POSTS = [
  {
    id: 1,
    title: "Behind the Scenes: A Day in the Life of a Creative Agency",
    category: "Agency Life",
    status: "published",
    author: "Ryan Parker",
    date: "2023-03-15",
    excerpt: "Take a peek behind the curtain and discover what a typical day looks like at Kanik...",
    image: "https://ext.same-assets.com/969822492/4253944231.jpeg",
  },
  {
    id: 2,
    title: "Why Branding is More Than Just a Logo",
    category: "Branding",
    status: "published",
    author: "Laura Chen",
    date: "2023-04-03",
    excerpt: "In this article, we explore the multifaceted nature of branding and why it encompasses far more than...",
    image: "https://ext.same-assets.com/979205381/4253944231.jpeg",
  },
  {
    id: 3,
    title: "How to Create a Seamless User Experience Across All Platforms",
    category: "UX Design",
    status: "published",
    author: "Michael Rodriguez",
    date: "2023-05-21",
    excerpt: "Consistency is key when it comes to user experience. Learn how to create a cohesive experience...",
    image: "https://ext.same-assets.com/969822492/2180965551.jpeg",
  },
  {
    id: 4,
    title: "Building a Brand That Connects: Key Strategies for Success",
    category: "Branding",
    status: "draft",
    author: "Sarah Johnson",
    date: "2023-06-12",
    excerpt: "Emotional connection is what separates good brands from great ones. Discover strategies to create...",
    image: "https://ext.same-assets.com/979205381/2180965551.jpeg",
  },
  {
    id: 5,
    title: "The Role of Animation in Modern Web Design",
    category: "Web Design",
    status: "published",
    author: "David Lee",
    date: "2023-07-08",
    excerpt: "From subtle micro-interactions to eye-catching page transitions, animation has become an essential part...",
    image: "https://ext.same-assets.com/979205381/3829689281.jpeg",
  },
];

export default function AdminPosts() {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  // Filter posts based on search query and filters
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory ? post.category === filterCategory : true;
    const matchesStatus = filterStatus ? post.status === filterStatus : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories for filter dropdown
  const categories = [...new Set(posts.map((post) => post.category))];

  const handleDelete = (id: number) => {
    // In a real app, you'd call an API to delete the post
    setPosts(posts.filter((post) => post.id !== id));
    setShowDeleteConfirm(null);
  };

  const handleLogout = () => {
    logout();
  };

  return (
   
      <div className="min-h-screen bg-muted/30">
      

        <div className="container-kanik py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Blog Posts</h1>
            <Link
              href="/admin/posts/new"
              className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
            >
              <Plus className="mr-1 h-4 w-4" />
              Create New Post
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
                  placeholder="Search posts..."
                  className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  value={filterCategory || ""}
                  onChange={(e) => setFilterCategory(e.target.value || null)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-48">
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  value={filterStatus || ""}
                  onChange={(e) => setFilterStatus(e.target.value || null)}
                >
                  <option value="">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Posts list */}
          <div className="bg-background rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium">Title</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Category</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Author</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Date</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-muted/20">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 relative flex-shrink-0 mr-3">
                            <div className="bg-muted w-full h-full rounded-md flex items-center justify-center">
                              <FileText className="h-5 w-5 text-muted-foreground" />
                            </div>
                          </div>
                          <div className="truncate max-w-xs">
                            <div className="font-medium truncate">{post.title}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {post.excerpt}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">{post.category}</td>
                      <td className="px-4 py-4">{post.author}</td>
                      <td className="px-4 py-4">{new Date(post.date).toLocaleDateString()}</td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            post.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2 relative">
                          <Link
                            href={`/admin/posts/edit/${post.id}`}
                            className="p-1 rounded-md hover:bg-muted"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                          <button
                            onClick={() => setShowDeleteConfirm(post.id)}
                            className="p-1 rounded-md hover:bg-muted"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                            <span className="sr-only">Delete</span>
                          </button>

                          {showDeleteConfirm === post.id && (
                            <div className="absolute right-0 top-8 z-10 w-56 bg-background rounded-md shadow-lg border p-2">
                              <p className="text-sm mb-2">Delete this post?</p>
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => setShowDeleteConfirm(null)}
                                  className="px-2 py-1 text-xs"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleDelete(post.id)}
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
            {filteredPosts.length === 0 && (
              <div className="p-8 text-center">
                <div className="mb-2">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No posts found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {searchQuery || filterCategory || filterStatus
                    ? "Try adjusting your search or filters"
                    : "Create your first blog post to get started"}
                </p>
                {!searchQuery && !filterCategory && !filterStatus && (
                  <Link
                    href="/admin/posts/new"
                    className="inline-block mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Create New Post
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
  
  );
}
