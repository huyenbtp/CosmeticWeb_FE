"use client"

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import ProductsFilter from "./ProductsFilter";
import ProductsTable from "./ProductsTable";
import { Pagination } from "@/components/layout/Pagination";
import { IFetchedBrand, IFetchedCategory, IMinMaxFilterData, IProduct } from "@/interfaces/product.interface";
import { updateQueryParams } from "@/lib/utils";
import productApi, { ProductKey, ProductStatus } from "@/lib/api/product.api";
import brandApi from "@/lib/api/brand.api";
import categoryApi from "@/lib/api/category.api";

const mockProducts: IProduct[] = [
  {
    _id: '1',
    name: "Son môi lì Red Velvet",
    category: {
      _id: "1",
      name: "Lips",
    },
    brand: {
      _id: "1",
      name: "3CE",
    },
    stock_quantity: 0,
    selling_price: 320000,
    status: "unpublished",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '2',
    name: "Kem dưỡng ẩm Hada Labo",
    category: {
      _id: "1",
      name: "Cleanser",
    },
    brand: {
      _id: "1",
      name: "Rohto",
    },
    stock_quantity: 40,
    selling_price: 265000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '3',
    name: "Sữa rửa mặt Innisfree Green Tea",
    category: {
      _id: "1",
      name: "Cleanser",
    },
    brand: {
      _id: "1",
      name: "Innisfree",
    },
    stock_quantity: 30,
    selling_price: 210000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '4',
    name: "Kem chống nắng Anessa Perfect UV",
    category: {
      _id: "1",
      name: "Suncare",
    },
    brand: {
      _id: "1",
      name: "Shiseido",
    },
    stock_quantity: 50,
    selling_price: 480000,
    status: "unpublished",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '5',
    name: "Phấn phủ Fit Me Matte + Poreless",
    category: {
      _id: "1",
      name: "Makeup",
    },
    brand: {
      _id: "1",
      name: "Maybelline",
    },
    stock_quantity: 35,
    selling_price: 295000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '6',
    name: "Serum Vitamin C Melano CC",
    category: {
      _id: "1",
      name: "Serum",
    },
    brand: {
      _id: "1",
      name: "Rohto",
    },
    stock_quantity: 28,
    selling_price: 350000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '7',
    name: "Toner Simple Kind to Skin",
    category: {
      _id: "1",
      name: "Toner",
    },
    brand: {
      _id: "1",
      name: "Unilever",
    },
    stock_quantity: 32,
    selling_price: 240000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '8',
    name: "Mặt nạ giấy Mediheal Tea Tree",
    category: {
      _id: "1",
      name: "Paper Mask",
    },
    brand: {
      _id: "1",
      name: "Mediheal",
    },
    stock_quantity: 160,
    selling_price: 28000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '9',
    name: "Dầu gội Tsubaki Premium Moist",
    category: {
      _id: "1",
      name: "Hair Care",
    },
    brand: {
      _id: "1",
      name: "Tsubaki",
    },
    stock_quantity: 22,
    selling_price: 310000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
  {
    _id: '10',
    name: "Nước tẩy trang Bioderma Sensibio H2O",
    category: {
      _id: "1",
      name: "Makeup Remover",
    },
    brand: {
      _id: "1",
      name: "Bioderma",
    },
    stock_quantity: 45,
    selling_price: 420000,
    status: "published",
    image: "https://picsum.photos/200/300",
  },
];

const NullMinMaxFilterData: IMinMaxFilterData = {
  price: { min: 0, max: 0 },
  stock: { min: 0, max: 0 },
}

export default function ProductsManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [brands, setBrands] = useState<IFetchedBrand[]>([]);
  const [categories, setCategories] = useState<IFetchedCategory[]>([]);
  const [data, setData] = useState<IProduct[]>([]);
  const [minMaxFilterData, setMinMaxFilterData] = useState<IMinMaxFilterData>(NullMinMaxFilterData);
  const isMinMaxFilterLoad = minMaxFilterData !== NullMinMaxFilterData;
  const [total, setTotal] = useState(0);

  const [limit, setLimit] = useState(7);
  const rawPage = Number(searchParams.get("page"));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const searchQuery = searchParams.get("q") || "";
  //const searchBy = searchParams.get("by") || "name";
  const brandId = searchParams.get("brand");
  const categorySlug = searchParams.get("category");
  const status = searchParams.get("status") || "";
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
  const [stockRange, setStockRange] = useState<number[]>([0, 0]);

  useEffect(() => {
    const initFilters = async () => {
      try {
        const [brandRes, categoryRes, minMaxFilterRes] = await Promise.all([
          brandApi.fetchAllBrands(),
          categoryApi.fetchAllCategories(),
          productApi.fetchProductStats(),
        ]);

        setBrands(brandRes);
        setCategories(categoryRes);
        setMinMaxFilterData(minMaxFilterRes)
        setPriceRange([minMaxFilterRes.price.min, minMaxFilterRes.price.max]);
        setStockRange([minMaxFilterRes.stock.min, minMaxFilterRes.stock.max]);
      } catch (err) {
        console.error("Init filter failed", err);
      }
    };

    initFilters();
  }, []);

  const fetchProducts = async () => {
    if (!isMinMaxFilterLoad) return;
    if (loading) return;
    setLoading(true);

    try {
      const res = await productApi.fetchProductsPagination({
        page,
        limit,
        q: searchQuery || undefined,
        category_slug: categorySlug ?? undefined,
        brand_id: brandId ?? undefined,
        minPrice: priceRange[0] || undefined,
        maxPrice: priceRange[1],
        minStock: stockRange[0] || undefined,
        maxStock: stockRange[1],
        status: status as ProductStatus || undefined,
      });
      setData(res.data);
      setTotal(res.pagination?.total ?? 0);
    } catch (error) {
      console.error("Fetch products failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const newQuery = updateQueryParams(searchParams, { page: 1 });
    router.push(`?${newQuery}`);
  }, [isMinMaxFilterLoad, limit, priceRange, stockRange]);

  useEffect(() => {
    fetchProducts();
  }, [isMinMaxFilterLoad, page, limit, searchQuery, categorySlug, brandId, priceRange, stockRange, status]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Products Management
        </h1>
        <Button onClick={() => { router.push("products/new") }}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar placeholder="Search products by name, sku" willUpdateQuery className="w-84" />

            <ProductsFilter
              data={minMaxFilterData}
              brands={brands}
              categories={categories}
              priceRange={priceRange}
              stockRange={stockRange}
              handleApplyPrice={(range) => setPriceRange(range)}
              handleApplyStock={(range) => setStockRange(range)}
            />
          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <ProductsTable
              loading={loading}
              data={data || []}
              onView={(id) => { router.push(`products/${id}`) }}
              onEdit={(id) => router.push(`products/${id}/edit`)}
            />
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="product" />

        </CardContent>
      </Card>
    </div>
  );
}