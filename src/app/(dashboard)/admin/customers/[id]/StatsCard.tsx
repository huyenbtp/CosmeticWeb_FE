import { Card, CardContent, } from "@/components/ui/card";
import { Package, ShoppingBag, Star } from "lucide-react";
import { ICustomerDetail } from "@/interfaces/customer.interface";

export default function StatsCard({
  data,
} : {
  data: ICustomerDetail
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent>
          <div className="flex items-center gap-5">
            <ShoppingBag className="w-6 h-6 text-primary" />
            <div>
              <div className="text-2xl font-bold">{data.totalPurchases}</div>
              <div className="text-muted-foreground">Total Purchases</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{data.totalSpent.toLocaleString()} VND</div>
          <div className="text-muted-foreground">Total Spent</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{data.averagePurchaseValue.toLocaleString()} VND</div>
          <div className="text-muted-foreground">Avg Order Value</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center gap-5">
              <Star className="w-6 h-6 text-yellow-500" />
            <div>
          <div className="text-2xl font-bold">{data.points.toLocaleString()}</div>
          <div className="text-muted-foreground">Loyalty Points</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}