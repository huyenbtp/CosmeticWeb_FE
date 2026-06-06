import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { IExportItemUI } from "@/interfaces/exportItem.interface";
import Combobox from "@/components/layout/Combobox";
import { IBatch } from "@/interfaces/batch.interface";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

const mockBatches: IBatch[] = [
  {
    _id: "1",
    batch_code: "1",
    batch_number: "2026000001",
    product: {
      _id: "",
      name: "",
      image: "",
      sku: "",
    },
    mfg_date: "",
    exp_date: "",
    remaining_qty: 10
  },
  {
    _id: "2",
    batch_code: "1",
    batch_number: "2026000002",
    product: {
      _id: "",
      name: "",
      image: "",
      sku: "",
    },
    mfg_date: "",
    exp_date: "",
    remaining_qty: 10
  },
  {
    _id: "3",
    batch_code: "1",
    batch_number: "2026000003",
    product: {
      _id: "",
      name: "",
      image: "",
      sku: "",
    },
    mfg_date: "",
    exp_date: "",
    remaining_qty: 10
  },
  {
    _id: "4",
    batch_code: "1",
    batch_number: "2026000004",
    product: {
      _id: "",
      name: "",
      image: "",
      sku: "",
    },
    mfg_date: "",
    exp_date: "",
    remaining_qty: 10
  },
  {
    _id: "5",
    batch_code: "1",
    batch_number: "2026000005",
    product: {
      _id: "",
      name: "",
      image: "",
      sku: "",
    },
    mfg_date: "",
    exp_date: "",
    remaining_qty: 10
  },
]

export default function AddEditExportItemsTable({
  data,
  handleChangeBatch,
  handleUpdateQuantity,
  handleUpdateNotes,
  handleRemoveItem,
}: {
  data: IExportItemUI[];
  handleChangeBatch: (id: string, value: IBatch) => void;
  handleUpdateQuantity: (id: string, value: number) => void;
  handleUpdateNotes: (id: string, value: string) => void;
  handleRemoveItem: (id: string) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/30">
          <TableHead>Product</TableHead>
          <TableHead>Suggested Batch</TableHead>
          <TableHead className="text-center">Qty</TableHead>
          <TableHead>Actual Batch</TableHead>
          <TableHead className="text-center">Actual Qty</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item) => (
          <TableRow key={`${item.suggested_batch_id}-${item.product_id}`}>
            <TableCell className="max-w-48 pr-6" title={item.product.name}>
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

            <TableCell className="w-1/9 ">
              <Badge variant={"secondary"}>
                {item.suggested_batch_number}
              </Badge>
            </TableCell>

            <TableCell className="w-1/10 text-center">
              {item.suggested_quantity}
            </TableCell>

            <TableCell className="w-1/8 ">
              <Combobox
                items={mockBatches || []}
                selectedValue={item.actual_batch_id}
                onChange={(value) => {
                  const newBatch = mockBatches.find(item => item._id === value);
                  if (newBatch) handleChangeBatch(item.actual_batch_id, newBatch);
                }}
                getLabel={(b) => b.batch_number}
                getValue={(b) => b._id}
                placeholder="Select Batch"
                emptyText="No batch found."
                variant="input"
                classname="h-9"
                getDisabled={(batch) => data.some(b => b.actual_batch_id === batch._id)}
              />
            </TableCell>

            <TableCell className="text-center px-6">
              <Input
                type="number"
                value={item.actual_quantity}
                onChange={(e) => handleUpdateQuantity(item.actual_batch_id, Number(e.target.value) || 0)}
                className="w-12 px-1"
                min="1"
              />
            </TableCell>

            <TableCell className="">
              <Input
                value={item.notes}
                onChange={(e) => handleUpdateNotes(item.actual_batch_id, e.target.value)}
                className="w-full"
                placeholder="Enter notes"
              />
            </TableCell>

            <TableCell className="text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => handleRemoveItem(item.actual_batch_id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell colSpan={7}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { }}
            >
              <Plus className="w-4 h-4" />
              Add new row
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}