"use client";

import { IBrandPoint } from "@/interfaces/dashboard.interface";

const formatNumber = (value: number) => value.toLocaleString("vi-VN");
const BRAND_COLOR = "#576D64";

// Các sắc độ xanh rêu cho ô chữ cái
const SHADES = ["#576D64", "#6E8378", "#8B9D94", "#AAC0B5", "#C9D6CE"];

interface Props {
  brands: IBrandPoint[];
}

export default function BrandList({ brands }: Props) {
  return (
    <div className="space-y-3">
      {brands.map((b, index) => (
        <div
          key={b.name}
          className="flex items-center justify-between gap-3 rounded-md px-2 py-2 hover:bg-slate-50"
        >
          <div className="flex min-w-0 items-center gap-3">
            {/* Số thứ tự */}
            <span className="w-4 shrink-0 text-sm font-medium text-slate-400">
              {index + 1}
            </span>
            {/* Ô vuông chữ cái đầu */}
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-base font-bold text-white"
              style={{ backgroundColor: SHADES[index % SHADES.length] }}
            >
              {b.name.charAt(0).toUpperCase()}
            </div>
            {/* Tên brand */}
            <span className="truncate text-sm font-medium text-black">
              {b.name}
            </span>
          </div>
          {/* Số liệu */}
          <span
            className="shrink-0 text-sm font-medium"
            style={{ color: BRAND_COLOR }}
          >
            {formatNumber(b.value)} sold
          </span>
        </div>
      ))}
    </div>
  );
}
