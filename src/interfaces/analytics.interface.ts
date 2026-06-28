export interface IAnalyticsKpi {
  label: string;
  value: number;
  prevValue: number;
  format: "currency" | "number";
}

export interface IRevenuePoint {
  label: string;
  revenue: number;
  orders: number;
}

export interface ICategoryShare {
  name: string;
  value: number;
}

export interface ITopProductRow {
  name: string;
  category: string;
  sold: number;
  revenue: number;
  image?: string;
}

export interface IAnalyticsData {
  kpis: IAnalyticsKpi[];
  revenueTrend: IRevenuePoint[];
  categoryShare: ICategoryShare[];
  topProducts: ITopProductRow[];
}

// Cấp độ lọc: theo ngày / tháng / năm
export type AnalyticsLevel = "day" | "month" | "year";

export interface IAnalyticsFilter {
  level: AnalyticsLevel; // "day" | "month" | "year"
  day: string;   // YYYY-MM-DD (dùng khi level = "day")
  month: number; // 1..12 (dùng khi level = "month")
  year: number;  // ví dụ 2025
}
