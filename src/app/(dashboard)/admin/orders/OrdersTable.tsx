import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, } from "lucide-react";
import { IOrder } from "@/interfaces/order.interface";
import dayjs from "dayjs";
import { capitalizeWords } from "@/lib/utils";

export function getStatusStyle(status: string) {
  if (status === "paid") {
    return "bg-success1 text-success1-foreground"
  } else if (status === "unpaid") {
    return "bg-error1 text-error1-foreground"
  }
};

export default function OrdersTable({
  data,
  onView,
  onEdit,
}: {
  data: IOrder[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order Code</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead className="text-right pr-8">Total</TableHead>
          <TableHead className="text-center">Payment Method</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length > 0 ? (data.map((order) => (
          <TableRow key={order._id}>
            <TableCell className="w-18/100 font-medium">
              {order.order_code}
            </TableCell>

            <TableCell className="w-16/100 max-w-80 pr-8" title={order.customer?.name}>
              <div>
                <div className="font-medium">{order.customer?.name}</div>
                <div className="text-muted-foreground">{order.customer?.phone}</div>
              </div>
            </TableCell>

            <TableCell className="w-16/100 text-muted-foreground">
              {dayjs(order.createdAt).format("DD/MM/YYYY - HH:mm a")}
            </TableCell>

            <TableCell className="w-11/100 text-right font-medium">
              {order.total.toLocaleString()} đ
            </TableCell>

            <TableCell className="w-20/100 text-center text-muted-foreground">
              {order.payment_method === "cash" ? "Cash" : "Bank Transfer"}
            </TableCell>

            <TableCell className="w-10/100 font-medium">
              <Select
                defaultValue={order.payment_status}
                value={order.payment_status}
                onValueChange={() => { }}
              >
                <SelectTrigger size="xs" className={`w-fit text-xs shadow-none ${getStatusStyle(order.payment_status)}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paid" >Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>

            <TableCell className="text-center">
              <Button
                variant="ghost"
                size="sm"
                title="View Detail"
                onClick={() => { onView(order._id) }}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                title="Edit Order"
                onClick={() => { onEdit(order._id) }}
              >
                <Edit className="w-4 h-4" />
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