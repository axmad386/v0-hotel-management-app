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
import { ArrowLeft } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for bookings
const bookingsData = [
  {
    id: "3",
    guest: {
      id: "3",
      name: "Robert Johnson",
      email: "robert@example.com",
      phone: "345-678-9012",
    },
    property: "City Boarding House",
    propertyId: "2",
    room: {
      id: "6",
      number: "A2",
      type: "Double",
      rate: "$80",
    },
    checkIn: "2025-05-14",
    checkOut: "2025-06-14",
    nights: 31,
    adults: 1,
    children: 0,
    status: "checked-in",
    payment: "paid",
    totalAmount: 2480.0,
    notes: "Long-term stay for business.",
    createdAt: "2025-05-03T09:45:00Z",
    updatedAt: "2025-05-14T14:00:00Z",
  },
]

export default function CheckOutPage() {
  const params = useParams()
  const router = useRouter()
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    roomInspected: false,
    keyReturned: false,
    additionalCharges: "0",
    paymentMethod: "credit_card",
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would update the booking status to checked-out
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

  const totalWithAdditional = booking.totalAmount + Number(formData.additionalCharges)

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/bookings/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Check-Out: {booking.guest.name}</h1>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Check-Out Process</CardTitle>
            <CardDescription>Complete the check-out process for this booking</CardDescription>
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
                    <h3 className="text-lg font-medium">Payment Summary</h3>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Total Amount</div>
                      <div className="text-sm">${booking.totalAmount.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Payment Status</div>
                      <div className="text-sm capitalize">{booking.payment}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Check-Out Checklist</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="roomInspected"
                    checked={formData.roomInspected}
                    onCheckedChange={(checked) => handleCheckboxChange("roomInspected", checked as boolean)}
                  />
                  <label
                    htmlFor="roomInspected"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Room inspected
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keyReturned"
                    checked={formData.keyReturned}
                    onCheckedChange={(checked) => handleCheckboxChange("keyReturned", checked as boolean)}
                  />
                  <label
                    htmlFor="keyReturned"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Key returned
                  </label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="additionalCharges">Additional Charges ($)</Label>
                <Input
                  id="additionalCharges"
                  name="additionalCharges"
                  type="number"
                  placeholder="0.00"
                  value={formData.additionalCharges}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                >
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="rounded-md border p-4">
              <div className="font-medium">Final Payment Summary</div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Original Total:</span>
                  <span>${booking.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Additional Charges:</span>
                  <span>${Number(formData.additionalCharges).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-medium">
                  <span>Final Total:</span>
                  <span>${totalWithAdditional.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea
                id="additionalNotes"
                name="additionalNotes"
                placeholder="Enter any additional notes"
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
            <Button type="submit" disabled={!formData.roomInspected || !formData.keyReturned}>
              Complete Check-Out
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
