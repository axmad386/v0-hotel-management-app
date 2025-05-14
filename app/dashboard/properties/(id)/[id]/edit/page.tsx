"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

// Sample data for properties
const propertiesData = [
  {
    id: "1",
    name: "Grand Hotel",
    type: "hotel",
    address: "123 Main St, New York, NY",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    rooms: 32,
    occupancy: "75%",
    status: "active",
    description: "A luxury hotel in the heart of New York City with modern amenities and exceptional service.",
    amenities: ["Pool", "Spa", "Restaurant", "Gym", "Conference Rooms", "Room Service"],
    images: ["/placeholder.svg?height=400&width=600"],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "City Boarding House",
    type: "boarding",
    address: "456 Park Ave, Boston, MA",
    city: "Boston",
    state: "MA",
    zipCode: "02108",
    country: "USA",
    rooms: 18,
    occupancy: "60%",
    status: "active",
    description: "A cozy boarding house in Boston offering affordable long-term stays for students and professionals.",
    amenities: ["Shared Kitchen", "Laundry", "Common Area", "Free WiFi", "Bike Storage"],
    images: ["/placeholder.svg?height=400&width=600"],
    createdAt: "2024-02-10",
  },
]

export default function EditPropertyPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    description: "",
    status: "",
  })

  useEffect(() => {
    // In a real app, this would fetch from an API
    const property = propertiesData.find((p) => p.id === params.id)
    if (property) {
      setFormData({
        name: property.name,
        type: property.type,
        address: property.address,
        city: property.city,
        state: property.state,
        zipCode: property.zipCode,
        country: property.country,
        description: property.description,
        status: property.status,
      })
    }
    setLoading(false)
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the property to the database
    // For demo purposes, we'll just redirect back to the property details page
    router.push(`/dashboard/properties/${params.id}`)
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/properties/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Edit Property</h1>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
            <CardDescription>Update the details of your property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Property Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter property name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)} required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="boarding">Boarding House</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Enter street address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="Enter state/province"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">Zip/Postal Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  placeholder="Enter zip/postal code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="Enter country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter property description"
                className="min-h-[100px]"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)} required>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select property status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/properties/${params.id}`}>Cancel</Link>
            </Button>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
