import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { IProductDetail } from "@/interfaces/product.interface";
import { getProductStatusBadge } from "../ProductsFilter";
import dayjs from "dayjs";

export default function DetailsTab({
  product,
}: {
  product: IProductDetail
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="py-3">
        <CardContent className="px-3">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-100 rounded-lg border object-contain"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Product Name</Label>
            <p className="text-sm text-muted-foreground mt-2">
              {product.name}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <p className="text-sm text-muted-foreground mt-2">
                {product.category.name}
              </p>
            </div>

            <div>
              <Label>Brand</Label>
              <p className="text-sm text-muted-foreground mt-2">
                {product.brand.name}
              </p>
            </div>
          </div>

          {product.description &&
            <div>
              <Label>Description</Label>
              <p className="text-sm text-muted-foreground mt-2">
                {product.description}
              </p>
            </div>
          }
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Status</Label>
            <div className="mt-2">
              {getProductStatusBadge(product.status)}
            </div>
          </div>

          <div>
            <Label>Created Date</Label>
            <p className="text-sm text-muted-foreground mt-2">
              {dayjs(product.createdAt).format("MMMM D, YYYY")}
            </p>
          </div>

          <div>
            <Label>Last Updated</Label>
            <p className="text-sm text-muted-foreground mt-2">
              {dayjs(product.updatedAt).format("MMMM D, YYYY")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}