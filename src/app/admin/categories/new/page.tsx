'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'

interface PageProps {
  params: Promise<{ id?: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}


export default function CategoryForm({ params }: PageProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [formLoading, setFormLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state - matches your DB schema exactly
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  })

  // Fetch category data if in edit mode
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { id } = await params
        if (!id) return

        const res = await fetch(`/api/categories/${id}`)
        if (!res.ok) throw new Error('Failed to fetch category')
        const data = await res.json()
        setFormData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load category')
      } finally {
        setLoading(false)
      }
    }

    fetchCategory()
  }, [params])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    setError(null)

    try {
      const { id } = await params
      const url = id 
        ? `/api/categories/${id}`
        : '/api/categories'
      const method = id ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Failed to save category')
      }

      router.push('/admin/categories')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setFormLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Auto-generate slug when name changes (create mode only)
    if (name === 'name' && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
      }))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading category data...</div>
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
        {/* Back + Title */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/categories"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Categories
          </Link>
          <h1 className="text-3xl font-bold">
            {formData.slug ? 'Edit Category' : 'Create Category'}
          </h1>
        </div>

        {/* Form */}
        <div className="bg-background rounded-md border p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6">
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  required
                  placeholder="e.g. Web Design"
                />
              </div>

              {/* Slug field */}
              <div>
                <label htmlFor="slug" className="block mb-2 text-sm font-medium">
                  Slug *
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 font-mono text-sm"
                  required
                  placeholder="e.g. web-design"
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  URL-friendly identifier. Must be unique.
                </p>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block mb-2 text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Optional category description..."
                />
              </div>
            </div>

            {/* Form actions */}
            <div className="flex justify-end gap-4">
              <Link
                href="/admin/categories"
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
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    <Save className="mr-1 h-4 w-4" />
                    {formData.slug ? 'Update' : 'Create'} Category
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
