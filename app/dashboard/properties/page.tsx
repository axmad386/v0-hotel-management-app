"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Eye, MoreHorizontal, Pencil, Plus, Trash } from "lucide-react"
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
    rooms: 32,
    occupancy: "75%",
    status: "active",
  },
  {
    id: "2",
    name: "City Boarding House",
    type: "boarding",
    address: "456 Park Ave, Boston, MA",
    rooms: 18,
    occupancy: "60%",
    status: "active",
  },
  {
    id: "3",
    name: "Beach Resort",
    type: "hotel",
    address: "789 Ocean Dr, Miami, FL",
    rooms: 24,
    occupancy: "90%",
    status: "active",
  },
  {
    id: "4",
    name: "Mountain Lodge",
    type: "boarding",
    address: "101 Pine Rd, Denver, CO",
    rooms: 12,
    occupancy: "40%",
    status: "maintenance",
  },
  {
    id: "5",
    name: "Downtown Suites",
    type: "hotel",
    address: "202 Central St, Chicago, IL",
    rooms: 28,
    occupancy: "85%",
    status: "active",
  },
  {
    id: "6",
    name: "Riverside Inn",
    type: "hotel",
    address: "303 River Rd, New Orleans, LA",
    rooms: 20,
    occupancy: "70%",
    status: "active",
  },
  {
    id: "7",
    name: "Harbor View",
    type: "boarding",
    address: "404 Harbor St, San Francisco, CA",
    rooms: 15,
    occupancy: "80%",
    status: "active",
  },
  {
    id: "8",
    name: "Sunset Motel",
    type: "hotel",
    address: "505 Sunset Blvd, Los Angeles, CA",
    rooms: 30,
    occupancy: "65%",
    status: "active",
  },
  {
    id: "9",
    name: "Lakeside Cabins",
    type: "boarding",
    address: "606 Lake Dr, Minneapolis, MN",
    rooms: 10,
    occupancy: "50%",
    status: "maintenance",
  },
  {
    id: "10",
    name: "Urban Lofts",
    type: "boarding",
    address: "707 Urban St, Portland, OR",
    rooms: 14,
    occupancy: "75%",
    status: "active",
  },
  {
    id: "11",
    name: "Royal Palace Hotel",
    type: "hotel",
    address: "808 Royal Ave, Las Vegas, NV",
    rooms: 50,
    occupancy: "95%",
    status: "active",
  },
  {
    id: "12",
    name: "Cozy Corner Inn",
    type: "boarding",
    address: "909 Cozy Ln, Nashville, TN",
    rooms: 8,
    occupancy: "60%",
    status: "active",
  },
]

export default function PropertiesPage() {
  const router = useRouter()
  const [properties, setProperties] = useState(propertiesData)

  const handleDelete = (id: string) => {
    setProperties(properties.filter((property) => property.id !== id))
  }

  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }) => (
        <div className="font-medium">
          <Link href={`/dashboard/properties/${row.original.id}`} className="hover:underline">
            {row.getValue("name")}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("type") === "hotel" ? "Hotel" : "Boarding House"}</Badge>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "address",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Address" />,
    },
    {
      accessorKey: "rooms",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Rooms" />,
    },
    {
      accessorKey: "occupancy",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Occupancy" />,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => (
        <Badge variant={row.getValue("status") === "active" ? "default" : "secondary"}>
          {row.getValue("status") === "active" ? "Active" : "Maintenance"}
        </Badge>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const property = row.original

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
                <Link href={`/dashboard/properties/${property.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/properties/${property.id}/edit`}>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Property
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/properties/${property.id}/rooms`}>
                  <Building2 className="mr-2 h-4 w-4" />
                  Manage Rooms
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ConfirmDialog
                  title="Delete Property"
                  description={`Are you sure you want to delete ${property.name}? This action cannot be undone.`}
                  onConfirm={() => handleDelete(property.id)}
                  trigger={
                    <div className="flex w-full items-center text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Property
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

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
        <Button asChild>
          <Link href="/dashboard/create-property">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{properties.length}</div>
              <p className="text-xs text-muted-foreground">
                {properties.filter((p) => p.type === "hotel").length} hotels,{" "}
                {properties.filter((p) => p.type === "boarding").length} boarding houses
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{properties.reduce((acc, property) => acc + property.rooms, 0)}</div>
              <p className="text-xs text-muted-foreground">
                {properties.filter((p) => p.type === "hotel").reduce((acc, p) => acc + p.rooms, 0)} hotel rooms,{" "}
                {properties.filter((p) => p.type === "boarding").reduce((acc, p) => acc + p.rooms, 0)} boarding rooms
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Occupancy</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  properties.reduce((acc, property) => acc + Number.parseInt(property.occupancy), 0) /
                    properties.length,
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{properties.filter((p) => p.status === "active").length}</div>
              <p className="text-xs text-muted-foreground">
                {properties.filter((p) => p.status === "maintenance").length} in maintenance
              </p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Properties</CardTitle>
            <CardDescription>Manage your properties and view their details</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={properties} searchPlaceholder="Search properties..." />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
