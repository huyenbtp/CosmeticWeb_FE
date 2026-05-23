
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2, } from "lucide-react";
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
  onDelete,
}: {
  data: ISkinType[];
  onViewProducts: (id: string) => void;
  onEdit: (item: ISkinType) => void;
  onDelete: (item: ISkinType) => void;
}) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Skin Type Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-center">Total Products</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length > 0 ? (data.map((item) => (
          <TableRow key={item._id}>
            <TableCell className="w-20/100 font-medium">
              {item.name}
            </TableCell>

            <TableCell className="w-40/100">
              {item.description}
            </TableCell>

            <TableCell className="w-20/100 font-medium text-center">
              {item.total_products}
            </TableCell>

            <TableCell className="text-center space-x-2">
              {/**
              <Button
                variant="ghost"
                size="sm"
                title="View Products"
                onClick={() => { onViewProducts(skinType._id) }}
              >
                <Eye className="w-4 h-4" />
              </Button>
              */}
              <Button
                variant="ghost"
                size="sm"
                title="Edit Skin Type"
                onClick={() => { onEdit(item) }}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                title="Delete Skin Type"
                onClick={() => { onDelete(item) }}
              >
                <Trash2 className="w-4 h-4" />
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