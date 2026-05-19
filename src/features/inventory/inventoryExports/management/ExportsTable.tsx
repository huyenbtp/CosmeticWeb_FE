import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, } from "lucide-react";
import { IExport } from "@/interfaces/export.inerface";
import dayjs from "dayjs";
import { Spinner } from "@/components/ui/spinner";
import { getProductExportTypeBadge } from "./ExportsFilter";

export function getStatusStyle(status: string) {
  if (status === "paid") {
    return "bg-success1 text-success1-foreground"
  } else if (status === "unpaid") {
    return "bg-error1 text-error1-foreground"
  }
};

export default function ExportsTable({
  loading,
  data,
  onView,
}: {
  loading: boolean;
  data: IExport[];
  onView: (id: string) => void;
}) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Export Code</TableHead>
          <TableHead>Created By</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-center">Items</TableHead>
          <TableHead className="text-center">Total Amount</TableHead>
          <TableHead className="text-center">Type</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={7} align="center">
              <Spinner className="size-10" />
            </TableCell>
          </TableRow>
        ) : data.length > 0 ? (data.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="w-14/100 font-medium">
              {item.export_code}
            </TableCell>

            <TableCell className="w-18/100 max-w-80 pr-8" title={item.staff?.full_name}>
              <div>
                <div className="font-medium">{item.staff?.full_name}</div>
                <div className="text-muted-foreground ">S.Code: {item.staff?.staff_code}</div>
              </div>
            </TableCell>

            <TableCell className="w-16/100 text-muted-foreground">
              {dayjs(item.createdAt).format("DD/MM/YYYY - hh:mm a")}
            </TableCell>

            <TableCell className="w-12/100 text-center font-medium">
              {item.items_exported}
            </TableCell>

            <TableCell className="w-16/100 text-center font-medium">
              {item.total_amount.toLocaleString()} đ
            </TableCell>

            <TableCell className="w-16/100 text-center">
              {getProductExportTypeBadge(item.type)}
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
            </TableCell>
          </TableRow>
        ))) : (
          <TableRow>
            <TableCell colSpan={7} align="center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}