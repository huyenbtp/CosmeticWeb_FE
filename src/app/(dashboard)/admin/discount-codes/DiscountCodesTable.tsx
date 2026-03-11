import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Copy } from "lucide-react";
import { IDiscountCode } from "@/interfaces/discountCode.interface";
import dayjs from "dayjs";

export function getStatusStyle(is_active: boolean) {
  if (is_active) {
    return "bg-success1 text-success1-foreground"
  } else {
    return "bg-error1 text-error1-foreground"
  }
};

export default function DiscountCodesTable({
  data,
  onEdit,
  onActiveChange,
}: {
  data: IDiscountCode[];
  onEdit: (id: string) => void;
  onActiveChange: (id: string, active: boolean) => void;
}) {

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Usage</TableHead>
          <TableHead>Min Order Value</TableHead>
          <TableHead>Start date</TableHead>
          <TableHead>End date</TableHead>
          <TableHead>Active</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length > 0 ? (data.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(item.code)}
                  title="Copy code"
                >
                  <Copy />
                </Button>
                <code className="px-2 py-1 bg-muted rounded text-sm font-mono ">
                  {item.code}
                </code>
              </div>
            </TableCell>

            <TableCell className=" font-medium">
              {item.value.toLocaleString()}{item.type === 'percent' ? '%' : '₫'} off
            </TableCell>

            <TableCell className="text-muted-foreground">
              {item.used_count} / {item.max_uses}
            </TableCell>

            <TableCell className="text-muted-foreground">
              {item.min_order_value.toLocaleString()}₫
            </TableCell>

            <TableCell className="text-muted-foreground">
              {dayjs(item.start_date).format("MMM D, YYYY")}
            </TableCell>

            <TableCell className="text-muted-foreground">
              {dayjs(item.end_date).format("MMM D, YYYY")}
            </TableCell>

            <TableCell className="font-medium">
              <Switch
                checked={item.is_active}
                onCheckedChange={(value) => onActiveChange(item._id, value)}
              />
            </TableCell>

            <TableCell className="text-center">
              <Button
                variant="ghost"
                size="sm"
                title="Edit Discount Code"
                onClick={() => { onEdit(item._id) }}
              >
                <Edit />
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