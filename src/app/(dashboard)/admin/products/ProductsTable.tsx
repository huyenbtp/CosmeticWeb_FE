"use client"

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { Edit, Eye } from "lucide-react";
import { getProductStatusBadge } from "./ProductsFilter";
import { IProduct } from "@/interfaces/product.interface";

export default function ProductsTable({
  loading,
  data,
  onView,
  onEdit,
}: {
  loading: boolean;
  data: IProduct[],
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Product</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>In Stock</TableHead>
          <TableHead className="text-right">Selling Price</TableHead>
          <TableHead className="text-center">Status</TableHead>
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
            <TableCell className="w-3/14 max-w-80 pr-8" title={item.name}>
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <span className="flex-1 font-medium truncate">{item.name}</span>
              </div>
            </TableCell>

            <TableCell className="w-2/14 text-muted-foreground">
              {item.category.name}
            </TableCell>

            <TableCell className="w-2/14 text-muted-foreground">
              {item.brand.name}
            </TableCell>

            <TableCell className="w-1/14 ">
              {item.stock_quantity > 0
                ? <span className="text-muted-foreground">{item.stock_quantity}</span>
                : <span className="text-muted-foreground/60">Out of stock</span>}
            </TableCell>

            <TableCell className="w-2/14 text-right font-medium">
              {item.selling_price.toLocaleString()} VND
            </TableCell>

            <TableCell className="w-2/14 text-center">
              {getProductStatusBadge(item.status)}
            </TableCell>

            <TableCell className="text-center">
              <Button
                variant="ghost"
                size="sm"
                title="View Detail"
                onClick={() => onView(item._id)}
              >
                <Eye />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                title="Edit"
                onClick={() => onEdit(item._id)}
              >
                <Edit />
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