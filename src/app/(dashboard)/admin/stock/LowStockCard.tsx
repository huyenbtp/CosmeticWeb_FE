
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ExternalLink } from "lucide-react";
import { ILowStockItem } from "@/interfaces/stock.interface";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

export default function LowStockCard({
  data,
}: {
  data: ILowStockItem[]
}) {

  const getStockLevelInfo = (stock_quantity: number) => {
    if (stock_quantity <= 10) return { level: "critical", style: "bg-error1 text-error1-foreground" };
    return { level: "low", style: "bg-warning1 text-warning1-foreground" };
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 ">
            <AlertTriangle className="text-yellow-500 dark:text-warning1-foreground" />
            Low Stock Items
          </CardTitle>

          {data.length > 0 &&
            <Button
              variant="ghost"
              size='sm'
            >
              View All
              <ExternalLink className="ml-1" />
            </Button>
          }
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {data.length > 0 ? data.map((item) => {
            const stockInfo = getStockLevelInfo(item.stock_quantity);

            return (
              <div key={item.name} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.category} • {item.brand}
                    </p>
                  </div>
                  <Badge
                    variant={stockInfo.level === "critical" ? "destructive" : "secondary"}
                  >
                    {item.stock_quantity} left
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <div className="text-sm text-muted-foreground">
                      Last ordered: {dayjs(item.last_imported).format("MMM D, YYYY")}
                    </div>
                  </div>

                </div>
              </div>
            );
          }) : (
            <p className="py-20 text-center text-muted-foreground">
              There are currently no low stock products.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}