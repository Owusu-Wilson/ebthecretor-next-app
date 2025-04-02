'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'

type Portfolio = {
  id: string
  title: string
  description: string
  coverImage: string
  tags: string
  category: {
    id: string
    name: string
  }
  files: {
    id: string
    url: string
    name: string
    type: string
  }[]
}

export default function PortfolioViewPage() {
  const { id } = useParams()
  const router = useRouter()
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  // Fetch portfolio data
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`/api/portfolios/${id}`)
        if (!response.ok) throw new Error('Portfolio not found')
        const data = await response.json()
        setPortfolio(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load portfolio')
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolio()
  }, [id])

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/portfolios/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete')
      router.push('/admin/portfolios')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deletion failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="animate-pulse">Loading portfolio...</div>
      </div>
    )
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-red-500">{error || 'Portfolio not found'}</div>
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
        {/* Back button and title */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/admin/portfolios"
            className="flex items-center text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Portfolios
          </Link>
          <div className="flex gap-2">
            <Link
              href={`/admin/portfolios/edit/${id}`}
              className="flex items-center px-3 py-1 rounded-md border hover:bg-muted"
            >
              <Edit className="mr-1 h-4 w-4" />
              Edit
            </Link>
            <button
              onClick={() => setDeleteConfirm(true)}
              className="flex items-center px-3 py-1 rounded-md border hover:bg-red-50 text-red-500"
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Portfolio content */}
        <div className="bg-background rounded-md border overflow-hidden">
          {/* Cover image */}
          <div className="h-64 w-full bg-muted/50 relative overflow-hidden">
            <img
              src={portfolio.coverImage}
              alt={portfolio.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left column */}
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold mb-2">{portfolio.title}</h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {portfolio.category.name}
                  </span>
                  {portfolio.tags.split(',').map((tag, i) => (
                    <span key={i} className="text-sm px-2 py-1 rounded-full bg-muted text-muted-foreground">
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                <div className="prose max-w-none">
                  <p className="whitespace-pre-line">{portfolio.description}</p>
                </div>
              </div>

              {/* Right column - files */}
              <div className="md:w-1/3">
                <h3 className="text-lg font-medium mb-4">Files</h3>
                <div className="space-y-3">
                  {portfolio.files.map((file) => (
                    <div key={file.id} className="p-3 border rounded-md hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {file.type.startsWith('image/') ? (
                            <img 
                              src={file.url} 
                              alt={file.name}
                              className="h-12 w-12 object-cover rounded-md"
                            />
                          ) : (
                            <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center">
                              <span className="text-xs">FILE</span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          {/* <p className="text-xs text-muted-foreground">
                            {file.type} • {(file.size / 1024).toFixed(1)}KB
                          </p> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background p-6 rounded-md max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete "{portfolio.title}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirm(false)}
                className="px-4 py-2 rounded-md border hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Delete Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}