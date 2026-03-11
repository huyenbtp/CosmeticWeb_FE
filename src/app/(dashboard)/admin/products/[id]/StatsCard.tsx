import { Card, CardContent, } from "@/components/ui/card";
import { Package } from "lucide-react";
import { IProductDetail } from "@/interfaces/product.interface";

export default function StatsCard({
  product,
}: {
  product: IProductDetail
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent>
          <div className="flex items-center gap-5">
            <Package className="w-6 h-6 text-primary" />
            <div>
              <div className="text-2xl font-bold">{product.stock_quantity}</div>
              <div className="text-muted-foreground">Total Stock</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="text-2xl font-bold">{product.totalSold}</div>
          <div className="text-muted-foreground">Total Sold</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 dark:text-success1-foreground">{product.totalRevenue.toLocaleString()} VND</div>
          <div className="text-muted-foreground">Total Revenue</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{product.selling_price.toLocaleString()} VND</div>
          <div className="text-muted-foreground">Selling Price</div>
        </CardContent>
      </Card>
    </div>
  )
}