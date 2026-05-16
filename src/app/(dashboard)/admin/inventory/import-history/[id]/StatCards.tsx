import { Card, CardContent, } from "@/components/ui/card";
import { Package } from "lucide-react";
import { IImportDetail } from "@/interfaces/import.interface";
import dayjs from "dayjs";

export default function StatCards({
  data,
}: {
  data: IImportDetail
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent>
          <div>
            <div className="text-2xl font-bold">{data.products_updated}</div>
            <div className="text-muted-foreground">Products Updated</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center gap-5">
            <Package className="w-6 h-6 text-primary" />
            <div>
              <div className="text-2xl font-bold text-primary">{data.items_imported}</div>
              <div className="text-muted-foreground">Total Items</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center gap-5">
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-success1-foreground">{(data.total_amount).toLocaleString()}</div>
              <div className="text-muted-foreground">Total Amount</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div>
            <div className="text-2xl font-bold">{dayjs(data.updatedAt).format("DD/MM/YYYY")}</div>
            <div className="text-muted-foreground">Last Updated</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}