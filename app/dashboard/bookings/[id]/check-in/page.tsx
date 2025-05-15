"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

// Sample data for bookings
const bookingsData = [
  {
    id: "1",
    guest: {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "123-456-7890",
    },
    property: "Grand Hotel",
    propertyId: "1",
    room: {
      id: "1",
      number: "101",
      type: "Standard",
      rate: "$120",
    },
    checkIn: "2025-05-15",
    checkOut: "2025-05-18",
    nights: 3,
    adults: 2,
    children: 0,
    status: "confirmed",
    payment: "paid",
    totalAmount: 396.0,
    notes: "Guest requested extra pillows.",
    createdAt: "2025-05-01T10:30:00Z",
    updatedAt: "2025-05-01T10:30:00Z",
  },
]

export default function CheckInPage() {
  const params = useParams()
  const router = useRouter()
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    idProvided: false,
    paymentConfirmed: false,
    roomReady: false,
    additionalNotes: "",
  })

  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundBooking = bookingsData.find((b) => b.id === params.id)
    if (foundBooking) {
      setBooking(foundBooking)
    }
    setLoading(false)
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would update the booking status to checked-in
    // For demo purposes, we'll just redirect back to the booking details page
    router.push(`/dashboard/bookings/${params.id}`)
  }

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (!booking) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Booking not found</h1>
        <Button asChild className="mt-4">
          <Link href="/dashboard/bookings">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Bookings
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/bookings/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Check-In: {booking.guest.name}</h1>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Check-In Process</CardTitle>
            <CardDescription>Complete the check-in process for this booking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Booking Information</h3>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Booking ID</div>
                      <div className="text-sm">#{booking.id}</div>
                      <div className="text-sm text-muted-foreground">Guest</div>
                      <div className="text-sm">{booking.guest.name}</div>
                      <div className="text-sm text-muted-foreground">Property</div>
                      <div className="text-sm">{booking.property}</div>
                      <div className="text-sm text-muted-foreground">Room</div>
                      <div className="text-sm">
                        {booking.room.number} ({booking.room.type})
                      </div>
                      <div className="text-sm text-muted-foreground">Check-in Date</div>
                      <div className="text-sm">{formatDate(booking.checkIn)}</div>
                      <div className="text-sm text-muted-foreground">Check-out Date</div>
                      <div className="text-sm">{formatDate(booking.checkOut)}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Guest Information</h3>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Name</div>
                      <div className="text-sm">{booking.guest.name}</div>
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="text-sm">{booking.guest.email}</div>
                      <div className="text-sm text-muted-foreground">Phone</div>
                      <div className="text-sm">{booking.guest.phone}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/guests/${booking.guest.id}`}>
                        <User className="mr-2 h-4 w-4" />
                        View Guest Profile
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Check-In Checklist</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="idProvided"
                    checked={formData.idProvided}
                    onCheckedChange={(checked) => handleCheckboxChange("idProvided", checked as boolean)}
                  />
                  <label
                    htmlFor="idProvided"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    ID verified
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paymentConfirmed"
                    checked={formData.paymentConfirmed}
                    onCheckedChange={(checked) => handleCheckboxChange("paymentConfirmed", checked as boolean)}
                  />
                  <label
                    htmlFor="paymentConfirmed"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Payment confirmed
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="roomReady"
                    checked={formData.roomReady}
                    onCheckedChange={(checked) => handleCheckboxChange("roomReady", checked as boolean)}
                  />
                  <label
                    htmlFor="roomReady"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Room ready
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                name="additionalNotes"
                placeholder="Enter any additional notes or special requests"
                className="min-h-[100px]"
                value={formData.additionalNotes}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href={`/dashboard/bookings/${params.id}`}>Cancel</Link>
            </Button>
            <Button type="submit" disabled={!formData.idProvided || !formData.paymentConfirmed || !formData.roomReady}>
              Complete Check-In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
