"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, } from "lucide-react";
import { IProductDetail } from "@/interfaces/product.interface";
import StatsCard from "./StatsCard";
import AnalyticsTab from "./AnalyticsTab";
import DetailsTab from "./DetailsTab";
import { useParams, useRouter } from "next/navigation";
import productApi from "@/lib/api/product.api";

const mockProduct: IProductDetail = {
  _id: '1',
  sku: 'CLS-001',
  name: "Sữa rửa mặt dưỡng ẩm tối ưu Hada Labo Advanced Nourish Cleanser 80g",
  category: {
    _id: "1",
    name: "Cleanser",
  },
  brand: {
    _id: "1",
    name: "Hada Labo",
  },
  selling_price: 100000,
  import_price: 50000,
  description: "Kem rửa mặt Hada Labo dưỡng ẩm với công dụng làm sạch sâu cùng hệ dưỡng ẩm sâu giúp dưỡng da ẩm mượt, sáng mịn, tươi trẻ mỗi ngày",
  image: 'https://picsum.photos/200/300',
  stock_quantity: 45,
  totalSold: 234,
  totalRevenue: 23400000,
  status: "published",
  createdAt: "2025-11-03T09:30:00",
  updatedAt: "2025-12-15T09:30:00",
  lastImportDate: "2025-12-03T09:30:00",
};

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<IProductDetail>();
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const res = await productApi.fetchProductById(id);
      setProduct(res);
    } catch (error) {
      console.error("Fetch product failed:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleStatusChange = async (status: "published" | "unpublished") => {
    try {
      await productApi.updateStatus(id, status);
    } catch (error) {
      console.error("Change product's status failed:", error);
    } finally {
      fetchProduct()
    }
  };

  if (loading) return (
    <div className="h-full flex justify-center items-center">
      <Spinner className="size-12" />
    </div>
  )
  if (product) return (
    <div className="px-8 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 mr-10">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-muted-foreground">{product.category.name} • SKU: {product.sku}</p>
        </div>

        <Button
          variant={product.status === "published" ? "destructive" : "outline"}
          onClick={() => {
            product.status === "published"
              ? handleStatusChange("unpublished")
              : handleStatusChange("published")
          }}
        >
          {product.status === "published" ? "Unpublish" : "Publish"} Product
        </Button>

        <Button
          onClick={() => { router.push(`${id}/edit`) }}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Product
        </Button>
      </div>

      <StatsCard product={product} />

      <Tabs defaultValue="details" className="w-full space-y-1">
        <TabsList className="space-x-2">
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <DetailsTab product={product} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AnalyticsTab product={product} />
        </TabsContent>
      </Tabs>
    </div>
  );
}