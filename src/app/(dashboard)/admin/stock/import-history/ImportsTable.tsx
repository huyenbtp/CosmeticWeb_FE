import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, } from "lucide-react";
import { IImport } from "@/interfaces/import.interface";
import dayjs from "dayjs";
import { capitalizeWords } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

export function getStatusStyle(status: string) {
  if (status === "paid") {
    return "bg-success1 text-success1-foreground"
  } else if (status === "unpaid") {
    return "bg-error1 text-error1-foreground"
  }
};

export default function ImportsTable({
  loading,
  data,
  onView,
}: {
  loading: boolean;
  data: IImport[];
  onView: (id: string) => void;
}) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Import Code</TableHead>
          <TableHead>Created By</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-center">Products Updated</TableHead>
          <TableHead className="text-center">Items Imported</TableHead>
          <TableHead className="text-right pr-4">Total Amount</TableHead>
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
            <TableCell className="w-20/100 font-medium">
              {item.import_code}
            </TableCell>

            <TableCell className="w-22/100 max-w-80 pr-8" title={item.staff?.full_name}>
              <div>
                <div className="font-medium">{item.staff?.full_name}</div>
                <div className="text-muted-foreground ">S.Code: {item.staff?.staff_code}</div>
              </div>
            </TableCell>

            <TableCell className="w-9/100 text-muted-foreground">
              {dayjs(item.createdAt).format("DD/MM/YYYY")}
            </TableCell>

            <TableCell className="w-14/100 text-center text-muted-foreground">
              {item.products_updated}
            </TableCell>

            <TableCell className="w-14/100 text-center font-medium">
              {item.items_imported}
            </TableCell>

            <TableCell className="w-12/100 text-right font-medium pr-4">
              {item.total_amount.toLocaleString()} đ
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
              Không có dữ liệu
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}