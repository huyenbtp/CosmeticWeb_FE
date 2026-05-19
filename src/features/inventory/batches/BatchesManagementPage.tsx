"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import BatchesFilter from "./BatchesFilter";
import BatchesTable from "./BatchesTable";
import { Pagination } from "@/components/layout/Pagination";
import { IBatch } from "@/interfaces/batch.interface";
import batchApi, { BatchExpiredStatus, BatchStockStatus } from "@/lib/api/batch.api";
import { updateQueryParams } from "@/lib/utils";
import { toast } from "sonner";

const mockBatches = [
  {
    _id: "IMP-001",
    batch_code: "IMP-15112025-093000",
    staff_id: "1",
    staff: {
      _id: "1",
      full_name: "Sarah Johnson",
      staff_code: "ADM-2025-0001",
    },
    products_updated: 3,
    items_imported: 100,
    total_amount: 20000000,
    createdAt: "2025-11-15T09:30:00",
  },
  {
    _id: "IMP-002",
    batch_code: "IMP-14112025-093204",
    staff_id: "2",
    staff: {
      _id: "2",
      full_name: "Mike Chen",
      staff_code: "ADM-2025-0001",
    },
    products_updated: 1,
    items_imported: 100,
    total_amount: 15600000,
    createdAt: "2025-11-14T09:32:04",
  },
  {
    _id: "IMP-003",
    batch_code: "IMP-14102025-093204",
    staff_id: "3",
    staff: {
      _id: "3",
      full_name: "Emma Wilson",
      staff_code: "ADM-2025-0001",
    },
    products_updated: 4,
    items_imported: 100,
    total_amount: 25000000,
    createdAt: "2025-11-14T09:24:13",
  },
  {
    _id: "IMP-004",
    batch_code: "IMP-14092025-093204",
    staff_id: "4",
    staff: {
      _id: "4",
      full_name: "David Brown",
      staff_code: "ADM-2025-0001",
    },
    products_updated: 5,
    items_imported: 150,
    total_amount: 32000000,
    createdAt: "2025-11-14T09:20:48",
  },
  {
    _id: "IMP-005",
    batch_code: "IMP-14082025-093204",
    staff_id: "5",
    staff: {
      _id: "5",
      full_name: "Lisa Garcia",
      staff_code: "ADM-2025-0001",
    },
    products_updated: 2,
    items_imported: 80,
    total_amount: 12000000,
    createdAt: "2025-11-14T09:20:48",
  },
  {
    _id: "IMP-006",
    batch_code: "IMP-14082025-093204",
    staff_id: "6",
    staff: {
      _id: "6",
      full_name: "James Taylor",
      staff_code: "ADM-2025-0001",
    },
    products_updated: 3,
    items_imported: 100,
    total_amount: 24000000,
    createdAt: "2025-11-14T09:15:20",
  },
  {
    _id: "IMP-007",
    batch_code: "IMP-14072025-093204",
    staff_id: "7",
    staff: {
      _id: "7",
      full_name: "Maria Rodriguez",
      staff_code: "ADM-2025-0001",
    },
    products_updated: 1,
    items_imported: 40,
    total_amount: 4500000,
    createdAt: "2025-11-14T09:03:00",
  }
];

export default function BatchesManagementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<IBatch[]>();
  const [total, setTotal] = useState(0);

  const [limit, setLimit] = useState(7);
  const rawPage = Number(searchParams.get("page"));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const searchQuery = searchParams.get("q") || "";
  const expiredStatus = searchParams.get("expiredStatus") || "";
  const stockStatus = searchParams.get("stockStatus") || "";

  const fetchBatches = async () => {
    setLoading(true);

    try {
      const res = await batchApi.fetchBatches({
        page,
        limit,
        q: searchQuery || undefined,
        expiredStatus: expiredStatus as BatchExpiredStatus || undefined,
        stockStatus: stockStatus as BatchStockStatus || undefined,
      });
      setData(res.data);
      setTotal(res.pagination?.total ?? 0);
    } catch (error) {
      toast.error("Fetch batches failed:" + error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const newQuery = updateQueryParams(searchParams, { page: 1 });
    router.push(`?${newQuery}`);
  }, [limit]);


  useEffect(() => {
    fetchBatches();

  }, [page, limit, searchQuery, expiredStatus, stockStatus]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Inventory Batches Management
        </h1>
        {/** 
        <div className="flex items-center gap-2">
          <Button
            onClick={() => { router.push("batch-history/new") }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Batch
          </Button>
        </div>
        */}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar placeholder="Search batches by batch code" willUpdateQuery className="w-84" />

            <BatchesFilter />
          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <div className="flex-row">
              <BatchesTable
                loading={loading}
                data={data || []}
                onView={(id) => { router.push(`batches/${id}`) }}
              />
            </div>
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="result" />

        </CardContent>
      </Card>
    </div>
  );
}