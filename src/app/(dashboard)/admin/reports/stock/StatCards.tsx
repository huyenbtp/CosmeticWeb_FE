import { Card, CardContent, } from "@/components/ui/card";
import { AlertTriangle, CircleX, Package } from "lucide-react";
import { IStockStats } from "@/interfaces/stock.interface";

export default function StatCards({
  data,
}: {
  data: IStockStats
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent>
          <div className="flex items-center gap-5">
            <Package className="w-6 h-6 text-primary" />
            <div>
              <div className="text-2xl font-bold">{data.totalItems}</div>
              <div className="text-muted-foreground">Total Items In Stock</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="text-2xl font-bold text-green-600 dark:text-success1-foreground">{data.totalValue.toLocaleString()} VND</div>
          <div className="text-muted-foreground">Total Stock Value</div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center gap-5">
            <AlertTriangle className="w-6 h-6 text-yellow-500 dark:text-warning1-foreground" />
            <div>
              <div className="text-2xl font-bold">{data.lowStockCount} item{data.lowStockCount > 1 && "s"}</div>
              <div className="text-muted-foreground">In Low Stock</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center gap-5">
            <CircleX className="w-6 h-6 text-red-500 dark:text-error" />
            <div>
              <div className="text-2xl font-bold">{data.outOfStockCount} item{data.outOfStockCount > 1 && "s"}</div>
              <div className="text-muted-foreground">Out of Stock</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}