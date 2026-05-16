
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { IImportItemUI } from "@/interfaces/importItem.interface";
import dayjs from "dayjs";

export default function ImportItemsTable({
  data,
  handleUpdateBatchCode,
  handleUpdateQuantity,
  handleUpdateUnitCost,
  handleUpdateMfgDate,
  handleUpdateExpDate,
  handleRemoveItem,
}: {
  data: IImportItemUI[];
  handleUpdateBatchCode: (id: string, value: string) => void;
  handleUpdateQuantity: (id: string, value: number) => void;
  handleUpdateUnitCost: (id: string, value: number) => void;
  handleUpdateMfgDate: (id: string, value: string) => void;
  handleUpdateExpDate: (id: string, value: string) => void;
  handleRemoveItem: (id: string) => void;
}) {
  return (
    <Table className="w-[1500px]">
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>SKU</TableHead>
          <TableHead>Batch Code</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Unit Cost (đ)</TableHead>
          <TableHead>Total Cost</TableHead>
          <TableHead>Mfg Date</TableHead>
          <TableHead>Exp Date</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item) => (
          <TableRow key={item.product_id}>
            <TableCell className="w-12/100 max-w-48 pr-6" title={item.product.name}>
              <div className="font-medium truncate">{item.product.name}</div>
            </TableCell>

            <TableCell className="w-14/100 text-muted-foreground">
              {item.product.sku}
            </TableCell>

            <TableCell className="w-16/100 text-muted-foreground">
              <Input
                value={item.batch_code}
                onChange={(e) => handleUpdateBatchCode(item.product_id, e.target.value)}
                className="w-48 px-2"
              />
            </TableCell>

            <TableCell className="w-8/100">
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => handleUpdateQuantity(item.product_id, Number(e.target.value) || 0)}
                className="w-18 px-1"
                min="1"
              />
            </TableCell>

            <TableCell className="w-10/100">
              <div className="flex items-center gap-1">
                <Input
                  type="number"
                  value={item.unit_price}
                  onChange={(e) => handleUpdateUnitCost(item.product_id, Number(e.target.value) || 0)}
                  className="w-24 px-1"
                  min="0"
                />
              </div>
            </TableCell>

            <TableCell className="w-10/100 font-medium">
              {(item.unit_price * item.quantity).toLocaleString()} đ
            </TableCell>

            <TableCell className="w-12/100">
              <Input
                type="date"
                value={dayjs(item.mfg_date).format("YYYY-MM-DD")}
                onChange={(e) => handleUpdateMfgDate(item.product_id, e.target.value)}
                className="w-34 px-1"
              />
            </TableCell>

            <TableCell className="w-12/100">
              <Input
                type="date"
                value={dayjs(item.exp_date).format("YYYY-MM-DD")}
                onChange={(e) => handleUpdateExpDate(item.product_id, e.target.value)}
                className="w-34 px-1"
              />
            </TableCell>

            <TableCell className="w-10/100 text-center">
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