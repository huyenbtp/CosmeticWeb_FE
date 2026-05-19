
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2, } from "lucide-react";
import { ITag } from "@/interfaces/tag.interface";

export function getStatusStyle(status: string) {
  if (status === "active") {
    return "bg-success1 text-success1-foreground"
  } else if (status === "archived") {
    return "bg-error1 text-error1-foreground"
  }
};

export default function TagsTable({
  data,
  onViewProducts,
  onEdit,
  onDelete,
}: {
  data: ITag[];
  onViewProducts: (id: string) => void;
  onEdit: (item: ITag) => void;
  onDelete: (item: ITag) => void;
}) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tag Name</TableHead>
          <TableHead className="text-center">Total Products</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length > 0 ? (data.map((tag) => (
          <TableRow key={tag._id}>
            <TableCell className="w-25/100 font-medium">
              {tag.name}
            </TableCell>

            <TableCell className="w-40/100 font-medium text-center">
              {tag.total_products}
            </TableCell>

            <TableCell className="w-15/100 font-medium">
              <Select
                defaultValue={tag.status}
                value={tag.status}
                onValueChange={() => { }}
              >
                <SelectTrigger size="xs" className={`w-fit text-xs shadow-none ${getStatusStyle(tag.status)}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>

            <TableCell className="text-center">
              {/**
              <Button
                variant="ghost"
                size="sm"
                title="View Products"
                onClick={() => { onViewProducts(tag._id) }}
              >
                <Eye className="w-4 h-4" />
              </Button>
              */}
              <Button
                variant="ghost"
                size="sm"
                title="Edit tag"
                onClick={() => { onEdit(tag) }}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                title="Delete tag"
                onClick={() => { onDelete(tag) }}
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