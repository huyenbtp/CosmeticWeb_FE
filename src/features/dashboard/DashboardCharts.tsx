"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ComposedChart,
  Line,
  Bar,
  LineChart,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  ISalesOverviewPoint,
  ICategoryPoint,
  ICustomerGrowthPoint,
  IOrderStatusPoint,
  IBrandPoint,
  ITopProductPoint,
} from "@/interfaces/dashboard.interface";
import TopProductsBoard from "./TopProductsBoard";
import OrdersSummary from "./OrdersSummary";
import BrandList from "./BrandList";

const BRAND = "#576D64";
const BRAND_LIGHT = "#AAC0B5";
const PIE_COLORS = ["#576D64", "#AAC0B5", "#8B9D94", "#C9D6CE", "#6E8378"];

const formatNumber = (value: number) => value.toLocaleString("vi-VN");
const tooltipFormatter = (value: unknown) =>
  typeof value === "number" ? value.toLocaleString("vi-VN") : String(value);

const tooltipStyle = {
  backgroundColor: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
};

interface Props {
  salesOverview: ISalesOverviewPoint[];
  categories: ICategoryPoint[];
  customerGrowth: ICustomerGrowthPoint[];
  ordersByStatus: IOrderStatusPoint[];
  brands: IBrandPoint[];
  topProducts: ITopProductPoint[];
  onRangeChange?: (range: string) => void;
}

export default function DashboardCharts({
  salesOverview,
  categories,
  customerGrowth,
  ordersByStatus,
  brands,
  topProducts,
  onRangeChange,
}: Props) {
  const [range, setRange] = useState("monthly");
  const [hidden, setHidden] = useState<{ revenue: boolean; orders: boolean }>({
    revenue: false,
    orders: false,
  });

  const handleRange = (value: string) => {
    setRange(value);
    onRangeChange?.(value);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLegendClick = (e: any) => {
    const key = String(e?.dataKey);
    if (key === "revenue" || key === "orders") {
      setHidden((prev) => ({
        ...prev,
        [key]: !prev[key as "revenue" | "orders"],
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* ===== SALES OVERVIEW (cột = Orders, đường = Revenue) ===== */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-black">Sales Overview</CardTitle>
            <Tabs value={range} onValueChange={handleRange}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={380}>
            <ComposedChart data={salesOverview}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="label" stroke="#6b7280" />
              <YAxis yAxisId="left" stroke="#6b7280" />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#6b7280"
                tickFormatter={formatNumber}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(value) => tooltipFormatter(value)}
              />
              <Legend
                onClick={handleLegendClick}
                wrapperStyle={{ cursor: "pointer" }}
              />
              {/* Cột = Orders */}
              <Bar
                yAxisId="left"
                dataKey="orders"
                name="Orders"
                fill={BRAND}
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
                hide={hidden.orders}
              />
              {/* Đường = Revenue */}
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke={BRAND_LIGHT}
                strokeWidth={3}
                dot={{ fill: BRAND_LIGHT, r: 4 }}
                hide={hidden.revenue}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ===== Categories (1/3) + Customer Growth (2/3) ===== */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-black">Top Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={categories}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categories.map((_, index) => (
                    <Cell
                      key={index}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-3 space-y-2">
              {categories.map((c, index) => (
                <div key={c.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: PIE_COLORS[index % PIE_COLORS.length],
                      }}
                    />
                    <span className="text-sm text-black">{c.name}</span>
                  </div>
                  <span className="text-sm font-medium text-black">
                    {formatNumber(c.value)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-black">Customer Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={formatNumber} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(value) => tooltipFormatter(value)}
                />
                <Line
                  type="monotone"
                  dataKey="customers"
                  name="Customers"
                  stroke={BRAND}
                  strokeWidth={3}
                  dot={{ fill: BRAND, r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ===== Orders Summary + Top Brands + Top Products ===== */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Orders Summary - 4 ô màu */}
        <Card>
          <CardHeader>
            <CardTitle className="text-black">Orders Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <OrdersSummary ordersByStatus={ordersByStatus} />
          </CardContent>
        </Card>

        {/* Top Brands - dạng list có STT */}
        <Card>
          <CardHeader>
            <CardTitle className="text-black">Top Brands</CardTitle>
          </CardHeader>
          <CardContent>
            <BrandList brands={brands} />
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-black">Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <TopProductsBoard topProducts={topProducts} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
