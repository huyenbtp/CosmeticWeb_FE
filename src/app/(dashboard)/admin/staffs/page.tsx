"use client"

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import StaffsFilter from "./StaffsFilter";
import StaffsTable from "./StaffsTable";
import { Pagination } from "@/components/layout/Pagination";
import { IStaff } from "@/interfaces/staff.interface";
import staffApi, { StaffStatus } from "@/lib/api/staff.api";
import { IRole } from "@/interfaces/role.interface";
import roleApi from "@/lib/api/role.api";

type StaffKey = "staff_code" | "full_name" | "phone";

export default function StaffsManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<IStaff[]>([]);
  const [total, setTotal] = useState(0);
  const [roles, setRoles] = useState<IRole[]>([]);

  const [limit, setLimit] = useState(7);
  const rawPage = Number(searchParams.get("page"));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const searchQuery = searchParams.get("q") || "";
  const status = searchParams.get("status") || "";
  const roleId = searchParams.get("role") || "";
  const is_active = searchParams.get("is_active") || "";

  useEffect(() => {
    const initFilters = async () => {
      try {
        const roleRes = await roleApi.fetchAllRoles();
        setRoles(roleRes);
      } catch (err) {
        console.error("Init filter failed", err);
      }
    };

    initFilters();
  }, []);

  const fetchStaffs = async () => {
    setLoading(true);

    try {
      const active = is_active === "active" ? true : is_active === "inactive" ? false : undefined;

      const res = await staffApi.fetchStaffs({
        page,
        limit,
        q: searchQuery || undefined,
        status: status as StaffStatus || undefined,
        role_id: roleId ?? undefined,
        is_active: active,
      });
      setData(res.data);
      setTotal(res.pagination?.total ?? 0);
    } catch (error) {
      console.error("Fetch staffs failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, [page, limit, searchQuery, status, roleId, is_active]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Staffs Management
        </h1>
        <Button
          onClick={() => { router.push("staffs/new") }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Staff
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar placeholder="Search staffs by name, staff code, phone" willUpdateQuery />

            {/** 
            <Select value={searchBy} onValueChange={(value: StaffKey) => setSearchBy(value)}>
              <SelectTrigger size="sm" className="w-full sm:w-48">
                <SelectValue placeholder="Search by ..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="staff_code">Staff code</SelectItem>
                <SelectItem value="full_name">Staff name</SelectItem>
                <SelectItem value="phone">Phone number</SelectItem>
              </SelectContent>
            </Select>
            */}

            <StaffsFilter roles={roles} />
          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <StaffsTable
              loading={loading}
              data={data || []}
              onView={(id) => { router.push(`staffs/${id}`) }}
              onEdit={(id) => { router.push(`staffs/${id}/edit`) }}
            />
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="staff" />

        </CardContent>
      </Card>
    </div>
  );
}