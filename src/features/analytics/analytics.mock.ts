import { IAnalyticsData } from "@/interfaces/analytics.interface";

export const ANALYTICS_MOCK: IAnalyticsData = {
  kpis: [
    { label: "Doanh thu", value: 126500000, prevValue: 110000000, format: "currency" },
    { label: "Đơn hàng", value: 2534, prevValue: 2200, format: "number" },
    { label: "Khách hàng mới", value: 345, prevValue: 380, format: "number" },
    { label: "Giá trị đơn TB", value: 49920, prevValue: 50000, format: "currency" },
  ],
  revenueTrend: [
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
  categoryShare: [
    { name: "Skincare", value: 45 },
    { name: "Makeup", value: 25 },
    { name: "Haircare", value: 20 },
    { name: "Fragrance", value: 10 },
  ],
  topProducts: [
    { name: "Facial Cleanser A", category: "Skincare", sold: 234, revenue: 23400000, image: "https://placehold.co/80x80/576D64/white?text=A" },
    { name: "Moisturizer B", category: "Skincare", sold: 198, revenue: 19800000, image: "https://placehold.co/80x80/AAC0B5/white?text=B" },
    { name: "Toner C", category: "Skincare", sold: 156, revenue: 15600000, image: "https://placehold.co/80x80/8B9D94/white?text=C" },
    { name: "Serum D", category: "Skincare", sold: 134, revenue: 20100000, image: "https://placehold.co/80x80/C9D6CE/white?text=D" },
    { name: "Lipstick E", category: "Makeup", sold: 98, revenue: 9800000, image: "https://placehold.co/80x80/6E8378/white?text=E" },
  ],
};
