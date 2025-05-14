"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Pencil, Trash2, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ConfirmDialog } from "@/components/confirm-dialog"

export default function RoleDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  // In a real app, this would fetch the role data from an API
  // For demo purposes, we'll use hardcoded data
  const role = {
    id: params.id,
    name:
      params.id === "1"
        ? "Owner"
        : params.id === "2"
          ? "Manager"
          : params.id === "3"
            ? "Receptionist"
            : params.id === "4"
              ? "Accountant"
              : "Maintenance",
    description: "This role has specific permissions to manage the system.",
    users: params.id === "1" ? 1 : params.id === "2" ? 1 : params.id === "3" ? 2 : params.id === "4" ? 1 : 0,
    createdAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-04-10T14:45:00Z",
    permissions: [
      // Properties
      { id: "properties.view", label: "View Properties", granted: true },
      { id: "properties.create", label: "Create Properties", granted: ["1", "2"].includes(params.id) },
      { id: "properties.edit", label: "Edit Properties", granted: ["1", "2"].includes(params.id) },
      { id: "properties.delete", label: "Delete Properties", granted: params.id === "1" },

      // Rooms
      { id: "rooms.view", label: "View Rooms", granted: true },
      { id: "rooms.create", label: "Create Rooms", granted: ["1", "2"].includes(params.id) },
      { id: "rooms.edit", label: "Edit Rooms", granted: ["1", "2"].includes(params.id) },
      { id: "rooms.delete", label: "Delete Rooms", granted: ["1", "2"].includes(params.id) },

      // Bookings
      { id: "bookings.view", label: "View Bookings", granted: true },
      { id: "bookings.create", label: "Create Bookings", granted: ["1", "2", "3"].includes(params.id) },
      { id: "bookings.edit", label: "Edit Bookings", granted: ["1", "2", "3"].includes(params.id) },
      { id: "bookings.delete", label: "Delete Bookings", granted: ["1", "2"].includes(params.id) },
      { id: "bookings.checkin", label: "Check-in Guests", granted: ["1", "2", "3"].includes(params.id) },
      { id: "bookings.checkout", label: "Check-out Guests", granted: ["1", "2", "3"].includes(params.id) },

      // Guests
      { id: "guests.view", label: "View Guests", granted: true },
      { id: "guests.create", label: "Create Guests", granted: ["1", "2", "3"].includes(params.id) },
      { id: "guests.edit", label: "Edit Guests", granted: ["1", "2", "3"].includes(params.id) },
      { id: "guests.delete", label: "Delete Guests", granted: ["1", "2"].includes(params.id) },

      // Finance
      { id: "finance.view", label: "View Financial Data", granted: ["1", "2", "4"].includes(params.id) },
      { id: "finance.manage", label: "Manage Payments", granted: ["1", "2", "4"].includes(params.id) },
      { id: "finance.reports", label: "Generate Reports", granted: ["1", "2", "4"].includes(params.id) },

      // Users
      { id: "users.view", label: "View Users", granted: ["1", "2"].includes(params.id) },
      { id: "users.create", label: "Create Users", granted: params.id === "1" },
      { id: "users.edit", label: "Edit Users", granted: params.id === "1" },
      { id: "users.delete", label: "Delete Users", granted: params.id === "1" },
      { id: "roles.view", label: "View Roles", granted: ["1", "2"].includes(params.id) },
      { id: "roles.manage", label: "Manage Roles", granted: params.id === "1" },
    ],
  }

  // Group permissions by category
  const permissionGroups = [
    { name: "Properties", permissions: role.permissions.filter((p) => p.id.startsWith("properties.")) },
    { name: "Rooms", permissions: role.permissions.filter((p) => p.id.startsWith("rooms.")) },
    { name: "Bookings", permissions: role.permissions.filter((p) => p.id.startsWith("bookings.")) },
    { name: "Guests", permissions: role.permissions.filter((p) => p.id.startsWith("guests.")) },
    { name: "Finance", permissions: role.permissions.filter((p) => p.id.startsWith("finance.")) },
    {
      name: "Users",
      permissions: role.permissions.filter((p) => p.id.startsWith("users.") || p.id.startsWith("roles.")),
    },
  ]

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log(`Deleted role with ID: ${params.id}`)

      // Redirect to roles page
      router.push("/dashboard/users")
      router.refresh()
    } catch (error) {
      console.error("Error deleting role:", error)
      setIsDeleting(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/users">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{role.name} Role</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/users/roles/${params.id}/edit`}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Role
            </Link>
          </Button>
          <ConfirmDialog
            title="Delete Role"
            description={`Are you sure you want to delete the ${role.name} role? This action cannot be undone.`}
            onConfirm={handleDelete}
            loading={isDeleting}
          >
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Role
            </Button>
          </ConfirmDialog>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Role Details</CardTitle>
            <CardDescription>Information about this role and its permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Role Name</h3>
                <p className="text-lg font-medium">{role.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Users with this Role</h3>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <p className="text-lg font-medium">{role.users}</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p>{role.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
                <p>{formatDate(role.createdAt)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                <p>{formatDate(role.updatedAt)}</p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Permissions</h3>
              <div className="space-y-6">
                {permissionGroups.map((group) => (
                  <div key={group.name} className="space-y-4">
                    <h4 className="text-md font-medium">{group.name}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {group.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center justify-between rounded-md border p-4">
                          <span>{permission.label}</span>
                          <Badge variant={permission.granted ? "default" : "secondary"}>
                            {permission.granted ? "Granted" : "Not Granted"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    {group.name !== permissionGroups[permissionGroups.length - 1].name && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/dashboard/users">Back to Roles</Link>
            </Button>
            <Button asChild>
              <Link href={`/dashboard/users/roles/${params.id}/edit`}>Edit Permissions</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
