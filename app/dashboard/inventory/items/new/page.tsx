"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { sampleInventoryCategories } from "@/lib/models/inventory"

// Form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Item name must be at least 2 characters." }),
  categoryId: z.string({ required_error: "Please select a category." }),
  description: z.string().optional(),
  sku: z.string().min(3, { message: "SKU must be at least 3 characters." }),
  unitOfMeasure: z.string().min(1, { message: "Unit of measure is required." }),
  costPerUnit: z.coerce.number().positive({ message: "Cost must be a positive number." }),
  currentStock: z.coerce.number().nonnegative({ message: "Stock cannot be negative." }),
  reorderPoint: z.coerce.number().nonnegative({ message: "Reorder point cannot be negative." }),
  reorderQuantity: z.coerce.number().positive({ message: "Reorder quantity must be positive." }),
  location: z.string().optional(),
  propertyId: z.string().optional(),
  supplier: z.string().optional(),
})

export default function AddInventoryItemPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      sku: "",
      unitOfMeasure: "piece",
      costPerUnit: 0,
      currentStock: 0,
      reorderPoint: 0,
      reorderQuantity: 0,
      location: "",
      supplier: "",
    },
  })

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log("Item created:", values)

      toast({
        title: "Success",
        description: "Inventory item has been created.",
      })

      // Redirect to inventory page after successful submission
      router.push("/dashboard/inventory")
    } catch (error) {
      console.error("Error creating item:", error)
      toast({
        title: "Error",
        description: "Failed to create inventory item. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/dashboard/inventory">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Add Inventory Item</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Item Information</CardTitle>
          <CardDescription>
            Add a new item to your inventory. Fill in the details below to create a new inventory item.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Bath Towels" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sampleInventoryCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., LIN-BT-001" {...field} />
                      </FormControl>
                      <FormDescription>A unique identifier for this item</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="unitOfMeasure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit of Measure</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="piece">Piece</SelectItem>
                          <SelectItem value="set">Set</SelectItem>
                          <SelectItem value="box">Box</SelectItem>
                          <SelectItem value="bottle">Bottle</SelectItem>
                          <SelectItem value="roll">Roll</SelectItem>
                          <SelectItem value="pack">Pack</SelectItem>
                          <SelectItem value="case">Case</SelectItem>
                          <SelectItem value="kg">Kilogram</SelectItem>
                          <SelectItem value="liter">Liter</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="costPerUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost Per Unit ($)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="currentStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Stock</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reorderPoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reorder Point</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormDescription>Stock level at which to reorder</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reorderQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reorder Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" {...field} />
                      </FormControl>
                      <FormDescription>How many units to order when restocking</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Storage Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Main Storage" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supplier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supplier</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Linen Suppliers Inc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter a description of the item" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link href="/dashboard/inventory">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Item
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
