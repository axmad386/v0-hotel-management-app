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

export default function NewPropertyPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    description: "",
  })

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
    // For demo purposes, we'll just redirect back to the properties page
    router.push("/dashboard/properties")
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/properties">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Add New Property</h1>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Property Information</CardTitle>
            <CardDescription>Enter the details of your new property</CardDescription>
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
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/properties">Cancel</Link>
            </Button>
            <Button type="submit">Create Property</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
