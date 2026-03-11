
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { Eye, Edit, } from "lucide-react";
import { IBrand } from "@/interfaces/brand.interface";

export function getStatusStyle(status: string) {
  if (status === "active") {
    return "bg-success1 text-success1-foreground"
  } else if (status === "archived") {
    return "bg-error1 text-error1-foreground"
  }
};

export default function BrandsTable({
  data,
  onView,
  onEdit,
}: {
  data: IBrand[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Brand Name</TableHead>
          <TableHead>Logo</TableHead>
          <TableHead>Total Products</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length > 0 ? (data.map((brand) => (
          <TableRow key={brand._id}>
            <TableCell className="w-20/100 font-medium">
              {brand.name}
            </TableCell>

            <TableCell className="w-20/100 text-muted-foreground">
              <ImageWithFallback
                src={brand.logo}
                alt={brand.name}
                className="w-20 h-10 rounded-lg object-cover"
              />
            </TableCell>

            <TableCell className="w-20/100 font-medium">
              {brand.total_products}
            </TableCell>

            <TableCell className="w-20/100 font-medium">
              <Select
                defaultValue={brand.status}
                value={brand.status}
                onValueChange={() => { }}
              >
                <SelectTrigger size="xs" className={`w-fit text-xs shadow-none ${getStatusStyle(brand.status)}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>

            <TableCell className="text-center">
              <Button
                variant="ghost"
                size="sm"
                title="View Detail"
                onClick={() => { onView(brand._id) }}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                title="Edit Brand"
                onClick={() => { onEdit(brand._id) }}
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