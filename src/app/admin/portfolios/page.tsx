'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Edit, Trash2, Plus, Search } from 'lucide-react'

type Portfolio = {
  id: string
  title: string
  description: string | null
  coverImage: string
  tags: string
  category: {
    id: string
    name: string
  }
  files: {
    id: string
    url: string
  }[]
}

export default function PortfolioListPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // Fetch portfolios
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await fetch('/api/portfolios')
        const data = await response.json()
        setPortfolios(data)
      } catch (error) {
        console.error('Failed to fetch portfolios:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolios()
  }, [])

  // Delete portfolio
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/portfolios/${id}`, {
        method: 'DELETE'
      })
      setPortfolios(portfolios.filter(p => p.id !== id))
      setDeleteConfirm(null)
    } catch (error) {
      console.error('Failed to delete portfolio:', error)
    }
  }

  // Filter portfolios
  const filteredPortfolios = portfolios.filter(portfolio => {
    const matchesSearch = portfolio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         portfolio.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         portfolio.tags.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        Loading portfolios...
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
          <h1 className="text-3xl font-bold">Portfolios</h1>
          <Link
            href="/admin/portfolios/new"
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
              placeholder="Search portfolios..."
              className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolios.map((portfolio) => (
            <div key={portfolio.id} className="bg-background rounded-md border overflow-hidden hover:shadow-md transition-shadow">
              {/* Cover Image */}
              <div className="h-48 bg-muted/50 relative overflow-hidden">
                <img
                  src={portfolio.coverImage}
                  alt={portfolio.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium">{portfolio.title}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {portfolio.category.name}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {portfolio.description}
                </p>

                {/* Tags */}
                {portfolio.tags && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {portfolio.tags.split(',').map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/portfolios/${portfolio.id}`}
                    className="p-2 rounded-md hover:bg-muted"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => setDeleteConfirm(portfolio.id)}
                    className="p-2 rounded-md hover:bg-muted text-red-500"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPortfolios.length === 0 && (
          <div className="bg-background rounded-md border p-8 text-center">
            <div className="mb-4">
              <Search className="h-12 w-12 mx-auto text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No portfolios found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {searchQuery
                ? "Try adjusting your search query"
                : "Create your first portfolio to get started"}
            </p>
            {!searchQuery && (
              <Link
                href="/admin/portfolios/new"
                className="inline-block mt-4 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Create Portfolio
              </Link>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background p-6 rounded-md max-w-md w-full">
              <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
              <p className="text-muted-foreground mb-6">
                Are you sure you want to delete this portfolio? This action cannot be undone.
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