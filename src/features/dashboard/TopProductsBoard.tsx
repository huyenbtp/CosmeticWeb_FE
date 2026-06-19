"use client";

import { ITopProductPoint } from "@/interfaces/dashboard.interface";

const formatNumber = (value: number) => value.toLocaleString("vi-VN");
const BRAND_COLOR = "#576D64";

interface Props {
  topProducts: ITopProductPoint[];
}

function ProductName({ name, className }: { name: string; className?: string }) {
  return (
    <span className={`group/name relative inline-block ${className ?? ""}`}>
      <span className="block truncate">{name}</span>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/name:opacity-100">
        {name}
      </span>
    </span>
  );
}

export default function TopProductsBoard({ topProducts }: Props) {
  const top3 = topProducts.slice(0, 3);
  const rest = topProducts.slice(3);
  const first = top3[0];
  const second = top3[1];
  const third = top3[2];

  return (
    <div className="space-y-5">
      {/* ===== PODIUM TOP 1-2-3 (giữ nguyên) ===== */}
      <div className="flex items-end justify-center gap-3 pt-2">
        {second && (
          <PodiumItem
            rank={2}
            product={second}
            heightClass="h-20"
            opacity={0.55}
          />
        )}
        {first && (
          <PodiumItem rank={1} product={first} heightClass="h-28" opacity={1} />
        )}
        {third && (
          <PodiumItem
            rank={3}
            product={third}
            heightClass="h-14"
            opacity={0.35}
          />
        )}
      </div>

      {/* ===== HẠNG 4 TRỞ ĐI: chỉ ảnh + tên + "xxx sold" ===== */}
      {rest.length > 0 && (
        <div className="space-y-1 border-t pt-3">
          {rest.map((p, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-3 rounded-md px-2 py-2 hover:bg-slate-50"
            >
              <div className="flex min-w-0 items-center gap-3">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-9 w-9 shrink-0 rounded-md object-cover"
                  />
                ) : (
                  <div className="h-9 w-9 shrink-0 rounded-md bg-slate-200" />
                )}
                <ProductName
                  name={p.name}
                  className="text-sm font-medium text-black"
                />
              </div>
              <span
                className="shrink-0 text-sm font-medium"
                style={{ color: BRAND_COLOR }}
              >
                {formatNumber(p.sold)} sold
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PodiumItem({
  rank,
  product,
  heightClass,
  opacity,
}: {
  rank: number;
  product: ITopProductPoint;
  heightClass: string;
  opacity: number;
}) {
  return (
    <div className="flex w-24 flex-col items-center">
      <div className="relative mb-2">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-12 w-12 rounded-full object-cover ring-2"
            style={{ ["--tw-ring-color" as string]: BRAND_COLOR }}
          />
        ) : (
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 ring-2"
            style={{ ["--tw-ring-color" as string]: BRAND_COLOR }}
          >
            <span className="text-xs text-slate-500">No img</span>
          </div>
        )}
        <span
          className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold shadow"
          style={{ color: BRAND_COLOR }}
        >
          {rank}
        </span>
      </div>
      <div className="mb-2 w-full text-center">
        <ProductName
          name={product.name}
          className="w-full text-xs font-semibold text-slate-700"
        />
        <div className="text-xs text-slate-400">
          {formatNumber(product.sold)} sold
        </div>
      </div>
      <div
        className={`flex w-full items-start justify-center rounded-t-lg shadow-sm ${heightClass} pt-2`}
        style={{ backgroundColor: BRAND_COLOR, opacity }}
      >
        <span className="text-xl font-bold text-white drop-shadow">{rank}</span>
      </div>
    </div>
  );
}
