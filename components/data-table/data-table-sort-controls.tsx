"use client"

import { useState, useEffect } from "react"
import type { Table } from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTableSortControlsProps<TData> {
  table: Table<TData>
}

export function DataTableSortControls<TData>({ table }: DataTableSortControlsProps<TData>) {
  const [sortableColumns, setSortableColumns] = useState<{ id: string; label: string }[]>([])
  const [selectedColumn, setSelectedColumn] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Get all sortable columns on component mount
  useEffect(() => {
    const columns = table
      .getAllColumns()
      .filter((column) => column.getCanSort())
      .map((column) => ({
        id: column.id,
        label: column.id.charAt(0).toUpperCase() + column.id.slice(1).replace(/([A-Z])/g, " $1"),
      }))

    setSortableColumns(columns)

    // Set initial values if table is already sorted
    const currentSorting = table.getState().sorting[0]
    if (currentSorting) {
      setSelectedColumn(currentSorting.id)
      setSortDirection(currentSorting.desc ? "desc" : "asc")
    } else if (columns.length > 0) {
      setSelectedColumn(columns[0].id)
    }
  }, [table])

  // Apply sorting when controls change
  const handleSortChange = (columnId: string, direction: "asc" | "desc") => {
    setSelectedColumn(columnId)
    setSortDirection(direction)

    const column = table.getColumn(columnId)
    if (column) {
      column.toggleSorting(direction === "desc")
    }
  }

  if (sortableColumns.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-start mb-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
        <Select value={selectedColumn} onValueChange={(value) => handleSortChange(value, sortDirection)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select column" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Columns</SelectLabel>
              {sortableColumns.map((column) => (
                <SelectItem key={column.id} value={column.id}>
                  {column.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Order:</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-[120px] justify-between">
              {sortDirection === "asc" ? "A to Z" : "Z to A"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[120px]">
            <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => handleSortChange(selectedColumn, "asc")}
                className={sortDirection === "asc" ? "bg-accent" : ""}
              >
                A to Z
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange(selectedColumn, "desc")}
                className={sortDirection === "desc" ? "bg-accent" : ""}
              >
                Z to A
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
