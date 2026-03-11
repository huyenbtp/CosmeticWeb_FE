"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Plus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import DiscountCodesFilter from "./DiscountCodesFilter";
import DiscountCodesTable from "./DiscountCodesTable";
import { Pagination } from "@/components/layout/Pagination";
import { IDiscountCode } from "@/interfaces/discountCode.interface";

export const mockDiscountCodes: IDiscountCode[] = [
  {
    _id: "dsc_001",
    code: "WELCOME20",
    description: "Giảm 20% cho đơn hàng đầu tiên",
    type: "percent",
    value: 20,
    start_date: "2024-01-01T00:00:00Z",
    end_date: "2025-12-31T23:59:59Z",
    min_order_value: 100000,
    max_uses: 1000,
    used_count: 150,
    is_active: true,
  },
  {
    _id: "dsc_002",
    code: "FREESHIP",
    description: "Miễn phí vận chuyển tối đa 30k",
    type: "amount",
    value: 30000,
    start_date: "2024-03-01T00:00:00Z",
    end_date: "2024-12-31T23:59:59Z",
    min_order_value: 200000,
    max_uses: 5000,
    used_count: 2341,
    is_active: true,
  },
  {
    _id: "dsc_003",
    code: "SUMMER_SALE",
    description: "Giảm 50k cho đơn từ 500k",
    type: "amount",
    value: 50000,
    start_date: "2024-06-01T00:00:00Z",
    end_date: "2024-08-31T23:59:59Z",
    min_order_value: 500000,
    max_uses: 200,
    used_count: 200, // Đã hết lượt dùng
    is_active: false,
  },
  {
    _id: "dsc_004",
    code: "FLASH10",
    description: "Giảm 10% chớp nhoáng",
    type: "percent",
    value: 10,
    start_date: "2024-10-10T09:00:00Z",
    end_date: "2024-10-10T11:00:00Z",
    min_order_value: 0,
    max_uses: 100,
    used_count: 98,
    is_active: true,
  },
  {
    _id: "dsc_005",
    code: "VIP_MEMBER",
    description: "Ưu đãi riêng cho khách VIP",
    type: "percent",
    value: 15,
    start_date: "2024-01-01T00:00:00Z",
    end_date: "2099-12-31T23:59:59Z",
    min_order_value: 0,
    max_uses: 99999,
    used_count: 450,
    is_active: true,
  },
  {
    _id: "dsc_006",
    code: "TET2024",
    description: "Lì xì đầu năm 100k",
    type: "amount",
    value: 100000,
    start_date: "2024-02-01T00:00:00Z",
    end_date: "2024-02-15T23:59:59Z", // Đã hết hạn (theo thời gian giả định)
    min_order_value: 1000000,
    max_uses: 500,
    used_count: 489,
    is_active: false,
  },
  {
    _id: "dsc_007",
    code: "BLACKFRIDAY",
    description: "Siêu sale 50%",
    type: "percent",
    value: 50,
    start_date: "2024-11-29T00:00:00Z",
    end_date: "2024-11-30T23:59:59Z",
    min_order_value: 200000,
    max_uses: 1000,
    used_count: 0,
    is_active: true,
  },
  {
    _id: "dsc_008",
    code: "SORRY50",
    description: "Mã đền bù sự cố kỹ thuật",
    type: "amount",
    value: 50000,
    start_date: "2024-05-01T00:00:00Z",
    end_date: "2024-05-07T23:59:59Z",
    min_order_value: 0,
    max_uses: 50,
    used_count: 12,
    is_active: false, // Bị admin tắt thủ công
  },
  {
    _id: "dsc_009",
    code: "PAYDAY",
    description: "Giảm 5% ngày lương về",
    type: "percent",
    value: 5,
    start_date: "2024-01-01T00:00:00Z",
    end_date: "2025-01-01T00:00:00Z",
    min_order_value: 500000,
    max_uses: 10000,
    used_count: 5600,
    is_active: true,
  },
  {
    _id: "dsc_010",
    code: "TEST_DEV",
    description: "Mã test cho developer",
    type: "amount",
    value: 1000,
    start_date: "2023-01-01T00:00:00Z",
    end_date: "2030-01-01T00:00:00Z",
    min_order_value: 0,
    max_uses: 999999,
    used_count: 88,
    is_active: true,
  }
];

export default function DiscountCodesManagement() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1) || 1;
  const searchQuery = searchParams.get("q") || "";
  const type = searchParams.get("type") || "";
  const fromDate = searchParams.get("fromDate") || "";
  const toDate = searchParams.get("toDate") || "";
  const status = searchParams.get("status") || "";

  const [limit, setLimit] = useState(7);
  const [data, setData] = useState<IDiscountCode[]>([]);
  const [total, setTotal] = useState(0);

  const fetchDiscountCodes = async () => {
    setData(mockDiscountCodes.slice(0, limit)) //fake
    setTotal(mockDiscountCodes.length)
  };

  useEffect(() => {
    fetchDiscountCodes();
  }, [page, limit, searchQuery, type, fromDate, toDate, status,]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Discounts & Promotions
        </h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => { router.push("discount-codes/new") }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Discount
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar placeholder="Search discount codes..." willUpdateQuery className="w-84" />

            <DiscountCodesFilter />
          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <DiscountCodesTable
              data={data}
              onEdit={(id) => { }}
              onActiveChange={(id, active) => { }}
            />
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="discount code" />
        </CardContent>
      </Card>
    </div>
  );
}