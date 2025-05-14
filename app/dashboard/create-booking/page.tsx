"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, Plus, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function NewBookingPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("guest")
  const [formData, setFormData] = useState({
    guestId: "",
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    propertyId: "",
    roomTypeId: "",
    roomId: "",
    checkIn: "",
    checkOut: "",
    adults: "1",
    children: "0",
    paymentStatus: "pending",
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGuest, setSelectedGuest] = useState<any>(null)

  // Sample data for guests
  const guests = [
    { id: "1", name: "John Smith", email: "john@example.com", phone: "123-456-7890" },
    { id: "2", name: "Jane Doe", email: "jane@example.com", phone: "234-567-8901" },
    { id: "3", name: "Robert Johnson", email: "robert@example.com", phone: "345-678-9012" },
    { id: "4", name: "Emily Wilson", email: "emily@example.com", phone: "456-789-0123" },
  ]

  // Sample data for room types
  const roomTypes = [
    { id: "1", name: "Standard", property: "Grand Hotel", capacity: 2, rate: "$120" },
    { id: "2", name: "Deluxe", property: "Grand Hotel", capacity: 3, rate: "$180" },
    { id: "3", name: "Suite", property: "Grand Hotel", capacity: 4, rate: "$250" },
    { id: "4", name: "Single", property: "City Boarding House", capacity: 1, rate: "$50" },
    { id: "5", name: "Double", property: "City Boarding House", capacity: 2, rate: "$80" },
  ]

  // Sample data for available rooms
  const availableRooms = [
    { id: "1", number: "102", type: "Standard", property: "Grand Hotel", status: "available" },
    { id: "2", number: "105", type: "Standard", property: "Grand Hotel", status: "available" },
    { id: "3", number: "202", type: "Deluxe", property: "Grand Hotel", status: "available" },
    { id: "4", number: "A3", type: "Single", property: "City Boarding House", status: "available" },
    { id: "5", number: "B2", type: "Double", property: "City Boarding House", status: "available" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGuestSelect = (guest: any) => {
    setSelectedGuest(guest)
    setFormData((prev) => ({
      ...prev,
      guestId: guest.id,
      guestName: guest.name,
      guestEmail: guest.email,
      guestPhone: guest.phone,
    }))
    setActiveTab("booking")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the booking to the database
    // For demo purposes, we'll just redirect back to the bookings page
    router.push("/dashboard/bookings")
  }

  const filteredGuests = searchQuery
    ? guests.filter(
        (guest) =>
          guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guest.phone.includes(searchQuery),
      )
    : guests

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/bookings">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Create New Booking</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Booking Information</CardTitle>
          <CardDescription>Create a new booking by selecting a guest, room, and dates</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="guest">Guest</TabsTrigger>
              <TabsTrigger value="booking">Booking Details</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>
            <TabsContent value="guest" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search guests..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/create-guest">
                      <Plus className="mr-2 h-4 w-4" />
                      New Guest
                    </Link>
                  </Button>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGuests.length > 0 ? (
                        filteredGuests.map((guest) => (
                          <TableRow key={guest.id}>
                            <TableCell className="font-medium">{guest.name}</TableCell>
                            <TableCell>{guest.email}</TableCell>
                            <TableCell>{guest.phone}</TableCell>
                            <TableCell>
                              <Button size="sm" onClick={() => handleGuestSelect(guest)}>
                                Select
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="h-24 text-center">
                            No guests found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="booking" className="space-y-4 pt-4">
              <form className="space-y-4">
                {selectedGuest && (
                  <div className="rounded-md border p-4">
                    <div className="font-medium">Selected Guest</div>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Name</div>
                        <div>{selectedGuest.name}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Email</div>
                        <div>{selectedGuest.email}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Phone</div>
                        <div>{selectedGuest.phone}</div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                  <div className="space-y-2">
                    <Label htmlFor="roomTypeId">Room Type</Label>
                    <Select
                      value={formData.roomTypeId}
                      onValueChange={(value) => handleSelectChange("roomTypeId", value)}
                      required
                    >
                      <SelectTrigger id="roomTypeId">
                        <SelectValue placeholder="Select room type" />
                      </SelectTrigger>
                      <SelectContent>
                        {roomTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name} - {type.property} ({type.rate}/night)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Available Rooms</Label>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Room #</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Property</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {availableRooms.map((room) => (
                          <TableRow key={room.id}>
                            <TableCell className="font-medium">{room.number}</TableCell>
                            <TableCell>{room.type}</TableCell>
                            <TableCell>{room.property}</TableCell>
                            <TableCell>
                              <Badge variant="default">Available</Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant={formData.roomId === room.id ? "default" : "outline"}
                                onClick={() => handleSelectChange("roomId", room.id)}
                              >
                                {formData.roomId === room.id ? "Selected" : "Select"}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="checkIn">Check-in Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="checkIn"
                        name="checkIn"
                        type="date"
                        className="pl-8"
                        value={formData.checkIn}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="checkOut">Check-out Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="checkOut"
                        name="checkOut"
                        type="date"
                        className="pl-8"
                        value={formData.checkOut}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="adults">Adults</Label>
                    <Select value={formData.adults} onValueChange={(value) => handleSelectChange("adults", value)}>
                      <SelectTrigger id="adults">
                        <SelectValue placeholder="Number of adults" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="children">Children</Label>
                    <Select value={formData.children} onValueChange={(value) => handleSelectChange("children", value)}>
                      <SelectTrigger id="children">
                        <SelectValue placeholder="Number of children" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="button" onClick={() => setActiveTab("payment")}>
                    Continue to Payment
                  </Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="payment" className="space-y-4 pt-4">
              <div className="rounded-md border p-4">
                <div className="font-medium">Booking Summary</div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Room Rate:</span>
                    <span>$120 x 3 nights</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & Fees:</span>
                    <span>$36</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-medium">
                    <span>Total:</span>
                    <span>$396</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <Select
                  value={formData.paymentStatus}
                  onValueChange={(value) => handleSelectChange("paymentStatus", value)}
                >
                  <SelectTrigger id="paymentStatus">
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="partial">Partial Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSubmit}>Create Booking</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard/bookings">Cancel</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
