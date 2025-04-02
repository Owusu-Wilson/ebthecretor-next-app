'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Image as ImageIcon, X } from 'lucide-react'

type Category = {
  id: string
  name: string
}

export default function CreatePortfolioForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)

  // Form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    coverImage: '',
    categoryId: '',
    tags: ''
  })

  // Fetch categories on mount
  useState(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories')
        const data = await res.json()
        setCategories(data)
      } catch (err) {
        console.error('Failed to load categories', err)
      }
    }
    fetchCategories()
  })

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCoverImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
      setFormData({...formData, coverImage: file.name})
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/portfolios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error(await response.text())
      }

      const portfolio = await response.json()
      router.push(`/admin/portfolios/${portfolio.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create portfolio')
    } finally {
      setLoading(false)
    }
  }

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
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
        {/* Back button and title */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/admin/portfolios"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Portfolios
          </Link>
          <h1 className="text-3xl font-bold">Create Portfolio</h1>
        </div>

        {/* Form container */}
        <div className="bg-background rounded-md border p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  required
                />
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
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </div>

              {/* Cover Image */}
              <div>
                <label htmlFor="coverImage" className="block mb-2 text-sm font-medium">
                  Cover Image *
                </label>
                {coverImagePreview ? (
                  <div className="relative mb-4">
                    <img
                      src={coverImagePreview}
                      alt="Cover preview"
                      className="h-48 w-full object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCoverImagePreview(null)
                        setFormData({...formData, coverImage: ''})
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-md p-8 text-center">
                    <label
                      htmlFor="coverImage"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload cover image
                      </span>
                      <input
                        id="coverImage"
                        name="coverImage"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        required
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="categoryId" className="block mb-2 text-sm font-medium">
                  Category *
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block mb-2 text-sm font-medium">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                  placeholder="design, web, ui"
                />
              </div>
            </div>

            {/* Form actions */}
            <div className="flex justify-end gap-4">
              <Link
                href="/admin/portfolios"
                className="flex items-center px-4 py-2 rounded-md border hover:bg-muted"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? (
                  'Creating...'
                ) : (
                  <>
                    <Save className="mr-1 h-4 w-4" />
                    Create Portfolio
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