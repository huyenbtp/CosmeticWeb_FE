"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Filter, Plus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import TagsTable from "@/features/tags/management/TagsTable";
import { Pagination } from "@/components/layout/Pagination";
import { ITag } from "@/interfaces/tag.interface";

const mockTags: ITag[] = [
  {
    _id: "64f1a2b3c9e123001",
    name: "hydrating",
    status: "active",
    total_products: 150,
  },
  {
    _id: "64f1a2b3c9e123002",
    name: "acne-care",
    status: "active",
    total_products: 342,
  },
  {
    _id: "64f1a2b3c9e123003",
    name: "for-beginners",
    status: "archived",
    total_products: 24,
  },
  {
    _id: "64f1a2b3c9e123004",
    name: "fragrance-free,",
    status: "active",
    total_products: 89,
  },
  {
    _id: "64f1a2b3c9e123005",
    name: "pregnancy",
    status: "archived",
    total_products: 0,
  },
];

export default function TagsManagementPage() {
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

  const fetchTags = async () => {

  };

  useEffect(() => {
    fetchTags();
    setData(mockTags.slice(0, limit)) //sau khi fetch data thật thì xóa dòng này đi
    setTotal(mockTags.length)
  }, [page, limit, searchQuery, minTotal, maxTotal, status]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Tags Management
        </h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => { router.push("tags/new") }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Tag
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar placeholder="Search tags..." willUpdateQuery className="w-96" />

          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <TagsTable
              data={data}
              onViewProducts={(id) => { router.push(`tags/${id}`) }}
              onEdit={(id) => { router.push(`tags/${id}/edit`) }}
            />
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="tag" />

        </CardContent>
      </Card>
    </div>
  );
}