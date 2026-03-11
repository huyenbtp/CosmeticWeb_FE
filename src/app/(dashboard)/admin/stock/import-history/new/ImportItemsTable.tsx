
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { IImportItemUI } from "@/interfaces/importItem.interface";

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
          <TableHead>Product</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Unit Cost</TableHead>
          <TableHead>Total Cost</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item) => (
          <TableRow key={item.product_id}>
            <TableCell className="w-28/100 max-w-48 pr-6" title={item.product.name}>
              <div className="font-medium truncate">{item.product.name}</div>
            </TableCell>

            <TableCell className="w-20/100 text-muted-foreground">
              {item.product.sku}
            </TableCell>

            <TableCell className="w-12/100">
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => handleUpdateQuantity(item.product_id, Number(e.target.value) || 0)}
                className="w-20"
                min="1"
              />
            </TableCell>

            <TableCell className="w-20/100">
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={item.unit_price}
                  onChange={(e) => handleUpdateUnitCost(item.product_id, Number(e.target.value) || 0)}
                  className="w-26"
                  min="0"
                />
                <span>đ</span>
              </div>
            </TableCell>

            <TableCell className="w-15/100 font-medium">
              {(item.unit_price * item.quantity).toLocaleString()} đ
            </TableCell>

            <TableCell className="text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => handleRemoveItem(item.product_id)}
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