
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { IOrderDetail } from "@/interfaces/order.interface";
import { CreditCard, MapPin, UserStar } from "lucide-react";
import { getOrderPaymentStatusBadge } from "../management/OrdersFilter";

export default function OrderInformation({
  data,
}: {
  data: IOrderDetail
}) {
  return (
    <>
      {/* notes */}
      {data.notes && (
        <Card>
          <CardHeader>
            <CardTitle className="">Order Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-accent-foreground">{data.notes}</p>
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
              <div className="font-medium">{data.customer.full_name}</div>
              <div className="text-sm text-muted-foreground">{data.customer.email}</div>
              <div className="text-sm text-muted-foreground">{data.customer.phone}</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Shipping  Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <MapPin className="w-5 h-5" />
            Shipping Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <div className="text-sm">Receiver: {data.receiver_name}</div>
            <div className="text-sm">Phone number: {data.phone}</div>
            <div className="text-sm">{data.address_line}</div>
            <div className="text-sm">{data.ward}, {data.district}</div>
            <div className="text-sm">{data.city}</div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
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
              {getOrderPaymentStatusBadge(data.payment_status)}
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Method</span>
              <span>{data.payment_method === "cod" ? "COD" : "Bank Transfer"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}