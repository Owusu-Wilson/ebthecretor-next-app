'use client'

import { useState, useEffect, use } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/protected-route';
import Link from 'next/link';
import { ArrowLeft, LogOut, Save } from 'lucide-react';

export default function EditUserForm() {
  const { user: currentUser, logout } = useAuth();
  const router = useRouter();
  const { id: userId } = useParams(); // ✅ Correct way to get params
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user' as const,
  });

  // Fetch user data on mount
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const userData = await response.json();
        setFormData({
          name: userData.name,
          email: userData.email,
          role: userData.role,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Use userId as dependency

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setFormLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      router.push('/admin/team');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
    } finally {
      setFormLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      
        <div className="min-h-screen bg-muted/30 flex items-center justify-center">
          Loading...
        </div>
      
    );
  }

  return (
   
      <div className="min-h-screen bg-muted/30">


        <div className="container-kanik py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/admin/team"
              className="flex items-center text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Team
            </Link>
            <h1 className="text-3xl font-bold">Edit User</h1>
          </div>

          <div className="bg-background rounded-md border p-6">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              <div className="grid gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block mb-2 text-sm font-medium">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Link
                  href="/admin/team"
                  className="flex items-center px-4 py-2 rounded-md border hover:bg-muted"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
                >
                  {formLoading ? (
                    'Saving...'
                  ) : (
                    <>
                      <Save className="mr-1 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
   
  );
}