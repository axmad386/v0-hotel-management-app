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

// Sample data for rooms
const roomsData = [
  {
    id: "1",
    number: "101",
    type: "Standard",
    property: "Grand Hotel",
    propertyId: "1",
    capacity: 2,
    rate: "120",
    status: "occupied",
    amenities: ["TV", "WiFi", "Air Conditioning", "Mini Bar"],
    description: "Comfortable standard room with a queen-sized bed and city view.",
    size: "30",
    bedType: "Queen",
    maxOccupancy: 2,
    images: ["/placeholder.svg?height=400&width=600"],
    lastCleaned: "2025-05-14",
    currentGuest: "John Smith",
    checkIn: "2025-05-12",
    checkOut: "2025-05-15",
  },
  {
    id: "2",
    number: "102",
    type: "Standard",
    property: "Grand Hotel",
    propertyId: "1",
    capacity: 2,
    rate: "120",
    status: "available",
    amenities: ["TV", "WiFi", "Air Conditioning", "Mini Bar"],
    description: "Comfortable standard room with a queen-sized bed and garden view.",
    size: "30",
    bedType: "Queen",
    maxOccupancy: 2,
    images: ["/placeholder.svg?height=400&width=600"],
    lastCleaned: "2025-05-14",
    currentGuest: null,
    checkIn: null,
    checkOut: null,
  },
]

export default function EditRoomPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    number: "",
    type: "",
    propertyId: "",
    capacity: "",
    rate: "",
    status: "",
    description: "",
    size: "",
    bedType: "",
    maxOccupancy: "",
  })

  useEffect(() => {
    // In a real app, this would fetch from an API
    const room = roomsData.find((r) => r.id === params.id)
    if (room) {
      setFormData({
        number: room.number,
        type: room.type,
        propertyId: room.propertyId,
        capacity: room.capacity.toString(),
        rate: room.rate,
        status: room.status,
        description: room.description,
        size: room.size,
        bedType: room.bedType,
        maxOccupancy: room.maxOccupancy.toString(),
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
    // In a real app, this would save the room to the database
    // For demo purposes, we'll just redirect back to the room details page
    router.push(`/dashboard/rooms/${params.id}`)
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/rooms/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Edit Room</h1>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Room Information</CardTitle>
            <CardDescription>Update the details of your room</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="number">Room Number</Label>
                <Input
                  id="number"
                  name="number"
                  placeholder="Enter room number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Room Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)} required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Deluxe">Deluxe</SelectItem>
                    <SelectItem value="Suite">Suite</SelectItem>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Double">Double</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="propertyId">Property</Label>
                <Select
                  value={formData.propertyId}
                  onValueChange={(value) => handleSelectChange("propertyId", value)}
                  required
                >
                  <SelectTrigger id="propertyId">
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Grand Hotel</SelectItem>
                    <SelectItem value="2">City Boarding House</SelectItem>
                    <SelectItem value="3">Beach Resort</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  placeholder="Enter capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate">Rate ($ per night)</Label>
                <Input
                  id="rate"
                  name="rate"
                  type="number"
                  placeholder="Enter rate"
                  value={formData.rate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)} required>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="occupied">Occupied</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="size">Size (sqm)</Label>
                <Input
                  id="size"
                  name="size"
                  type="number"
                  placeholder="Enter size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedType">Bed Type</Label>
                <Select
                  value={formData.bedType}
                  onValueChange={(value) => handleSelectChange("bedType", value)}
                  required
                >
                  <SelectTrigger id="bedType">
                    <SelectValue placeholder="Select bed type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Twin">Twin</SelectItem>
                    <SelectItem value="Double">Double</SelectItem>
                    <SelectItem value="Queen">Queen</SelectItem>
                    <SelectItem value="King">King</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxOccupancy">Max Occupancy</Label>
                <Input
                  id="maxOccupancy"
                  name="maxOccupancy"
                  type="number"
                  placeholder="Enter max occupancy"
                  value={formData.maxOccupancy}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter room description"
                className="min-h-[100px]"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/rooms/${params.id}`}>Cancel</Link>
            </Button>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
