"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Filter } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import OrdersTable from "./OrdersTable";
import { Pagination } from "@/components/layout/Pagination";
import { IOrder } from "@/interfaces/order.interface";
import OrdersFilter from "./OrdersFilter";

const mockOrders: IOrder[] = [
  {
    _id: "ORD-001",
    order_code: "ORD-15112025-093000",
    customer_id: "1",
    customer: {
      _id: "1",
      name: "Sarah Johnson",
      phone: "0123456789",
    },
    total_items: 3,
    total: 500200,
    payment_method: "cash",
    payment_status: "paid",
    createdAt: "2025-11-15T09:30:00",
  },
  {
    _id: "ORD-002",
    order_code: "ORD-14112025-093204",
    customer_id: "2",
    customer: {
      _id: "2",
      name: "Mike Chen",
      phone: "0123456789",
    },
    total_items: 1,
    total: 156000,
    payment_method: "cash",
    payment_status: "unpaid",
    createdAt: "2025-11-14T09:32:04",
  },
  {
    _id: "ORD-003",
    order_code: "ORD-003",
    customer_id: "3",
    customer: {
      _id: "3",
      name: "Emma Wilson",
      phone: "0123456789",
    },
    total_items: 4,
    total: 1200100,
    payment_method: "bank_transfer",
    payment_status: "paid",
    createdAt: "2025-11-14T09:24:13",
  },
  {
    _id: "ORD-004",
    order_code: "ORD-004",
    customer_id: "4",
    customer: {
      _id: "4",
      name: "David Brown",
      phone: "0123456789",
    },
    total_items: 2,
    total: 702900,
    payment_method: "bank_transfer",
    payment_status: "paid",
    createdAt: "2025-11-14T09:20:48",
  },
  {
    _id: "ORD-005",
    order_code: "ORD-005",
    customer_id: "5",
    customer: {
      _id: "5",
      name: "Lisa Garcia",
      phone: "0123456789",
    },
    total_items: 2,
    total: 502300,
    payment_method: "cash",
    payment_status: "unpaid",
    createdAt: "2025-11-14T09:20:48",
  },
  {
    _id: "ORD-006",
    order_code: "ORD-006",
    customer_id: "6",
    customer: {
      _id: "6",
      name: "James Taylor",
      phone: "0123456789",
    },
    total_items: 3,
    total: 850000,
    payment_method: "bank_transfer",
    payment_status: "paid",
    createdAt: "2025-11-14T09:15:20",
  },
  {
    _id: "ORD-007",
    order_code: "ORD-007",
    customer_id: "7",
    customer: {
      _id: "7",
      name: "Maria Rodriguez",
      phone: "0123456789",
    },
    total_items: 1,
    total: 302000,
    payment_method: "cash",
    payment_status: "paid",
    createdAt: "2025-11-14T09:03:00",
  }
];

type OrderKey = "order_code" | "customer_name" | "customer_phone";

export default function OrdersManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1) || 1;
  const searchQuery = searchParams.get("q") || "";
  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";
  const payment_method = searchParams.get("pmMtd") || "";
  const status = searchParams.get("status") || "";

  const [limit, setLimit] = useState(7);
  const [searchBy, setSearchBy] = useState<OrderKey>("order_code");
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const fetchOrders = async () => {

  };

  useEffect(() => {
    fetchOrders();
    setData(mockOrders.slice(0, limit)) //sau khi fetch data thật thì xóa dòng này đi
    setTotal(mockOrders.length)
  }, [page, limit, searchQuery, searchBy, fromDate, toDate, payment_method, status]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Orders Management
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-[#576D64] text-[#576D64] hover:bg-[#576D64] hover:text-white">
            <Filter className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar placeholder="Search orders..." willUpdateQuery className="w-84" />

            <Select value={searchBy} onValueChange={(value: OrderKey) => setSearchBy(value)}>
              <SelectTrigger size="sm" className="w-full sm:w-42">
                <SelectValue placeholder="Search by ..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="order_code">Order code</SelectItem>
                <SelectItem value="customer_name">Customer name</SelectItem>
                <SelectItem value="customer_phone">Customer phone</SelectItem>
              </SelectContent>
            </Select>

            <OrdersFilter />
          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <OrdersTable
              data={data}
              onView={(id) => { router.push(`orders/${id}`) }}
              onEdit={(id) => { router.push(`orders/${id}/edit`) }}
            />
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="order" />

        </CardContent>
      </Card>

      
    </div>
  );
}