import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2, } from "lucide-react";
import { IBatch } from "@/interfaces/batch.interface";
import dayjs from "dayjs";
import { capitalizeWords, getDaysBetweenTwoDates } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { useRouter } from "next/navigation";

export default function BatchesTable({
  loading,
  data,
  onView,
  onEdit,
  onDelete,
}: {
  loading: boolean;
  data: IBatch[];
  onView: (id: string) => void;
  onEdit: (item: IBatch) => void;
  onDelete: (item: IBatch) => void;
}) {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Batch Number</TableHead>
          <TableHead>Batch Code</TableHead>
          <TableHead>Product</TableHead>
          <TableHead className="text-center">Exp Date</TableHead>
          <TableHead className="text-center">Remaining</TableHead>
          <TableHead className="text-center">Current Stock</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={8} align="center">
              <Spinner className="size-10" />
            </TableCell>
          </TableRow>
        ) : data.length > 0 ? (data.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="w-12/100 font-medium">
              {item.batch_number}
            </TableCell>
            <TableCell className="w-14/100 font-medium">
              {item.batch_code}
            </TableCell>

            <TableCell className="w-18/100 max-w-80 pr-6" title={item.product.name}>
              <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => {router.push(`../products/${item.product._id}`)}}
              >
                <ImageWithFallback
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 truncate">
                  <div className="font-medium truncate">{item.product.name}</div>
                  <div className="text-muted-foreground">SKU: {item.product.sku}</div>
                </div>
              </div>
            </TableCell>

            <TableCell className="w-12/100 text-center text-muted-foreground">
              {item.exp_date ? dayjs(item.exp_date).format("DD/MM/YYYY") : "N/A"}
            </TableCell>

            <TableCell className="w-12/100 text-center font-medium pr-4">
              {getDaysBetweenTwoDates(item.exp_date, new Date().toISOString())} days
            </TableCell>

            <TableCell className="w-10/100 text-center font-medium pr-4">
              {item.remaining_qty}
            </TableCell>

            <TableCell className="text-center">
              <Button
                variant="ghost"
                size="sm"
                title="View Detail"
                onClick={() => { onView(item._id) }}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                title="Edit"
                onClick={() => { onEdit(item) }}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                title="Delete"
                onClick={() => { onDelete(item) }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))) : (
          <TableRow>
            <TableCell colSpan={8} align="center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}