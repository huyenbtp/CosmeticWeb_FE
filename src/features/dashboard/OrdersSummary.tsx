"use client";

import { IOrderStatusPoint } from "@/interfaces/dashboard.interface";

const formatNumber = (value: number) => value.toLocaleString("vi-VN");

// Lấy count theo status (không phân biệt hoa thường)
const getCount = (list: IOrderStatusPoint[], status: string) =>
  list.find((s) => s.status.toLowerCase() === status.toLowerCase())?.count ?? 0;

interface Props {
  ordersByStatus: IOrderStatusPoint[];
}

export default function OrdersSummary({ ordersByStatus }: Props) {
  const cards = [
    {
      label: "Pending",
      value: getCount(ordersByStatus, "Pending"),
      color: "#64748b",
      bg: "#f1f5f4",
    },
    {
      label: "Confirmed",
      value: getCount(ordersByStatus, "Confirmed"),
      color: "#16a34a",
      bg: "#ecfdf3",
    },
    {
      label: "Packed",
      value: getCount(ordersByStatus, "Packed"),
      color: "#ea580c",
      bg: "#fff7ed",
    },
    {
      label: "Shipping",
      value: getCount(ordersByStatus, "Shipping"),
      color: "#2563eb",
      bg: "#eff6ff",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-xl p-5"
          style={{ backgroundColor: c.bg }}
        >
          <p className="text-sm text-slate-500">{c.label}</p>
          <p className="mt-1 text-2xl font-bold" style={{ color: c.color }}>
            {formatNumber(c.value)}
          </p>
        </div>
      ))}
    </div>
  );
}
