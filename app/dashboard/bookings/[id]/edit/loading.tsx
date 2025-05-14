import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function EditBookingLoading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <Skeleton className="h-10 w-[250px] mb-2" />
          <Skeleton className="h-4 w-[350px]" />
        </div>
        <Skeleton className="h-10 w-[100px]" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Guest Information Card Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-[180px]" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="rounded-md bg-muted p-4">
              <Skeleton className="h-5 w-[150px] mb-2" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Details Card Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-[180px]" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dates Card Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-[100px]" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="rounded-md bg-muted p-4">
              <Skeleton className="h-5 w-[150px] mb-2" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status and Requests Card Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-[180px]" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-10 w-[150px]" />
      </div>
    </div>
  )
}
