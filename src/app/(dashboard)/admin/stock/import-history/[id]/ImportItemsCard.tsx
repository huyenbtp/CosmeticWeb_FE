
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { IImportDetail } from "@/interfaces/import.interface";

export default function ImportItemsCard({
  data,
}: {
  data: IImportDetail
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Items</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Sku</TableHead>
              <TableHead className="text-center">Qty</TableHead>
              <TableHead className="text-right">Unit Cost</TableHead>
              <TableHead className="text-right pr-6">Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.items.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="w-2/8 max-w-60 pr-6" title={item.product.name}>
                  <div className="flex items-center gap-3">
                    <ImageWithFallback
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 truncate">
                      <div className="font-medium truncate">{item.product.name}</div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="w-2/8 text-muted-foreground">
                  {item.product.sku}
                </TableCell>

                <TableCell className="w-1/8 text-center">
                  {item.quantity}
                </TableCell>

                <TableCell className="w-1/8 text-right">
                  {item.unit_price.toLocaleString()} đ
                </TableCell>

                <TableCell className="text-right font-medium">
                  {(item.unit_price * item.quantity).toLocaleString()} đ
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-between font-bold text-xl pt-4 mt-4 border-t">
          <span>Total</span>
          <span>{data.total_amount.toLocaleString()} đ</span>
        </div>
      </CardContent>
    </Card>
  );
}