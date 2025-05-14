"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewRoomPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    number: "",
    type: "",
    propertyId: "",
    capacity: "2",
    rate: "",
    status: "available",
    description: "",
    size: "",
    bedType: "",
    maxOccupancy: "2",
    amenities: [] as string[],
  })

  const amenitiesList = [
    { id: "tv", label: "TV" },
    { id: "wifi", label: "WiFi" },
    { id: "ac", label: "Air Conditioning" },
    { id: "minibar", label: "Mini Bar" },
    { id: "safe", label: "Safe" },
    { id: "desk", label: "Work Desk" },
    { id: "bathtub", label: "Bathtub" },
    { id: "shower", label: "Shower" },
    { id: "hairdryer", label: "Hair Dryer" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenityId],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        amenities: prev.amenities.filter((id) => id !== amenityId),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the room to the database
    // For demo purposes, we'll just redirect back to the rooms page
    router.push("/dashboard/rooms")
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/rooms">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Add New Room</h1>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Room Information</CardTitle>
            <CardDescription>Enter the details of your new room</CardDescription>
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
            <div className="space-y-2">
              <Label>Amenities</Label>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {amenitiesList.map((amenity) => (
                  <div key={amenity.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`amenity-${amenity.id}`}
                      checked={formData.amenities.includes(amenity.id)}
                      onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                    />
                    <label
                      htmlFor={`amenity-${amenity.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {amenity.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/rooms">Cancel</Link>
            </Button>
            <Button type="submit">Create Room</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
