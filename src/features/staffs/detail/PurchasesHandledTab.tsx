
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { IStaffPurchasesHandled } from "@/interfaces/staff.interface";
import { capitalizeWords } from "@/lib/utils";
import dayjs from "dayjs";
import { ChevronRight } from "lucide-react";

export default function PurchasesHandledTab({
  data,
}: {
  data: IStaffPurchasesHandled[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchases Handled History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Code</TableHead>
              <TableHead>Customer Name</TableHead>
              <TableHead>Purchase Date</TableHead>
              <TableHead className="text-right pr-8">Total</TableHead>
              <TableHead className="text-center">Payment Method</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.length > 0 && data.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="w-2/9 font-medium">{item.order_code}</TableCell>
                <TableCell className="w-2/9 text-muted-foreground">{item.customerName}</TableCell>
                <TableCell className="w-2/9 text-muted-foreground">
                  {dayjs(item.date).format("DD/MM/YYYY - HH:mm a")}
                </TableCell>
                <TableCell className="w-1/9 text-right font-medium">
                  {item.final_amount.toLocaleString()} đ
                </TableCell>
                <TableCell className="w-2/9 text-center text-muted-foreground">
                  {capitalizeWords(item.payment_method)}
                </TableCell>
                <TableCell className="w-1/9 text-center">
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