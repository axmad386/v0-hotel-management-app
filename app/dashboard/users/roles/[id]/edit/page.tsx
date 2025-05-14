"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { PERMISSIONS } from "@/lib/models/rbac"

export default function EditRolePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState({
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
    permissions: [] as string[],
  })

  // Fetch role data on component mount
  useEffect(() => {
    const fetchRole = async () => {
      setIsLoading(true)
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use hardcoded data
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Simulate different permission sets based on role ID
        let permissions: string[] = []
        if (params.id === "1") {
          // Owner - all permissions
          permissions = PERMISSIONS.map((p) => p.id)
        } else if (params.id === "2") {
          // Manager - most permissions except some admin ones
          permissions = PERMISSIONS.filter(
            (p) =>
              !p.id.includes("users.delete") && !p.id.includes("roles.manage") && !p.id.includes("properties.delete"),
          ).map((p) => p.id)
        } else if (params.id === "3") {
          // Receptionist - booking and guest related
          permissions = PERMISSIONS.filter(
            (p) =>
              p.module === "bookings" || p.module === "guests" || p.id === "rooms.view" || p.id === "properties.view",
          ).map((p) => p.id)
        } else if (params.id === "4") {
          // Accountant - finance related
          permissions = PERMISSIONS.filter(
            (p) => p.module === "finance" || p.id === "bookings.view" || p.id === "guests.view",
          ).map((p) => p.id)
        }

        setRole((prev) => ({
          ...prev,
          permissions,
        }))
      } catch (error) {
        console.error("Error fetching role:", error)
        toast({
          title: "Error",
          description: "Failed to load role data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchRole()
  }, [params.id])

  // Group permissions by module
  const permissionGroups = PERMISSIONS.reduce(
    (groups, permission) => {
      const { module } = permission
      if (!groups[module]) {
        groups[module] = []
      }
      groups[module].push(permission)
      return groups
    },
    {} as Record<string, typeof PERMISSIONS>,
  )

  // Handle permission toggle
  const togglePermission = (permissionId: string) => {
    setRole((prev) => {
      const hasPermission = prev.permissions.includes(permissionId)
      if (hasPermission) {
        return {
          ...prev,
          permissions: prev.permissions.filter((id) => id !== permissionId),
        }
      } else {
        return {
          ...prev,
          permissions: [...prev.permissions, permissionId],
        }
      }
    })
  }

  // Toggle all permissions in a group
  const toggleGroupPermissions = (module: string, checked: boolean) => {
    const modulePermissionIds = permissionGroups[module].map((p) => p.id)

    setRole((prev) => {
      if (checked) {
        // Add all permissions from this module that aren't already included
        const newPermissions = [...prev.permissions]
        modulePermissionIds.forEach((id) => {
          if (!newPermissions.includes(id)) {
            newPermissions.push(id)
          }
        })
        return {
          ...prev,
          permissions: newPermissions,
        }
      } else {
        // Remove all permissions from this module
        return {
          ...prev,
          permissions: prev.permissions.filter((id) => !modulePermissionIds.includes(id)),
        }
      }
    })
  }

  // Check if all permissions in a group are selected
  const isGroupFullySelected = (module: string) => {
    const modulePermissionIds = permissionGroups[module].map((p) => p.id)
    return modulePermissionIds.every((id) => role.permissions.includes(id))
  }

  // Check if some permissions in a group are selected
  const isGroupPartiallySelected = (module: string) => {
    const modulePermissionIds = permissionGroups[module].map((p) => p.id)
    return (
      modulePermissionIds.some((id) => role.permissions.includes(id)) &&
      !modulePermissionIds.every((id) => role.permissions.includes(id))
    )
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Updated role:", role)

      toast({
        title: "Success",
        description: "Role permissions updated successfully",
      })

      // Redirect to role detail page
      router.push(`/dashboard/users/roles/${params.id}`)
      router.refresh()
    } catch (error) {
      console.error("Error updating role:", error)
      toast({
        title: "Error",
        description: "Failed to update role permissions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href={`/dashboard/users/roles/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Edit {role.name} Role</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Role Information</CardTitle>
              <CardDescription>Edit the basic information for this role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Role Name</Label>
                  <Input
                    id="name"
                    value={role.name}
                    onChange={(e) => setRole((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={role.description}
                    onChange={(e) => setRole((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>Select the permissions for this role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(permissionGroups).map(([module, permissions]) => (
                <div key={module} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`select-all-${module}`}
                      checked={isGroupFullySelected(module)}
                      indeterminate={isGroupPartiallySelected(module)}
                      onCheckedChange={(checked) => toggleGroupPermissions(module, checked === true)}
                    />
                    <Label
                      htmlFor={`select-all-${module}`}
                      className="text-base font-semibold capitalize cursor-pointer"
                    >
                      {module}
                    </Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ml-6">
                    {permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission.id}
                          checked={role.permissions.includes(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                        />
                        <Label htmlFor={permission.id} className="cursor-pointer">
                          {permission.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {module !== Object.keys(permissionGroups)[Object.keys(permissionGroups).length - 1] && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href={`/dashboard/users/roles/${params.id}`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
