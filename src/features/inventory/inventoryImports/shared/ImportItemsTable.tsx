
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { IImportItemUI } from "@/interfaces/importItem.interface";
import dayjs from "dayjs";

export default function ImportItemsTable({
  data,
  handleUpdateQuantity,
  handleUpdateUnitCost,
  handleRemoveItem,
}: {
  data: IImportItemUI[];
  handleUpdateQuantity: (id: string, value: number) => void;
  handleUpdateUnitCost: (id: string, value: number) => void;
  handleRemoveItem: (id: string) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Batch Number</TableHead>
          <TableHead>Batch Code</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Unit Cost (đ)</TableHead>
          <TableHead>Total Cost</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item) => (
          <TableRow key={item.batch_id}>
            <TableCell className="w-12/100 font-medium">
              {item.batch.batch_number}
            </TableCell>

            <TableCell className="w-15/100 text-muted-foreground">
              {item.batch.batch_code}
            </TableCell>

            <TableCell className="w-16/100 max-w-60 pr-8" title={item.batch.product.name}>
              <div className="font-medium truncate">{item.batch.product.name}</div>
            </TableCell>

            <TableCell className="w-10/100 text-muted-foreground">
              {item.batch.product.sku}
            </TableCell>


            <TableCell className="w-11/100">
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => handleUpdateQuantity(item.batch_id, Number(e.target.value) || 0)}
                className="w-18 px-1"
                min="1"
              />
            </TableCell>

            <TableCell className="w-12/100">
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={item.unit_price}
                  onChange={(e) => handleUpdateUnitCost(item.batch_id, Number(e.target.value) || 0)}
                  className="w-24 px-1"
                  min="0"
                />
              </div>
            </TableCell>

            <TableCell className="w-12/100 font-medium">
              {(item.unit_price * item.quantity).toLocaleString()} đ
            </TableCell>

            <TableCell className=" text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => handleRemoveItem(item.batch_id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}