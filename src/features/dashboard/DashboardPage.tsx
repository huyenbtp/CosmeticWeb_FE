"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DollarSign, ShoppingBag, Users, Package } from "lucide-react";
import StatCard from "./StatCard";
import DashboardCharts from "./DashboardCharts";
import dashboardApi from "@/lib/api/dashboard.api";
import { IDashboardAnalytics } from "@/interfaces/dashboard.interface";

const MOCK: IDashboardAnalytics = {
  summary: {
    totalRevenue: 126500000,
    totalOrders: 2534,
    totalCustomers: 345,
    totalProducts: 95,
  },
  salesOverview: [
    { label: "Jan", revenue: 45000000, orders: 900 },
    { label: "Feb", revenue: 52000000, orders: 1040 },
    { label: "Mar", revenue: 48000000, orders: 960 },
    { label: "Apr", revenue: 61000000, orders: 1220 },
    { label: "May", revenue: 55000000, orders: 1100 },
    { label: "Jun", revenue: 67000000, orders: 1340 },
    { label: "Jul", revenue: 70000000, orders: 1400 },
    { label: "Aug", revenue: 64000000, orders: 1280 },
    { label: "Sep", revenue: 72000000, orders: 1440 },
    { label: "Oct", revenue: 80000000, orders: 1600 },
    { label: "Nov", revenue: 95000000, orders: 1900 },
    { label: "Dec", revenue: 110000000, orders: 2200 },
  ],
  categories: [
    { name: "Skincare", value: 45 },
    { name: "Makeup", value: 25 },
    { name: "Haircare", value: 20 },
    { name: "Fragrance", value: 10 },
  ],
  customerGrowth: [
    { month: "Jan", customers: 450 },
    { month: "Feb", customers: 520 },
    { month: "Mar", customers: 480 },
    { month: "Apr", customers: 610 },
    { month: "May", customers: 580 },
    { month: "Jun", customers: 720 },
    { month: "Jul", customers: 650 },
    { month: "Aug", customers: 700 },
    { month: "Sep", customers: 780 },
    { month: "Oct", customers: 820 },
    { month: "Nov", customers: 910 },
    { month: "Dec", customers: 1050 },
  ],
  ordersByStatus: [
    { status: "Pending", count: 23 },
    { status: "Confirmed", count: 1156 },
    { status: "Packed", count: 89 },
    { status: "Shipping", count: 43 },
    { status: "Delivered", count: 200 },
    { status: "Cancelled", count: 12 },
  ],
  brands: [
    { name: "L'Oreal", value: 320 },
    { name: "Innisfree", value: 280 },
    { name: "The Ordinary", value: 210 },
    { name: "Cerave", value: 180 },
  ],
  topProducts: [
    {
      name: "Facial Cleanser A",
      sold: 234,
      image: "https://placehold.co/100x100/576D64/white?text=A",
    },
    {
      name: "Moisturizer B",
      sold: 198,
      image: "https://placehold.co/100x100/AAC0B5/white?text=B",
    },
    {
      name: "Toner C",
      sold: 156,
      image: "https://placehold.co/100x100/8B9D94/white?text=C",
    },
    {
      name: "Serum D",
      sold: 134,
      image: "https://placehold.co/100x100/C9D6CE/white?text=D",
    },
    {
      name: "Face Mask E",
      sold: 98,
      image: "https://placehold.co/100x100/6E8378/white?text=E",
    },
    {
      name: "Sunscreen F",
      sold: 76,
      image: "https://placehold.co/100x100/576D64/white?text=F",
    },
    {
      name: "Makeup Remover G",
      sold: 54,
      image: "https://placehold.co/100x100/AAC0B5/white?text=G",
    },
  ],
};

const formatVND = (value: number) => value.toLocaleString("vi-VN") + " đ";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IDashboardAnalytics>(MOCK);
  const [range, setRange] = useState("monthly");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [
          summary,
          salesOverview,
          categories,
          customerGrowth,
          ordersByStatus,
          brands,
          topProducts,
        ] = await Promise.all([
          dashboardApi.fetchSummary(),
          dashboardApi.fetchSalesOverview(range),
          dashboardApi.fetchCategories(),
          dashboardApi.fetchCustomerGrowth(),
          dashboardApi.fetchOrdersByStatus(),
          dashboardApi.fetchBrands(),
          dashboardApi.fetchTopProducts(7),
        ]);
        setData({
          summary,
          salesOverview,
          categories,
          customerGrowth,
          ordersByStatus,
          brands,
          topProducts,
        });
      } catch (error) {
        console.warn("Dashboard API not ready, using mock data:", error);
        toast.info("Using sample data (analytics API not ready yet)");
        setData(MOCK);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [range]);

  const { summary } = data;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-black">
        Dashboard
      </h1>

      {/* ===== STAT CARDS (giữ nguyên) ===== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatVND(summary.totalRevenue)}
          icon={DollarSign}
          loading={loading}
        />
        <StatCard
          title="Total Orders"
          value={summary.totalOrders.toLocaleString("vi-VN")}
          icon={ShoppingBag}
          loading={loading}
        />
        <StatCard
          title="Customers"
          value={summary.totalCustomers.toLocaleString("vi-VN")}
          icon={Users}
          loading={loading}
        />
        <StatCard
          title="Products"
          value={summary.totalProducts.toLocaleString("vi-VN")}
          icon={Package}
          loading={loading}
        />
      </div>

      {/* ===== CHARTS ===== */}
      <DashboardCharts
        salesOverview={data.salesOverview}
        categories={data.categories}
        customerGrowth={data.customerGrowth}
        ordersByStatus={data.ordersByStatus}
        brands={data.brands}
        topProducts={data.topProducts}
        onRangeChange={setRange}
      />
    </div>
  );
}
