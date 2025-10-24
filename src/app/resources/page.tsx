'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import {
  Search,
  Filter,
  Star,
  Eye,
  Download,
  Calendar,
  MapPin,
  DollarSign,
  Filter as FilterIcon,
  Package,
  Building,
  Truck,
  Users,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import SourcekomAgent from '@/components/agent/SourcekomAgent'

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchResources()
  }, [searchQuery, selectedCategory, selectedPriceRange, sortBy])

  const fetchResources = async () => {
    setLoading(true)
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      const mockResources = [
        {
          id: 1,
          title: 'Professional Office Space',
          description: 'Fully equipped office space in Riyadh CBD. Perfect for startups and small businesses.',
          category: 'office-space',
          price: 2500,
          isFree: false,
          location: 'Riyadh',
          rating: 4.8,
          reviews: 34,
          availability: 'Available now',
          owner: 'Business Center LLC',
          thumbnail: '/office-space.jpg'
        },
        {
          id: 2,
          title: 'Transportation Fleet Management System',
          description: 'Complete fleet management software with GPS tracking and analytics.',
          category: 'software',
          price: 0,
          isFree: true,
          location: 'Jeddah',
          rating: 4.6,
          reviews: 28,
          availability: 'Available',
          owner: 'Tech Solutions Inc',
          thumbnail: '/fleet-management.jpg'
        },
        {
          id: 3,
          title: 'Legal Compliance Toolkit',
          description: 'Comprehensive toolkit for Saudi Arabian legal compliance and documentation.',
          category: 'legal',
          price: 800,
          isFree: false,
          location: 'Online',
          rating: 4.9,
          reviews: 56,
          availability: 'Available',
          owner: 'Legal Experts Co',
          thumbnail: '/legal-toolkit.jpg'
        },
        {
          id: 4,
          title: 'Warehouse Storage Facilities',
          description: 'Climate-controlled warehouse space with 24/7 security and loading docks.',
          category: 'storage',
          price: 1500,
          isFree: false,
          location: 'Dammam',
          rating: 4.7,
          reviews: 23,
          availability: 'Limited availability',
          owner: 'Logistics Hub',
          thumbnail: '/warehouse.jpg'
        },
        {
          id: 5,
          title: 'Business Consulting Templates',
          description: 'Professional templates for business proposals, presentations, and reports.',
          category: 'templates',
          price: 0,
          isFree: true,
          location: 'Online',
          rating: 4.5,
          reviews: 67,
          availability: 'Available',
          owner: 'Consulting Masters',
          thumbnail: '/templates.jpg'
        },
        {
          id: 6,
          title: 'Heavy Equipment Rental',
          description: 'Construction and industrial equipment rental with delivery and maintenance.',
          category: 'equipment',
          price: 3500,
          isFree: false,
          location: 'Riyadh',
          rating: 4.4,
          reviews: 19,
          availability: 'Available',
          owner: 'Equipment Pro',
          thumbnail: '/heavy-equipment.jpg'
        }
      ]

      setResources(mockResources)
    } catch (error) {
      console.error('Failed to fetch resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesPrice = selectedPriceRange === 'all' ||
                        (selectedPriceRange === 'free' && resource.isFree) ||
                        (selectedPriceRange === 'paid' && !resource.isFree) ||
                        (selectedPriceRange === 'low' && resource.price <= 1000) ||
                        (selectedPriceRange === 'medium' && resource.price > 1000 && resource.price <= 3000) ||
                        (selectedPriceRange === 'high' && resource.price > 3000)

    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
      default:
        return b.id - a.id
    }
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'office-space':
        return Building
      case 'software':
        return Package
      case 'legal':
        return FileText
      case 'storage':
        return Building
      case 'templates':
        return Package
      case 'equipment':
        return Truck
      default:
        return Package
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">SourceKom</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link href="/upload">Upload Resource</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Resource Marketplace</h1>
          <p className="text-muted-foreground text-lg">
            Browse and share business resources across Saudi Arabia
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <FilterIcon className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="office-space">Office Space</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="legal">Legal Services</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                  <SelectItem value="templates">Templates</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                <SelectTrigger className="w-[160px]">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="low">SAR ≤ 1000</SelectItem>
                  <SelectItem value="medium">SAR 1000-3000</SelectItem>
                  <SelectItem value="high">SAR > 3000</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedResources.map((resource) => {
            const Icon = getCategoryIcon(resource.category)
            return (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                  {resource.thumbnail ? (
                    <img
                      src={resource.thumbnail}
                      alt={resource.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                      <Icon className="w-12 h-12 text-primary" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2 mb-2">
                        {resource.title}
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{resource.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current text-yellow-500" />
                          <span>{resource.rating}</span>
                          <span>({resource.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={resource.isFree ? "secondary" : "default"}>
                      {resource.isFree ? "Free" : `SAR ${resource.price}`}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-3">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Availability</span>
                      <Badge variant={resource.availability.includes('Available') ? "default" : "secondary"}>
                        {resource.availability}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Owner:</span>
                      <span className="font-medium">{resource.owner}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href={`/resources/${resource.slug}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                      </Button>
                      <Button className="flex-1" asChild>
                        <Link href={`/resources/${resource.slug}?booking=true`}>
                          Book Now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {sortedResources.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button asChild>
              <Link href="/resources">View All Resources</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
