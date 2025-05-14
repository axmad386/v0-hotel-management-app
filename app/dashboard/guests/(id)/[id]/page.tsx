"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Edit, Mail, Phone } from "lucide-react"
import { ConfirmDialog } from "@/components/confirm-dialog"

// Sample data for guests
const guestsData = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St, New York, NY",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    idType: "Passport",
    idNumber: "AB123456",
    dateOfBirth: "1985-06-15",
    nationality: "USA",
    stays: 5,
    totalSpent: 1980.0,
    status: "active",
    notes: "Prefers rooms on higher floors.",
    createdAt: "2024-01-15T10:30:00Z",
    bookings: [
      {
        id: "1",
        property: "Grand Hotel",
        room: "101",
        checkIn: "2025-05-15",
        checkOut: "2025-05-18",
        status: "confirmed",
      },
      {
        id: "11",
        property: "Grand Hotel",
        room: "302",
        checkIn: "2025-03-17",
        checkOut: "2025-03-19",
        status: "checked-out",
      },
    ],
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "234-567-8901",
    address: "456 Park Ave, Boston, MA",
    city: "Boston",
    state: "MA",
    zipCode: "02108",
    country: "USA",
    idType: "Driver's License",
    idNumber: "DL987654",
    dateOfBirth: "1990-08-22",
    nationality: "USA",
    stays: 2,
    totalSpent: 720.0,
    status: "active",
    notes: "Allergic to feather pillows.",
    createdAt: "2024-02-10T15:45:00Z",
    bookings: [
      {
        id: "2",
        property: "Grand Hotel",
        room: "201",
        checkIn: "2025-05-16",
        checkOut: "2025-05-20",
        status: "confirmed",
      },
    ],
  },
]

export default function GuestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [guest, setGuest] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundGuest = guestsData.find((g) => g.id === params.id)
    if (foundGuest) {
      setGuest(foundGuest)
    }
    setLoading(false)
  }, [params.id])

  const handleDelete = () => {
    // In a real app, this would call an API to delete the guest
    router.push("/dashboard/guests")
  }

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (!guest) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Guest not found</h1>
        <Button asChild className="mt-4">
          <Link href="/dashboard/guests">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Guests
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/guests">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{guest.name}</h1>
          <Badge variant={guest.status === "active" ? "default" : "secondary"}>
            {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/guests/${guest.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Guest
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/bookings/new?guest=${guest.id}`}>
              <Calendar className="mr-2 h-4 w-4" />
              Create Booking
            </Link>
          </Button>
          <ConfirmDialog
            title="Delete Guest"
            description={`Are you sure you want to delete ${guest.name}? This action cannot be undone.`}
            onConfirm={handleDelete}
          />
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Guest Details</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Guest Information</CardTitle>
              <CardDescription>Personal and contact details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Full Name</div>
                      <div className="text-sm">{guest.name}</div>
                      <div className="text-sm text-muted-foreground">Date of Birth</div>
                      <div className="text-sm">{formatDate(guest.dateOfBirth)}</div>
                      <div className="text-sm text-muted-foreground">Nationality</div>
                      <div className="text-sm">{guest.nationality}</div>
                      <div className="text-sm text-muted-foreground">ID Type</div>
                      <div className="text-sm">{guest.idType}</div>
                      <div className="text-sm text-muted-foreground">ID Number</div>
                      <div className="text-sm">{guest.idNumber}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Email</div>
                      <div className="text-sm flex items-center">
                        {guest.email}
                        <Button variant="ghost" size="icon" asChild className="ml-2">
                          <Link href={`mailto:${guest.email}`}>
                            <Mail className="h-4 w-4" />
                            <span className="sr-only">Email</span>
                          </Link>
                        </Button>
                      </div>
                      <div className="text-sm text-muted-foreground">Phone</div>
                      <div className="text-sm flex items-center">
                        {guest.phone}
                        <Button variant="ghost" size="icon" asChild className="ml-2">
                          <Link href={`tel:${guest.phone}`}>
                            <Phone className="h-4 w-4" />
                            <span className="sr-only">Call</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Address</h3>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Street Address</div>
                      <div className="text-sm">{guest.address}</div>
                      <div className="text-sm text-muted-foreground">City</div>
                      <div className="text-sm">{guest.city}</div>
                      <div className="text-sm text-muted-foreground">State/Province</div>
                      <div className="text-sm">{guest.state}</div>
                      <div className="text-sm text-muted-foreground">Zip/Postal Code</div>
                      <div className="text-sm">{guest.zipCode}</div>
                      <div className="text-sm text-muted-foreground">Country</div>
                      <div className="text-sm">{guest.country}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Guest Statistics</h3>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Total Stays</div>
                      <div className="text-sm">{guest.stays}</div>
                      <div className="text-sm text-muted-foreground">Total Spent</div>
                      <div className="text-sm">${guest.totalSpent.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Member Since</div>
                      <div className="text-sm">{new Date(guest.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking History</CardTitle>
              <CardDescription>All bookings for this guest</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {guest.bookings.length > 0 ? (
                  guest.bookings.map((booking: any) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 text-center text-xs">
                          <div className="font-medium">
                            {new Date(booking.checkIn).toLocaleDateString("en-US", { month: "short" })}
                          </div>
                          <div className="text-lg font-bold">{new Date(booking.checkIn).getDate()}</div>
                        </div>
                        <div>
                          <div className="font-medium">{booking.property}</div>
                          <div className="text-sm text-muted-foreground">
                            Room {booking.room} • {formatDate(booking.checkIn)} to {formatDate(booking.checkOut)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "outline"
                              : booking.status === "checked-in"
                                ? "default"
                                : booking.status === "checked-out"
                                  ? "secondary"
                                  : "destructive"
                          }
                        >
                          {booking.status
                            .split("-")
                            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(" ")}
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/bookings/${booking.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground">No bookings found for this guest.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Guest Preferences</CardTitle>
              <CardDescription>Preferences and special requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Notes</h3>
                  <p className="mt-2 text-sm">{guest.notes || "No notes available."}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Preferences</h3>
                  <div className="mt-2 rounded-md border p-4">
                    <p className="text-sm text-muted-foreground">No specific preferences recorded.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
