"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PERMISSIONS, PREDEFINED_ROLES } from "@/lib/models/rbac"

export default function UserManagementPermissionsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Filter permissions related to user management
  const userPermissions = PERMISSIONS.filter((p) => p.module === "users" || p.module === "roles")

  // Get all roles
  const roles = [...PREDEFINED_ROLES]

  // Initialize permission matrix (role ID -> permission ID -> boolean)
  const [permissionMatrix, setPermissionMatrix] = useState<Record<string, Record<string, boolean>>>(() => {
    const matrix: Record<string, Record<string, boolean>> = {}

    roles.forEach((role) => {
      matrix[role.id] = {}
      userPermissions.forEach((permission) => {
        matrix[role.id][permission.id] = role.permissions.includes(permission.id)
      })
    })

    return matrix
  })

  // Toggle permission for a role
  const togglePermission = (roleId: string, permissionId: string) => {
    setPermissionMatrix((prev) => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permissionId]: !prev[roleId][permissionId],
      },
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to update permissions
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Log the updated permissions
      console.log("Updated permission matrix:", permissionMatrix)

      toast({
        title: "Success",
        description: "User management permissions updated successfully",
      })

      router.push("/dashboard/users")
      router.refresh()
    } catch (error) {
      console.error("Error updating permissions:", error)
      toast({
        title: "Error",
        description: "Failed to update permissions. Please try again.",
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
            <Link href="/dashboard/users">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">User Management Permissions</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Configure User Management Permissions</CardTitle>
            <CardDescription>Define which roles can access and manage users and roles</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Permission</TableHead>
                  {roles.map((role) => (
                    <TableHead key={role.id} className="text-center">
                      {role.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {userPermissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell className="font-medium">{permission.name}</TableCell>
                    {roles.map((role) => (
                      <TableCell key={role.id} className="text-center">
                        <Checkbox
                          checked={permissionMatrix[role.id][permission.id]}
                          onCheckedChange={() => togglePermission(role.id, permission.id)}
                          id={`${role.id}-${permission.id}`}
                          className="mx-auto"
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" asChild>
              <Link href="/dashboard/users">Cancel</Link>
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
      </form>
    </div>
  )
}
