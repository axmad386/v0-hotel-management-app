"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit } from "lucide-react"
import { ConfirmDialog } from "@/components/confirm-dialog"

// Sample data for rooms
const roomsData = [
  {
    id: "1",
    number: "101",
    type: "Standard",
    property: "Grand Hotel",
    propertyId: "1",
    capacity: 2,
    rate: "$120",
    status: "occupied",
    amenities: ["TV", "WiFi", "Air Conditioning", "Mini Bar"],
    description: "Comfortable standard room with a queen-sized bed and city view.",
    size: "30 sqm",
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
    rate: "$120",
    status: "available",
    amenities: ["TV", "WiFi", "Air Conditioning", "Mini Bar"],
    description: "Comfortable standard room with a queen-sized bed and garden view.",
    size: "30 sqm",
    bedType: "Queen",
    maxOccupancy: 2,
    images: ["/placeholder.svg?height=400&width=600"],
    lastCleaned: "2025-05-14",
    currentGuest: null,
    checkIn: null,
    checkOut: null,
  },
]

export default function RoomDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [room, setRoom] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundRoom = roomsData.find((r) => r.id === params.id)
    if (foundRoom) {
      setRoom(foundRoom)
    }
    setLoading(false)
  }, [params.id])

  const handleDelete = () => {
    // In a real app, this would call an API to delete the room
    router.push("/dashboard/rooms")
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (!room) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Room not found</h1>
        <Button asChild className="mt-4">
          <Link href="/dashboard/rooms">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Rooms
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
            <Link href="/dashboard/rooms">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Room {room.number}</h1>
          <Badge
            variant={room.status === "available" ? "default" : room.status === "occupied" ? "secondary" : "outline"}
          >
            {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/rooms/${room.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Room
            </Link>
          </Button>
          <ConfirmDialog
            title="Delete Room"
            description={`Are you sure you want to delete Room ${room.number}? This action cannot be undone.`}
            onConfirm={handleDelete}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Room Information</CardTitle>
            <CardDescription>Basic details about this room</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Details</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="text-sm text-muted-foreground">Room Number</div>
                    <div className="text-sm">{room.number}</div>
                    <div className="text-sm text-muted-foreground">Type</div>
                    <div className="text-sm">{room.type}</div>
                    <div className="text-sm text-muted-foreground">Property</div>
                    <div className="text-sm">{room.property}</div>
                    <div className="text-sm text-muted-foreground">Capacity</div>
                    <div className="text-sm">{room.capacity} person(s)</div>
                    <div className="text-sm text-muted-foreground">Rate</div>
                    <div className="text-sm">{room.rate}/night</div>
                    <div className="text-sm text-muted-foreground">Size</div>
                    <div className="text-sm">{room.size}</div>
                    <div className="text-sm text-muted-foreground">Bed Type</div>
                    <div className="text-sm">{room.bedType}</div>
                    <div className="text-sm text-muted-foreground">Max Occupancy</div>
                    <div className="text-sm">{room.maxOccupancy} person(s)</div>
                    <div className="text-sm text-muted-foreground">Last Cleaned</div>
                    <div className="text-sm">{new Date(room.lastCleaned).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Description</h3>
                  <p className="mt-2 text-sm">{room.description}</p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Amenities</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {room.amenities.map((amenity: string) => (
                      <Badge key={amenity} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Room Image</h3>
                  <div className="mt-2 overflow-hidden rounded-md border">
                    <img
                      src={room.images[0] || "/placeholder.svg"}
                      alt={`Room ${room.number}`}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {room.status === "occupied" && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Current Booking</CardTitle>
              <CardDescription>Details about the current guest</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium">Guest Information</h3>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="text-sm text-muted-foreground">Guest Name</div>
                      <div className="text-sm">{room.currentGuest}</div>
                      <div className="text-sm text-muted-foreground">Check-in Date</div>
                      <div className="text-sm">{new Date(room.checkIn).toLocaleDateString()}</div>
                      <div className="text-sm text-muted-foreground">Check-out Date</div>
                      <div className="text-sm">{new Date(room.checkOut).toLocaleDateString()}</div>
                      <div className="text-sm text-muted-foreground">Length of Stay</div>
                      <div className="text-sm">
                        {Math.ceil(
                          (new Date(room.checkOut).getTime() - new Date(room.checkIn).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        night(s)
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link href={`/dashboard/bookings/1`}>View Booking</Link>
                    </Button>
                    <Button asChild>
                      <Link href={`/dashboard/bookings/1/check-out`}>Check Out</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {room.status === "available" && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Room Availability</CardTitle>
              <CardDescription>This room is currently available for booking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Last cleaned on {new Date(room.lastCleaned).toLocaleDateString()}
                  </p>
                </div>
                <Button asChild>
                  <Link href={`/dashboard/bookings/new?room=${room.id}`}>Create Booking</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
