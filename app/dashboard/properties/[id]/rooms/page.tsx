"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Eye, Hotel, MoreHorizontal, Pencil, Plus, Trash } from "lucide-react"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
]

// Sample data for rooms
const roomsData = [
  {
    id: "1",
    propertyId: "1",
    number: "101",
    type: "Standard",
    property: "Grand Hotel",
    capacity: 2,
    rate: "$120",
    status: "occupied",
  },
  {
    id: "2",
    propertyId: "1",
    number: "102",
    type: "Standard",
    property: "Grand Hotel",
    capacity: 2,
    rate: "$120",
    status: "available",
  },
  {
    id: "3",
    propertyId: "1",
    number: "201",
    type: "Deluxe",
    property: "Grand Hotel",
    capacity: 3,
    rate: "$180",
    status: "occupied",
  },
  {
    id: "4",
    propertyId: "1",
    number: "301",
    type: "Suite",
    property: "Grand Hotel",
    capacity: 4,
    rate: "$250",
    status: "maintenance",
  },
  {
    id: "8",
    propertyId: "1",
    number: "103",
    type: "Standard",
    property: "Grand Hotel",
    capacity: 2,
    rate: "$120",
    status: "available",
  },
  {
    id: "9",
    propertyId: "1",
    number: "104",
    type: "Standard",
    property: "Grand Hotel",
    capacity: 2,
    rate: "$120",
    status: "occupied",
  },
  {
    id: "10",
    propertyId: "1",
    number: "202",
    type: "Deluxe",
    property: "Grand Hotel",
    capacity: 3,
    rate: "$180",
    status: "available",
  },
  {
    id: "11",
    propertyId: "1",
    number: "302",
    type: "Suite",
    property: "Grand Hotel",
    capacity: 4,
    rate: "$250",
    status: "occupied",
  },
]

export default function PropertyRoomsPage() {
  const params = useParams()
  const router = useRouter()
  const [property, setProperty] = useState<any>(null)
  const [rooms, setRooms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundProperty = propertiesData.find((p) => p.id === params.id)
    if (foundProperty) {
      setProperty(foundProperty)
      // Filter rooms for this property
      const propertyRooms = roomsData.filter((room) => room.propertyId === params.id)
      setRooms(propertyRooms)
    }
    setLoading(false)
  }, [params.id])

  const handleDelete = (id: string) => {
    setRooms(rooms.filter((room) => room.id !== id))
  }

  const columns = [
    {
      accessorKey: "number",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Room #" />,
      cell: ({ row }) => (
        <div className="font-medium">
          <Link href={`/dashboard/rooms/${row.original.id}`} className="hover:underline">
            {row.getValue("number")}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "capacity",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Capacity" />,
      cell: ({ row }) => (
        <div>
          {row.getValue("capacity")} person{row.getValue("capacity") > 1 ? "s" : ""}
        </div>
      ),
    },
    {
      accessorKey: "rate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Rate" />,
      cell: ({ row }) => <div>{row.getValue("rate")}/night</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "available" ? "default" : status === "occupied" ? "secondary" : "outline"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const room = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/rooms/${room.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/rooms/${room.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Room
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/bookings/new?room=${room.id}`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Booking
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ConfirmDialog
                  title="Delete Room"
                  description={`Are you sure you want to delete Room ${room.number}? This action cannot be undone.`}
                  onConfirm={() => handleDelete(room.id)}
                  trigger={
                    <div className="flex w-full items-center text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Room
                    </div>
                  }
                  variant="ghost"
                  className="p-0 text-destructive"
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (!property) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Property not found</h1>
        <Button asChild className="mt-4">
          <Link href="/dashboard/properties">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
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
            <Link href={`/dashboard/properties/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Rooms - {property.name}</h1>
        </div>
        <Button asChild>
          <Link href={`/dashboard/properties/${params.id}/rooms/new`}>
            <Plus className="mr-2 h-4 w-4" />
            Add Room
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <Hotel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rooms.length}</div>
              <p className="text-xs text-muted-foreground">In this property</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
              <Hotel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rooms.filter((room) => room.status === "available").length}</div>
              <p className="text-xs text-muted-foreground">Ready for booking</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupied Rooms</CardTitle>
              <Hotel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rooms.filter((room) => room.status === "occupied").length}</div>
              <p className="text-xs text-muted-foreground">Currently occupied</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenance</CardTitle>
              <Hotel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{rooms.filter((room) => room.status === "maintenance").length}</div>
              <p className="text-xs text-muted-foreground">Under maintenance</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Rooms</CardTitle>
            <CardDescription>Manage rooms for {property.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={rooms} searchPlaceholder="Search rooms..." />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
