
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { IOrderDetail } from "@/interfaces/order.interface";
import { CreditCard, User, UserStar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getOrderStatusBadge } from "../OrdersFilter";

export default function OrderInformation({
  data,
}: {
  data: IOrderDetail
}) {
  return (
    <>
      {/* notes */}
      {data.note && (
        <Card>
          <CardHeader>
            <CardTitle className="">Order Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-accent-foreground">{data.note}</p>
          </CardContent>
        </Card>
      )}
      
      {/* Customer Information
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <User className="w-5 h-5" />
            Cashier Information
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <div className="space-y-1">
            <div className="font-medium">{data.cashier.full_name}</div>
            <div className="text-sm text-muted-foreground">Staff code: {data.cashier.staff_code}</div>
          </div>
        </CardContent>
      </Card>
      */}

      {/* Customer Information */}
      {data.customer && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <UserStar className="w-5 h-5" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <div className="font-medium">{data.customer.name}</div>
              <div className="text-sm text-muted-foreground">{data.customer.phone}</div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <CreditCard className="w-5 h-5" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              {getOrderStatusBadge(data.payment_status)}
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Method</span>
              <span>{data.payment_method === "cash" ? "Cash" : "Bank Transfer"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}