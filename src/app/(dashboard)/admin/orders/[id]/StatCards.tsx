import { Card, CardContent, } from "@/components/ui/card";
import { Package, Star } from "lucide-react";
import { IOrderDetail } from "@/interfaces/order.interface";

export default function StatCards({
  data,
} : {
  data: IOrderDetail
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent>
          <div className="flex items-center gap-5">
            <Package className="w-6 h-6 text-primary" />
            <div>
              <div className="text-2xl font-bold">{data.total_items}</div>
              <div className="text-muted-foreground">Items</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{data.subtotal.toLocaleString()} VND</div>
          <div className="text-muted-foreground">Subtotal</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center gap-5">
              <Star className="w-6 h-6 text-yellow-500" />
            <div>
          <div className="text-2xl font-bold">{(data.discount_amount + data.points_used).toLocaleString()}</div>
          <div className="text-muted-foreground">Total Discount</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{data.total.toLocaleString()} VND</div>
          <div className="text-muted-foreground">Total Amount</div>
        </CardContent>
      </Card>
    </div>
  )
}