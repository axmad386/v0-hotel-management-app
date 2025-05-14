// Types for Role-Based Access Control (RBAC)

// Permission represents a single action that can be performed
export interface Permission {
  id: string // Unique identifier (e.g., "bookings.create")
  name: string // Display name (e.g., "Create Bookings")
  description?: string // Optional description
  module: string // Module this permission belongs to (e.g., "bookings")
  action: string // Action within the module (e.g., "create")
}

// Role represents a collection of permissions
export interface Role {
  id: string // Unique identifier
  name: string // Display name
  description: string // Description of the role
  permissions: string[] // Array of permission IDs granted to this role
  createdAt: Date // When the role was created
  updatedAt: Date // When the role was last updated
}

// User with role information
export interface UserWithRole {
  id: string // Unique identifier
  name: string // User's name
  email: string // User's email
  roleId: string // ID of the user's role
  role?: Role // Optional role object (for joined queries)
  active: boolean // Whether the user is active
  lastLogin?: Date // When the user last logged in
}

// Permission check function
export function hasPermission(user: UserWithRole, permissionId: string): boolean {
  if (!user.role) return false
  return user.role.permissions.includes(permissionId)
}

// Check if user has any of the given permissions
export function hasAnyPermission(user: UserWithRole, permissionIds: string[]): boolean {
  if (!user.role) return false
  return permissionIds.some((id) => user.role!.permissions.includes(id))
}

// Check if user has all of the given permissions
export function hasAllPermissions(user: UserWithRole, permissionIds: string[]): boolean {
  if (!user.role) return false
  return permissionIds.every((id) => user.role!.permissions.includes(id))
}

// Get all permissions for a specific module
export function getModulePermissions(permissions: Permission[], module: string): Permission[] {
  return permissions.filter((p) => p.module === module)
}

// Standard permission structure for the application
export const PERMISSIONS: Permission[] = [
  // Properties module
  { id: "properties.view", name: "View Properties", module: "properties", action: "view" },
  { id: "properties.create", name: "Create Properties", module: "properties", action: "create" },
  { id: "properties.edit", name: "Edit Properties", module: "properties", action: "edit" },
  { id: "properties.delete", name: "Delete Properties", module: "properties", action: "delete" },

  // Rooms module
  { id: "rooms.view", name: "View Rooms", module: "rooms", action: "view" },
  { id: "rooms.create", name: "Create Rooms", module: "rooms", action: "create" },
  { id: "rooms.edit", name: "Edit Rooms", module: "rooms", action: "edit" },
  { id: "rooms.delete", name: "Delete Rooms", module: "rooms", action: "delete" },

  // Bookings module
  { id: "bookings.view", name: "View Bookings", module: "bookings", action: "view" },
  { id: "bookings.create", name: "Create Bookings", module: "bookings", action: "create" },
  { id: "bookings.edit", name: "Edit Bookings", module: "bookings", action: "edit" },
  { id: "bookings.delete", name: "Delete Bookings", module: "bookings", action: "delete" },
  { id: "bookings.checkin", name: "Check-in Guests", module: "bookings", action: "checkin" },
  { id: "bookings.checkout", name: "Check-out Guests", module: "bookings", action: "checkout" },

  // Guests module
  { id: "guests.view", name: "View Guests", module: "guests", action: "view" },
  { id: "guests.create", name: "Create Guests", module: "guests", action: "create" },
  { id: "guests.edit", name: "Edit Guests", module: "guests", action: "edit" },
  { id: "guests.delete", name: "Delete Guests", module: "guests", action: "delete" },

  // Finance module
  { id: "finance.view", name: "View Financial Data", module: "finance", action: "view" },
  { id: "finance.manage", name: "Manage Payments", module: "finance", action: "manage" },
  { id: "finance.reports", name: "Generate Reports", module: "finance", action: "reports" },

  // Users module
  { id: "users.view", name: "View Users", module: "users", action: "view" },
  { id: "users.create", name: "Create Users", module: "users", action: "create" },
  { id: "users.edit", name: "Edit Users", module: "users", action: "edit" },
  { id: "users.delete", name: "Delete Users", module: "users", action: "delete" },

  // Roles module
  { id: "roles.view", name: "View Roles", module: "roles", action: "view" },
  { id: "roles.manage", name: "Manage Roles", module: "roles", action: "manage" },
]

// Predefined roles
export const PREDEFINED_ROLES: Role[] = [
  {
    id: "owner",
    name: "Owner",
    description: "Full access to all features and settings",
    permissions: PERMISSIONS.map((p) => p.id), // All permissions
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "manager",
    name: "Manager",
    description: "Can manage properties, bookings, and staff",
    permissions: PERMISSIONS.filter(
      (p) => !p.id.includes("users.delete") && !p.id.includes("roles.manage") && !p.id.includes("properties.delete"),
    ).map((p) => p.id),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "receptionist",
    name: "Receptionist",
    description: "Can manage bookings and guests",
    permissions: PERMISSIONS.filter(
      (p) => p.module === "bookings" || p.module === "guests" || p.id === "rooms.view" || p.id === "properties.view",
    ).map((p) => p.id),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "accountant",
    name: "Accountant",
    description: "Can access financial data and reports",
    permissions: PERMISSIONS.filter(
      (p) => p.module === "finance" || p.id === "bookings.view" || p.id === "guests.view",
    ).map((p) => p.id),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
