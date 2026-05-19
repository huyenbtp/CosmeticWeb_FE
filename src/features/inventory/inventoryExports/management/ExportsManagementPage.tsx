"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import ExportsFilter from "@/features/inventory/inventoryExports/management/ExportsFilter";
import ExportsTable from "./ExportsTable";
import { Pagination } from "@/components/layout/Pagination";
import { IExport } from "@/interfaces/export.inerface";
import exportApi, { ExportType } from "@/lib/api/inventoryExport.api";
import { updateQueryParams } from "@/lib/utils";
import { toast } from "sonner";


export default function ExportsManagementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<IExport[]>();
  const [total, setTotal] = useState(0);

  const [limit, setLimit] = useState(7);
  const rawPage = Number(searchParams.get("page"));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const searchQuery = searchParams.get("q") || "";
  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";
  const type = searchParams.get("type") || "";

  const fetchExports = async () => {
    setLoading(true);

    try {
      const res = await exportApi.fetchExports({
        page,
        limit,
        q: searchQuery || undefined,
        fromDate: fromDate || undefined,
        toDate: toDate,
        type: type as ExportType || undefined,
      });
      setData(res.data);
      setTotal(res.pagination?.total ?? 0);
    } catch (error) {
      toast.error("Fetch exports failed:" + error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const newQuery = updateQueryParams(searchParams, { page: 1 });
    router.push(`?${newQuery}`);
  }, [limit]);


  useEffect(() => {
    fetchExports();

  }, [page, limit, searchQuery, fromDate, toDate, type]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Export History
        </h1>
        {/** 
        <div className="flex items-center gap-2">
          <Button
            onClick={() => { router.push("export-history/new") }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Export
          </Button>
        </div>
        */}
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar placeholder="Search export document by export code" willUpdateQuery className="w-96" />

            <ExportsFilter />
          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <div className="flex-row">
              <ExportsTable
                loading={loading}
                data={data || []}
                onView={(id) => { router.push(`export-history/${id}`) }}
              />
            </div>
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="result" />

        </CardContent>
      </Card>
    </div>
  );
}