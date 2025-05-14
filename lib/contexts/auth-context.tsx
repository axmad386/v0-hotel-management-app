"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type UserWithRole, hasPermission, hasAnyPermission, hasAllPermissions } from "@/lib/models/rbac"

interface AuthContextType {
  user: UserWithRole | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  hasPermission: (permissionId: string) => boolean
  hasAnyPermission: (permissionIds: string[]) => boolean
  hasAllPermissions: (permissionIds: string[]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserWithRole | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // In a real app, this would check with your backend
        // For demo, we'll check localStorage
        const storedUser = localStorage.getItem("hotelUser")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Error checking session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // In a real app, this would authenticate with your backend
      // For demo, we'll simulate a successful login with a mock user
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user with role
      const mockUser: UserWithRole = {
        id: "1",
        name: "John Doe",
        email: email,
        roleId: "owner",
        role: {
          id: "owner",
          name: "Owner",
          description: "Full access to all features",
          permissions: [
            "properties.view",
            "properties.create",
            "properties.edit",
            "properties.delete",
            "rooms.view",
            "rooms.create",
            "rooms.edit",
            "rooms.delete",
            "bookings.view",
            "bookings.create",
            "bookings.edit",
            "bookings.delete",
            "bookings.checkin",
            "bookings.checkout",
            "guests.view",
            "guests.create",
            "guests.edit",
            "guests.delete",
            "finance.view",
            "finance.manage",
            "finance.reports",
            "users.view",
            "users.create",
            "users.edit",
            "users.delete",
            "roles.view",
            "roles.manage",
          ],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        active: true,
        lastLogin: new Date(),
      }

      setUser(mockUser)
      localStorage.setItem("hotelUser", JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("hotelUser")
  }

  // Permission check functions
  const checkPermission = (permissionId: string): boolean => {
    if (!user) return false
    return hasPermission(user, permissionId)
  }

  const checkAnyPermission = (permissionIds: string[]): boolean => {
    if (!user) return false
    return hasAnyPermission(user, permissionIds)
  }

  const checkAllPermissions = (permissionIds: string[]): boolean => {
    if (!user) return false
    return hasAllPermissions(user, permissionIds)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        hasPermission: checkPermission,
        hasAnyPermission: checkAnyPermission,
        hasAllPermissions: checkAllPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
