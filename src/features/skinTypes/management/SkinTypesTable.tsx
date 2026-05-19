
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, } from "lucide-react";
import { ISkinType } from "@/interfaces/skinType.interface";

export function getStatusStyle(status: string) {
  if (status === "active") {
    return "bg-success1 text-success1-foreground"
  } else if (status === "archived") {
    return "bg-error1 text-error1-foreground"
  }
};

export default function SkinTypesTable({
  data,
  onViewProducts,
  onEdit,
}: {
  data: ISkinType[];
  onViewProducts: (id: string) => void;
  onEdit: (id: string) => void;
}) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Skin Type Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Total Products</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length > 0 ? (data.map((skinType) => (
          <TableRow key={skinType._id}>
            <TableCell className="w-20/100 font-medium">
              {skinType.name}
            </TableCell>

            <TableCell className="w-20/100 font-medium">
              {skinType.description}
            </TableCell>

            <TableCell className="w-20/100 font-medium">
              {skinType.total_products}
            </TableCell>

            <TableCell className="w-20/100 font-medium">
              <Select
                defaultValue={skinType.status}
                value={skinType.status}
                onValueChange={() => { }}
              >
                <SelectTrigger size="xs" className={`w-fit text-xs shadow-none ${getStatusStyle(skinType.status)}`}>
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
                title="View Products"
                onClick={() => { onViewProducts(skinType._id) }}
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                title="Edit SkinType"
                onClick={() => { onEdit(skinType._id) }}
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