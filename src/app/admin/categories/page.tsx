'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Edit, Trash2, Plus, Search } from 'lucide-react'

type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  portfolios: { id: string }[]
}

export default function CategoryListPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories?withCount=true')
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Delete category
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/categories/${id}`, {
        method: 'DELETE'
      })
      setCategories(categories.filter(c => c.id !== id))
      console.log(categories)
      setDeleteConfirm(null)
    } catch (error) {
      console.error('Failed to delete category:', error)
    }
  }

  // Filter categories
  if (categories){}
  const filteredCategories = categories.filter(category => {
    return category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           category.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
           category.description?.toLowerCase().includes(searchQuery.toLowerCase())
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        Loading categories...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b">
        <div className="container-kanik flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="font-bold text-xl">
              Kanik Admin
            </Link>
          </div>
        </div>
      </header>

      <div className="container-kanik py-8">
        {/* Title and Actions */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Categories</h1>
          <Link
            href="/admin/categories/new"
            className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add New
          </Link>
        </div>

        {/* Search */}
        <div className="bg-background p-4 rounded-md border mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search categories..."
              className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Table */}
        <div className="bg-background rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium">Name</th>
                  <th className="text-left px-4 py-3 text-sm font-medium">Slug</th>
                  {/* <th className="text-left px-4 py-3 text-sm font-medium">Portfolios</th> */}
                  <th className="text-left px-4 py-3 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-muted/20">
                    <td className="px-4 py-4 font-medium">{category.name}</td>
                    <td className="px-4 py-4 text-muted-foreground">{category.slug}</td>
                    {/* <td className="px-4 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                        {category.portfolios.length} portfolios
                      </span>
                    </td> */}
                    <td className="px-4 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/admin/categories/edit/${category.id}`}
                          className="p-1 rounded-md hover:bg-muted"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteConfirm(category.id)}
                          className="p-1 rounded-md hover:bg-muted text-red-500"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <div className="p-8 text-center">
              <div className="mb-4">
                <Search className="h-12 w-12 mx-auto text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No categories found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "Create your first category to get started"}
              </p>
              {!searchQuery && (
                <Link
                  href="/admin/categories/new"
                  className="inline-block mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Create Category
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-md max-w-md w-full">
              <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to delete this category? Portfolios using this category won't be deleted but will need to be reassigned.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 rounded-md border hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}