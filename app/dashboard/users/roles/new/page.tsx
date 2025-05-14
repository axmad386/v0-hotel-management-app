"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Role name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  permissions: z.record(z.boolean()).refine(
    (data) => {
      // Ensure at least one permission is selected
      return Object.values(data).some((value) => value === true)
    },
    {
      message: "You must select at least one permission.",
    },
  ),
})

// Define permission categories and their specific permissions
const permissionGroups = [
  {
    name: "Properties",
    description: "Manage hotel properties and settings",
    permissions: [
      { id: "properties.view", label: "View Properties" },
      { id: "properties.create", label: "Create Properties" },
      { id: "properties.edit", label: "Edit Properties" },
      { id: "properties.delete", label: "Delete Properties" },
    ],
  },
  {
    name: "Rooms",
    description: "Manage rooms and room types",
    permissions: [
      { id: "rooms.view", label: "View Rooms" },
      { id: "rooms.create", label: "Create Rooms" },
      { id: "rooms.edit", label: "Edit Rooms" },
      { id: "rooms.delete", label: "Delete Rooms" },
    ],
  },
  {
    name: "Bookings",
    description: "Manage reservations and guest stays",
    permissions: [
      { id: "bookings.view", label: "View Bookings" },
      { id: "bookings.create", label: "Create Bookings" },
      { id: "bookings.edit", label: "Edit Bookings" },
      { id: "bookings.delete", label: "Delete Bookings" },
      { id: "bookings.checkin", label: "Check-in Guests" },
      { id: "bookings.checkout", label: "Check-out Guests" },
    ],
  },
  {
    name: "Guests",
    description: "Manage guest information",
    permissions: [
      { id: "guests.view", label: "View Guests" },
      { id: "guests.create", label: "Create Guests" },
      { id: "guests.edit", label: "Edit Guests" },
      { id: "guests.delete", label: "Delete Guests" },
    ],
  },
  {
    name: "Finance",
    description: "Manage financial data and reports",
    permissions: [
      { id: "finance.view", label: "View Financial Data" },
      { id: "finance.manage", label: "Manage Payments" },
      { id: "finance.reports", label: "Generate Reports" },
    ],
  },
  {
    name: "Users",
    description: "Manage system users and roles",
    permissions: [
      { id: "users.view", label: "View Users" },
      { id: "users.create", label: "Create Users" },
      { id: "users.edit", label: "Edit Users" },
      { id: "users.delete", label: "Delete Users" },
      { id: "roles.view", label: "View Roles" },
      { id: "roles.manage", label: "Manage Roles" },
    ],
  },
]

// Create a flat list of all permissions for form initialization
const allPermissions = permissionGroups.flatMap((group) => group.permissions.map((permission) => permission.id))

export default function CreateRolePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: allPermissions.reduce(
        (acc, permission) => {
          acc[permission] = false
          return acc
        },
        {} as Record<string, boolean>,
      ),
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get the list of granted permissions
      const grantedPermissions = Object.entries(values.permissions)
        .filter(([_, isGranted]) => isGranted)
        .map(([permissionId]) => permissionId)

      console.log("Role created:", {
        name: values.name,
        description: values.description,
        permissions: grantedPermissions,
      })

      // Redirect to roles page after successful submission
      router.push("/dashboard/users")
      router.refresh()
    } catch (error) {
      console.error("Error creating role:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper function to check/uncheck all permissions in a group
  const toggleGroupPermissions = (groupName: string, checked: boolean) => {
    const group = permissionGroups.find((g) => g.name === groupName)
    if (!group) return

    const updatedPermissions = { ...form.getValues().permissions }

    group.permissions.forEach((permission) => {
      updatedPermissions[permission.id] = checked
    })

    form.setValue("permissions", updatedPermissions, { shouldValidate: true })
  }

  // Helper function to check if all permissions in a group are selected
  const areAllGroupPermissionsSelected = (groupName: string) => {
    const group = permissionGroups.find((g) => g.name === groupName)
    if (!group) return false

    const permissions = form.getValues().permissions
    return group.permissions.every((permission) => permissions[permission.id])
  }

  // Helper function to check if some permissions in a group are selected
  const areSomeGroupPermissionsSelected = (groupName: string) => {
    const group = permissionGroups.find((g) => g.name === groupName)
    if (!group) return false

    const permissions = form.getValues().permissions
    return group.permissions.some((permission) => permissions[permission.id])
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
          <h1 className="text-2xl font-bold tracking-tight">Create New Role</h1>
        </div>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Role Information</CardTitle>
          <CardDescription>
            Create a new role with specific permissions. Roles define what actions users can perform in the system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Front Desk Manager" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the purpose and responsibilities of this role"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Permissions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select the permissions this role should have. Users with this role will be able to perform these
                  actions.
                </p>

                <div className="space-y-6">
                  {permissionGroups.map((group) => (
                    <div key={group.name} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-md font-medium">{group.name}</h4>
                          <p className="text-sm text-muted-foreground">{group.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`select-all-${group.name}`}
                            checked={areAllGroupPermissionsSelected(group.name)}
                            onCheckedChange={(checked) => {
                              toggleGroupPermissions(group.name, checked === true)
                            }}
                          />
                          <label
                            htmlFor={`select-all-${group.name}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Select All
                          </label>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {group.permissions.map((permission) => (
                          <FormField
                            key={permission.id}
                            control={form.control}
                            name={`permissions.${permission.id}`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel>{permission.label}</FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        ))}
                      </div>
                      {group !== permissionGroups[permissionGroups.length - 1] && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              </div>

              <CardFooter className="flex justify-between px-0">
                <Button variant="outline" asChild>
                  <Link href="/dashboard/users">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Role
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
