import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { IExportDetail } from "@/interfaces/export.inerface";
import { Badge } from "@/components/ui/badge";
import { IExportItem } from "@/interfaces/exportItem.interface";

export default function ExportItemsTable({
  data,
}: {
  data: IExportItem[]
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/30">
          <TableHead className="text-center pr-6">#</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Batch</TableHead>
          <TableHead className="text-center">Qty</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item._id}>
            <TableCell className="text-center pr-6">
              {index + 1}
            </TableCell>
            <TableCell className="max-w-60 pr-6" title={item.product.name}>
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    SKU: {item.product.sku}
                  </p>
                </div>
              </div>
            </TableCell>

            <TableCell className=" ">
              <Badge variant={"secondary"}>
                {item.batch.batch_number}
                </Badge>              
            </TableCell>

            <TableCell className="text-center px-6">
              {item.quantity}
            </TableCell>

            <TableCell className=" ">
              {item.notes}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}