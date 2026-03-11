
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { ICustomerDetail } from "@/interfaces/customer.interface";
import dayjs from "dayjs";
import { ChevronRight } from "lucide-react";

export default function PurchaseHistoryTab({
  data,
}: {
  data: ICustomerDetail;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Purchase ID</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="text-right pr-8">Total</TableHead>
              <TableHead className="text-center">Payment Method</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.purchases.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="w-1/8 font-medium">{item._id}</TableCell>
                <TableCell className="w-2/8 text-muted-foreground">
                  {dayjs(item.date).format("DD/MM/YYYY - HH:mm a")}
                </TableCell>
                <TableCell className="w-1/8 text-muted-foreground">
                  {item.total_items} items
                </TableCell>
                <TableCell className="w-1/8 text-right font-medium">
                  {item.final_amount.toLocaleString()} đ
                </TableCell>
                <TableCell className="w-2/8 text-center text-muted-foreground">
                  {item.payment_method}
                </TableCell>
                <TableCell className="w-1/8 text-center">
                  <Button variant="ghost" size="sm">
                    View Details
                    <ChevronRight />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}