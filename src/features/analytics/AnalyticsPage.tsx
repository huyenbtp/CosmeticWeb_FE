"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  TrendingUp,
  TrendingDown,
  FileSpreadsheet,
  Printer,
  RefreshCw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  IAnalyticsData,
  IAnalyticsFilter,
  AnalyticsLevel,
} from "@/interfaces/analytics.interface";
import { ANALYTICS_MOCK } from "./analytics.mock";
import { exportToCSV, exportToPrint, describeFilter } from "./exportReport";
import analyticsApi from "@/lib/api/analytics.api";

const BRAND = "#576D64";
const BRAND_LIGHT = "#AAC0B5";
const PIE_COLORS = ["#576D64", "#6E8378", "#8B9D94", "#AAC0B5", "#C9D6CE"];

const formatNumber = (v: number) => v.toLocaleString("vi-VN");
const formatVND = (v: number) => v.toLocaleString("vi-VN") + " đ";

const tooltipStyle = {
  backgroundColor: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
};

const calcChange = (value: number, prev: number) =>
  !prev ? 0 : ((value - prev) / prev) * 100;

const now = new Date();
const toISO = (d: Date) => d.toISOString().slice(0, 10);

const YEARS = Array.from({ length: 5 }, (_, i) => now.getFullYear() - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IAnalyticsData>(ANALYTICS_MOCK);
  const [filter, setFilter] = useState<IAnalyticsFilter>({
    level: "month",
    day: toISO(now),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [kpis, revenueTrend, categoryShare, topProducts] =
        await Promise.all([
          analyticsApi.fetchKpis(filter),
          analyticsApi.fetchRevenueTrend(filter),
          analyticsApi.fetchCategoryShare(filter),
          analyticsApi.fetchTopProducts(filter),
        ]);
      setData({ kpis, revenueTrend, categoryShare, topProducts });
    } catch (error) {
      console.warn("Analytics API not ready, using mock data:", error);
      toast.info("Using mock data (analytics API not ready)");
      setData(ANALYTICS_MOCK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const setLevel = (level: string) =>
    setFilter((f) => ({ ...f, level: level as AnalyticsLevel }));

  return (
    <div className="space-y-6 p-6">
      {/* ===== HEADER + ACTIONS ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Business performance analysis — {describeFilter(filter)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportToCSV(data, filter)}
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
          <Button variant="outline" size="sm" onClick={exportToPrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print / PDF
          </Button>
          <Button
            size="sm"
            className="bg-[#576D64] hover:bg-[#6E8378]"
            onClick={loadData}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* ===== DATE / MONTH / YEAR FILTER ===== */}
      <Card>
        <CardContent className="flex flex-wrap items-end gap-4 p-4">
          {/* Level selection */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted-foreground">View by</label>
            <Tabs value={filter.level} onValueChange={setLevel}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Day level → select a date */}
          {filter.level === "day" && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Select date</label>
              <Input
                type="date"
                value={filter.day}
                onChange={(e) =>
                  setFilter((f) => ({ ...f, day: e.target.value }))
                }
                className="w-44"
              />
            </div>
          )}

          {/* Month level → select month + year */}
          {filter.level === "month" && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Month</label>
                <select
                  value={filter.month}
                  onChange={(e) =>
                    setFilter((f) => ({ ...f, month: Number(e.target.value) }))
                  }
                  className="h-9 w-28 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      Month {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-muted-foreground">Year</label>
                <select
                  value={filter.year}
                  onChange={(e) =>
                    setFilter((f) => ({ ...f, year: Number(e.target.value) }))
                  }
                  className="h-9 w-28 rounded-md border border-input bg-background px-3 text-sm"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Year level → select year */}
          {filter.level === "year" && (
            <div className="flex flex-col gap-1">
              <label className="text-xs text-muted-foreground">Year</label>
              <select
                value={filter.year}
                onChange={(e) =>
                  setFilter((f) => ({ ...f, year: Number(e.target.value) }))
                }
                className="h-9 w-28 rounded-md border border-input bg-background px-3 text-sm"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ===== KPI CARDS (with % change) ===== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.kpis.map((kpi) => {
          const change = calcChange(kpi.value, kpi.prevValue);
          const up = change >= 0;
          const display =
            kpi.format === "currency"
              ? formatVND(kpi.value)
              : formatNumber(kpi.value);
          return (
            <Card key={kpi.label}>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                {loading ? (
                  <div className="mt-2 h-7 w-24 animate-pulse rounded bg-muted" />
                ) : (
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    {display}
                  </p>
                )}
                <div
                  className="mt-2 flex items-center gap-1 text-sm font-medium"
                  style={{ color: up ? "#16a34a" : "#dc2626" }}
                >
                  {up ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {Math.abs(change).toFixed(1)}%
                  <span className="text-muted-foreground">
                    {" "}
                    vs previous period
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ===== REVENUE CHART ===== */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={360}>
            <AreaChart data={data.revenueTrend}>
              <defs>
                <linearGradient id="revColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BRAND} stopOpacity={0.4} />
                  <stop
                    offset="95%"
                    stopColor={BRAND_LIGHT}
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="label" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={formatNumber} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v) => formatNumber(Number(v))}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke={BRAND}
                strokeWidth={3}
                fill="url(#revColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ===== CATEGORY BREAKDOWN + ORDERS ===== */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.categoryShare}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {data.categoryShare.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-foreground">Orders over time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="label" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={formatNumber} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => formatNumber(Number(v))}
                />
                <Bar
                  dataKey="orders"
                  name="Orders"
                  fill={BRAND}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ===== TOP PRODUCTS TABLE ===== */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Top Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">#</th>
                  <th className="pb-3 font-medium">Product</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 text-right font-medium">Sold</th>
                  <th className="pb-3 text-right font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {data.topProducts.map((p, i) => (
                  <tr key={p.name} className="border-b hover:bg-slate-50">
                    <td className="py-3 text-muted-foreground">{i + 1}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.image}
                            alt={p.name}
                            className="h-9 w-9 rounded-md object-cover"
                          />
                        ) : (
                          <div className="h-9 w-9 rounded-md bg-slate-200" />
                        )}
                        <span className="font-medium text-foreground">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{p.category}</td>
                    <td className="py-3 text-right">{formatNumber(p.sold)}</td>
                    <td
                      className="py-3 text-right font-medium"
                      style={{ color: BRAND }}
                    >
                      {formatVND(p.revenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
