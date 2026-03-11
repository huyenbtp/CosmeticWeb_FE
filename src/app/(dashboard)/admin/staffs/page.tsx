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
import staffApi, { AccountStatus, StaffStatus } from "@/lib/api/staff.api";

const mockStaffs: IStaff[] = [
  {
    _id: '1',
    staff_code: "ADM-2025-0001",
    full_name: "Sarah Johnson",
    phone: "0123456789",
    image: "https://picsum.photos/200/300?random=1",
    position: "admin",
    status: "active",
    account: {
      _id: '1',
      username: "sarah_johnson",
      role: "admin",
      status: "active",
    },
  },
  {
    _id: '2',
    staff_code: "ADM-2025-0002",
    full_name: "Mike Chen",
    phone: "0123456789",
    image: "https://picsum.photos/200/300?random=2",
    position: "admin",
    status: "active",
    account: {
      _id: '1',
      username: "mike_chen",
      role: "admin",
      status: "active",
    },
  },
  {
    _id: '3',
    staff_code: "WAM-2025-0003",
    full_name: "Emma Wilson",
    phone: "0123456789",
    image: "https://picsum.photos/200/300?random=3",
    position: "warehouse_manager",
    status: "active",
    account: {
      _id: '1',
      username: "emma_wilson",
      role: "warehouse_manager",
      status: "active",
    },
  },
  {
    _id: '4',
    staff_code: "WAM-2025-0004",
    full_name: "David Brown",
    phone: "0123456789",
    image: "https://picsum.photos/200/300?random=4",
    position: "warehouse_manager",
    status: "on_leave",
    account: {
      _id: '1',
      username: "david_brown",
      role: "warehouse_manager",
      status: "active",
    },
  },
  {
    _id: '5',
    staff_code: "WAM-2025-0005",
    full_name: "Lisa Garcia",
    phone: "0123456789",
    image: "https://picsum.photos/200/300?random=5",
    position: "warehouse_manager",
    status: "terminated",
    account: {
      _id: '1',
      username: "lisa_garcia",
      role: "warehouse_manager",
      status: "inactive",
    },
  },
  {
    _id: '6',
    staff_code: "WAM-2025-0006",
    full_name: "James Taylor",
    phone: "0123456789",
    image: "https://picsum.photos/200/300?random=6",
    position: "warehouse_manager",
    status: "active",
    account: {
      _id: '1',
      username: "james_taylor",
      role: "warehouse_manager",
      status: "active",
    },
  },
  {
    _id: '7',
    staff_code: "WAM-2025-0007",
    full_name: "Maria Rodriguez",
    phone: "0123456789",
    image: "https://picsum.photos/200/300?random=7",
    position: "warehouse_manager",
    status: "on_leave",
    account: {
      _id: '1',
      username: "maria_rodriguez",
      role: "warehouse_manager",
      status: "active",
    },
  }
];

type StaffKey = "staff_code" | "full_name" | "phone";

export default function StaffsManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<IStaff[]>([]);
  const [total, setTotal] = useState(0);

  const [limit, setLimit] = useState(7);
  const rawPage = Number(searchParams.get("page"));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const searchQuery = searchParams.get("q") || "";
  const staffStatus = searchParams.get("empStatus") || "";
  const role = searchParams.get("role") || "";
  const accountStatus = searchParams.get("accStatus") || "";

  const fetchStaffs = async () => {
    setLoading(true);

    try {
      const res = await staffApi.fetchStaffs({
        page,
        limit,
        q: searchQuery || undefined,
        staffStatus: staffStatus as StaffStatus || undefined,
        role: role ?? undefined,
        accountStatus: accountStatus as AccountStatus || undefined,
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
  }, [page, limit, searchQuery, staffStatus, role, accountStatus]);

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

            <StaffsFilter />
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