"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, Printer } from "lucide-react"
import { Separator } from "@/components/ui/separator"

// Sample data for bookings
const bookingsData = [
  {
    id: "1",
    guest: {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St, New York, NY",
    },
    property: "Grand Hotel",
    propertyId: "1",
    room: {
      id: "1",
      number: "101",
      type: "Standard",
      rate: 120,
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
    invoiceNumber: "INV-1234",
    invoiceDate: "2025-05-01",
    items: [
      { description: "Room 101 (Standard)", nights: 3, rate: 120, amount: 360 },
      { description: "City Tax", nights: 1, rate: 36, amount: 36 },
    ],
  },
]

export default function InvoicePage() {
  const params = useParams()
  const router = useRouter()
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundBooking = bookingsData.find((b) => b.id === params.id)
    if (foundBooking) {
      setBooking(foundBooking)
    }
    setLoading(false)
  }, [params.id])

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const initialDate = new Date(dateString)
    return initialDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const handlePrint = () => {
    window.print()
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/dashboard/bookings/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Invoice #{booking.invoiceNumber}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
      <Card className="print:shadow-none">
        <CardContent className="p-6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 md:flex-row md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">PropertyPro</h2>
                <p className="text-muted-foreground">Invoice #{booking.invoiceNumber}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Invoice Date</p>
                <p>{formatDate(booking.invoiceDate)}</p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="font-medium">Bill To:</p>
                <p>{booking.guest.name}</p>
                <p>{booking.guest.address}</p>
                <p>{booking.guest.email}</p>
                <p>{booking.guest.phone}</p>
              </div>
              <div>
                <p className="font-medium">Property:</p>
                <p>{booking.property}</p>
                <p>
                  Room {booking.room.number} ({booking.room.type})
                </p>
                <p>Check-in: {formatDate(booking.checkIn)}</p>
                <p>Check-out: {formatDate(booking.checkOut)}</p>
              </div>
            </div>
            <div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-left">Description</th>
                    <th className="py-2 text-right">Nights</th>
                    <th className="py-2 text-right">Rate</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.items.map((item: any, index: number) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{item.description}</td>
                      <td className="py-2 text-right">{item.nights}</td>
                      <td className="py-2 text-right">${item.rate.toFixed(2)}</td>
                      <td className="py-2 text-right">${item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="py-2 text-right font-medium">
                      Total:
                    </td>
                    <td className="py-2 text-right font-bold">${booking.totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div>
              <p className="font-medium">Payment Status:</p>
              <p className="capitalize">{booking.payment}</p>
            </div>
            <Separator />
            <div className="text-center text-sm text-muted-foreground">
              <p>Thank you for choosing PropertyPro for your stay.</p>
              <p>If you have any questions about this invoice, please contact us.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
