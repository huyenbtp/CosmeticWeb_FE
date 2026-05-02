"use client"

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import CustomersTable from "./CustomersTable";
import { Pagination } from "@/components/layout/Pagination";
import customerApi from "@/lib/api/customer.api";
import { ICustomer } from "@/interfaces/customer.interface";
import CustomersFilter from "./CustomersFilter";

export default function CustomersManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<ICustomer[]>([]);
  const [total, setTotal] = useState(0);

  const [limit, setLimit] = useState(7);
  const rawPage = Number(searchParams.get("page"));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const searchQuery = searchParams.get("q") || "";
  const is_active = searchParams.get("is_active") || "";

  const fetchStaffs = async () => {
    setLoading(true);

    try {
      const active = is_active === "active" ? true
        : is_active === "inactive" ? false
          : undefined;

      const res = await customerApi.fetchCustomers({
        page,
        limit,
        q: searchQuery || undefined,
        is_active: active,
      });
      setData(res.data);
      setTotal(res.pagination?.total ?? 0);
    } catch (error) {
      console.error("Fetch customers failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, [page, limit, searchQuery, is_active]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Customers Management
        </h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar placeholder="Search customers..." willUpdateQuery />

            <CustomersFilter />
          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <CustomersTable
              loading={loading}
              data={data || []}
              onView={(id) => { router.push(`customers/${id}`) }}
              onDelete={() => { }}
            />
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="customer" />

        </CardContent>
      </Card>
    </div>
  );
}