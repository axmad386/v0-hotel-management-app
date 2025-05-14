"use client"

import type { ReactNode } from "react"
import { useAuth } from "@/lib/contexts/auth-context"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface PermissionGuardProps {
  children: ReactNode
  requiredPermission?: string
  requiredPermissions?: string[]
  requireAll?: boolean
  fallback?: ReactNode
}

export function PermissionGuard({
  children,
  requiredPermission,
  requiredPermissions = [],
  requireAll = false,
  fallback,
}: PermissionGuardProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = useAuth()

  // Add single permission to array if provided
  if (requiredPermission) {
    requiredPermissions = [...requiredPermissions, requiredPermission]
  }

  // Check permissions
  const hasAccess = requireAll ? hasAllPermissions(requiredPermissions) : hasAnyPermission(requiredPermissions)

  // If user has access, render children
  if (hasAccess) {
    return <>{children}</>
  }

  // If fallback is provided, render it
  if (fallback) {
    return <>{fallback}</>
  }

  // Default fallback
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Access Denied</AlertTitle>
      <AlertDescription>You don't have permission to access this resource.</AlertDescription>
    </Alert>
  )
}
