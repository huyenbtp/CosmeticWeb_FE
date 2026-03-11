
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, TrendingDown } from "lucide-react";
import { IOutOfStockItem } from "@/interfaces/stock.interface";
import dayjs from "dayjs";

export default function OutOfStockCard({
  data,
}: {
  data: IOutOfStockItem[]
}) {

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 ">
            <TrendingDown className="text-red-500 dark:text-error" />
            Out of Stock Items
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
          {data.map((item) => (
            <div key={item.name} className="p-4 border rounded-lg bg-error1/30">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.category} • {item.brand}
                  </p>
                </div>
                <Badge variant="destructive">Out of Stock</Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Last ordered: {dayjs(item.last_imported).format("MMM D, YYYY")}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}