"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import ImportsFilter from "./ImportsFilter";
import ImportsTable from "./ImportsTable";
import { Pagination } from "@/components/layout/Pagination";
import { IImport } from "@/interfaces/import.interface";
import { IMinMaxFilterData } from "@/interfaces/import.interface";
import importApi, { ImportKey } from "@/lib/api/importOrder.api";
import { updateQueryParams } from "@/lib/utils";

const mockImports: IImport[] = [
  {
    _id: "IMP-001",
    import_code: "IMP-15112025-093000",
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
    import_code: "IMP-14112025-093204",
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
    import_code: "IMP-14102025-093204",
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
    import_code: "IMP-14092025-093204",
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
    import_code: "IMP-14082025-093204",
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
    import_code: "IMP-14082025-093204",
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
    import_code: "IMP-14072025-093204",
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

const NullMinMaxFilterData: IMinMaxFilterData = {
  totalAmount: { min: 0, max: 0 },
}

export default function ImportsManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [minMaxFilterData, setMinMaxFilterData] = useState<IMinMaxFilterData>(NullMinMaxFilterData);
  const isMinMaxFilterLoad = minMaxFilterData !== NullMinMaxFilterData;
  const [data, setData] = useState<IImport[]>();
  const [total, setTotal] = useState(0);

  const [limit, setLimit] = useState(7);
  const rawPage = Number(searchParams.get("page"));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const searchQuery = searchParams.get("q") || "";
  const [searchBy, setSearchBy] = useState<ImportKey>("import_code");
  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";
  const [totalRange, setTotalRange] = useState<number[]>([0, 0]);

  useEffect(() => {
    const initFilters = async () => {
      try {
        const res = await importApi.fetchImportStats();

        setMinMaxFilterData(res);
        setTotalRange([res.totalAmount.min, res.totalAmount.max]);
      } catch (err) {
        console.error("Init filter failed", err);
      }
    };

    initFilters();
  }, []);

  const fetchImports = async () => {
    setLoading(true);
    if (!isMinMaxFilterLoad) return;

    try {
      const res = await importApi.fetchImports({
        page,
        limit,
        q: searchQuery || undefined,
        by: searchBy || "import_code",
        fromDate: fromDate || undefined,
        toDate: toDate,
        minTotal: totalRange[0] || undefined,
        maxTotal: totalRange[1],
      });
      setData(res.data);
      setTotal(res.pagination?.total ?? 0);
    } catch (error) {
      console.error("Fetch imports failed:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const newQuery = updateQueryParams(searchParams, { page: 1 });
    router.push(`?${newQuery}`);
  }, [isMinMaxFilterLoad, limit, searchBy, totalRange]);


  useEffect(() => {
    fetchImports();

  }, [isMinMaxFilterLoad, page, limit, searchQuery, searchBy, fromDate, toDate, totalRange]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Import History
        </h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => { router.push("import-history/new") }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Import
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar placeholder="Search import orders..." willUpdateQuery className="w-84" />

            <Select value={searchBy} onValueChange={(value: ImportKey) => setSearchBy(value)}>
              <SelectTrigger size="sm" className="w-full sm:w-36">
                <SelectValue placeholder="Search by ..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="import_code">Import code</SelectItem>
                <SelectItem value="staff_code">Staff code</SelectItem>
                <SelectItem value="staff_name">Staff name</SelectItem>
              </SelectContent>
            </Select>

            <ImportsFilter
              data={minMaxFilterData}
              totalRange={totalRange}
              handleApplyTotal={(range) => setTotalRange(range)}
            />
          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <ImportsTable
              loading={loading}
              data={data || []}
              onView={(id) => { router.push(`import-history/${id}`) }}
            />
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="result" />

        </CardContent>
      </Card>
    </div>
  );
}