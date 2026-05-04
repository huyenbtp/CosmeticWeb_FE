"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Filter, Plus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import SkinTypesTable from "./SkinTypesTable";
import { Pagination } from "@/components/layout/Pagination";
import { ISkinType } from "@/interfaces/skinType.interface";

const mockSkinTypes: ISkinType[] = [
  {
    _id: "64f1a2b3c9e123001",
    name: "Dry skin",
    description: "",
    status: "active",
    total_products: 150,
  },
  {
    _id: "64f1a2b3c9e123002",
    name: "Oily skin",
    description: "",
    status: "active",
    total_products: 342,
  },
  {
    _id: "64f1a2b3c9e123003",
    name: "Normal skin",
    description: "",
    status: "archived",
    total_products: 24,
  },
  {
    _id: "64f1a2b3c9e123004",
    name: "Acne skin",
    description: "",
    status: "active",
    total_products: 89,
  },
  {
    _id: "64f1a2b3c9e123005",
    name: "Combination skin",
    status: "archived",
    description: "",
    total_products: 0,
  },
  {
    _id: "64f1a2b3c9e123006",
    name: "Sensitive skin",
    description: "",
    status: "active",
    total_products: 0,
  },
];

export default function SkinTypesManagement() {
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

  const fetchSkinTypes = async () => {

  };

  useEffect(() => {
    fetchSkinTypes();
    setData(mockSkinTypes.slice(0, limit)) //sau khi fetch data thật thì xóa dòng này đi
    setTotal(mockSkinTypes.length)
  }, [page, limit, searchQuery, minTotal, maxTotal, status]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Skin Types Management
        </h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => { router.push("skin-types/new") }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Skin Type
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar placeholder="Search skin types..." willUpdateQuery className="w-96" />

          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <SkinTypesTable
              data={data}
              onViewProducts={(id) => { router.push(`skin-types/${id}`) }}
              onEdit={(id) => { router.push(`skin-types/${id}/edit`) }}
            />
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="skin type" />

        </CardContent>
      </Card>
    </div>
  );
}