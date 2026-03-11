"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Filter, Plus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import BrandsFilter from "./BrandsFilter";
import BrandsTable from "./BrandsTable";
import { Pagination } from "@/components/layout/Pagination";
import { IBrand } from "@/interfaces/brand.interface";

const mockBrands: IBrand[] = [
  {
    _id: "64f1a2b3c9e123001",
    name: "Centella",
    logo: "https://picsum.photos/seed/technova/300/200",
    status: "active",
    total_products: 150,
  },
  {
    _id: "64f1a2b3c9e123002",
    name: "Simple",
    logo: "https://picsum.photos/seed/urbanstyle/300/200",
    status: "active",
    total_products: 342,
  },
  {
    _id: "64f1a2b3c9e123003",
    name: "Clair",
    logo: "https://picsum.photos/seed/greenleaf/300/200",
    status: "archived",
    total_products: 24,
  },
  {
    _id: "64f1a2b3c9e123004",
    name: "Cocoon",
    logo: "https://picsum.photos/seed/blueocean/300/200",
    status: "active",
    total_products: 89,
  },
  {
    _id: "64f1a2b3c9e123005",
    name: "Gucci",
    logo: "https://picsum.photos/seed/reddragon/300/200",
    status: "archived",
    total_products: 0,
  },
  {
    _id: "64f1a2b3c9e123006",
    name: "Hada Labo",
    logo: "https://picsum.photos/seed/minimalist/300/200",
    status: "active",
    total_products: 210,
  },
  {
    _id: "64f1a2b3c9e123007",
    name: "Innisfree",
    logo: "https://picsum.photos/seed/retro/300/200",
    status: "active",
    total_products: 56,
  },
  {
    _id: "64f1a2b3c9e123008",
    name: "Color Key",
    logo: "https://picsum.photos/seed/foodie/300/200",
    status: "archived",
    total_products: 12,
  },
  {
    _id: "64f1a2b3c9e123009",
    name: "JulyDoll",
    logo: "https://picsum.photos/seed/cosmic/300/200",
    status: "active",
    total_products: 430,
  },
  {
    _id: "64f1a2b3c9e123010",
    name: "3CE",
    logo: "https://picsum.photos/seed/sporty/300/200",
    status: "active",
    total_products: 115,
  },
];

export default function BrandsManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1) || 1;
  const searchQuery = searchParams.get("q") || "";
  const minTotal = Number(searchParams.get("minTotal") || 0) || 0;
  const maxTotal = Number(searchParams.get("maxTotal") || 0) || 0;
  const status = searchParams.get("status") || "";

  const [limit, setLimit] = useState(7);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const fetchBrands = async () => {

  };

  useEffect(() => {
    fetchBrands();
    setData(mockBrands.slice(0, limit)) //sau khi fetch data thật thì xóa dòng này đi
    setTotal(mockBrands.length)
  }, [page, limit, searchQuery, minTotal, maxTotal, status]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Brands Management
        </h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => { router.push("brands/new") }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Brand
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar placeholder="Search brands..." willUpdateQuery className="w-84" />

            <BrandsFilter maxTotal={100} />
          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <BrandsTable
              data={data}
              onView={(id) => { router.push(`brands/${id}`) }}
              onEdit={(id) => { router.push(`brands/${id}/edit`) }}
            />
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="brand" />

        </CardContent>
      </Card>
    </div>
  );
}