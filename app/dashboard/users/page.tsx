import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Plus, User, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function UsersPage() {
  // Sample data for users
  const users = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "owner",
      status: "active",
      lastLogin: "2025-05-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "manager",
      status: "active",
      lastLogin: "2025-05-14T15:45:00Z",
    },
    {
      id: "3",
      name: "Robert Brown",
      email: "robert@example.com",
      role: "receptionist",
      status: "active",
      lastLogin: "2025-05-15T08:15:00Z",
    },
    {
      id: "4",
      name: "Emily Wilson",
      email: "emily@example.com",
      role: "accountant",
      status: "active",
      lastLogin: "2025-05-13T11:20:00Z",
    },
    {
      id: "5",
      name: "Michael Johnson",
      email: "michael@example.com",
      role: "receptionist",
      status: "inactive",
      lastLogin: "2025-05-10T09:30:00Z",
    },
  ]

  // Sample data for roles
  const roles = [
    {
      id: "1",
      name: "Owner",
      users: 1,
      permissions: "Full access to all features",
    },
    {
      id: "2",
      name: "Manager",
      users: 1,
      permissions: "Can manage properties, bookings, and staff",
    },
    {
      id: "3",
      name: "Receptionist",
      users: 2,
      permissions: "Can manage bookings and guests",
    },
    {
      id: "4",
      name: "Accountant",
      users: 1,
      permissions: "Can access financial data and reports",
    },
    {
      id: "5",
      name: "Maintenance",
      users: 0,
      permissions: "Can view and update maintenance tasks",
    },
  ]

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Users & Roles</h1>
        <Button asChild>
          <Link href="/dashboard/users/new">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Across all roles</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Custom Roles</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Defined in the system</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Login</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium">John Doe</div>
              <p className="text-xs text-muted-foreground">Today at 10:30 AM</p>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Manage users and their access to the system</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <Link href={`/dashboard/users/${user.id}`} className="hover:underline">
                            {user.name}
                          </Link>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(user.lastLogin)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/${user.id}`}>View Details</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/${user.id}/edit`}>Edit User</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/${user.id}/permissions`}>Manage Permissions</Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Roles</CardTitle>
                  <CardDescription>Manage roles and their permissions</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/dashboard/users/roles/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Role
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-medium">
                          <Link href={`/dashboard/users/roles/${role.id}`} className="hover:underline">
                            {role.name}
                          </Link>
                        </TableCell>
                        <TableCell>{role.users}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{role.permissions}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/roles/${role.id}`}>View Details</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/roles/${role.id}/edit`}>Edit Role</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/users/roles/${role.id}/permissions`}>Manage Permissions</Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Permission Settings</CardTitle>
                <CardDescription>Configure system-wide permission settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border p-4">
                    <h3 className="text-lg font-medium">Module Access</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Configure which roles can access specific modules
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                          <div className="font-medium">Property Management</div>
                          <div className="text-sm text-muted-foreground">
                            Access to property settings and configuration
                          </div>
                        </div>
                        <Button variant="outline" asChild>
                          <Link href="/dashboard/users/permissions/property-management">Configure</Link>
                        </Button>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                          <div className="font-medium">Booking System</div>
                          <div className="text-sm text-muted-foreground">
                            Access to reservations and guest management
                          </div>
                        </div>
                        <Button variant="outline" asChild>
                          <Link href="/dashboard/users/permissions/booking-system">Configure</Link>
                        </Button>
                      </div>
                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                          <div className="font-medium">Financial Management</div>
                          <div className="text-sm text-muted-foreground">Access to financial data and reports</div>
                        </div>
                        <Button variant="outline" asChild>
                          <Link href="/dashboard/users/permissions/financial-management">Configure</Link>
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">User Management</div>
                          <div className="text-sm text-muted-foreground">Access to user and role settings</div>
                        </div>
                        <Button variant="outline" asChild>
                          <Link href="/dashboard/users/permissions/user-management">Configure</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
