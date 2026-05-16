"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, History } from "lucide-react";
import StatCards from "./StatCards";
import LowStockCard from "./LowStockCard";
import OutOfStockCard from "./OutOfStockCard";
import { IStockStats, ILowStockItem, IOutOfStockItem, } from "@/interfaces/stock.interface";
import { useRouter } from "next/navigation";

const stats: IStockStats = {
  totalItems: 103,
  totalValue: 28305000,
  lowStockCount: 20,
  outOfStockCount: 7,
}

const lowStockItems: ILowStockItem[] = [
  { _id: "694837ce08ec44380953aebb", name: "Son môi lì Red Velvet", sku: "LIP-3CE-2026-0001", stock_quantity: 2, brand: "3CE", last_imported: "2025-11-06T19:30:02" },
  { _id: "2", name: "Kem dưỡng ẩm Hada Labo", sku: "MOI-ROH-2026-0001", stock_quantity: 1, brand: "Rohto", last_imported: "2025-11-06T19:30:02" },
  { _id: "3", name: "Sữa rửa mặt Innisfree Green Tea", sku: "CLE-INN-2026-0001", stock_quantity: 3, brand: "Innisfree", last_imported: "2025-11-06T19:30:02" },
  { _id: "4", name: "Kem chống nắng Anessa Perfect UV", sku: "SUN-SHI-2026-0001", stock_quantity: 4, brand: "Shiseido", last_imported: "2025-11-06T19:30:02" },
  { _id: "5", name: "Phấn phủ Fit Me Matte + Poreless", sku: "POW-MAY-0001", stock_quantity: 8, brand: "Maybelline", last_imported: "2025-11-06T19:30:02" },
  { _id: "6", name: "Serum Vitamin C Melano CC", sku: "SER-ROH-2026-0001", stock_quantity: 5, brand: "Rohto", last_imported: "2025-11-06T19:30:02" },
];

const outOfStockItems: IOutOfStockItem[] = [
  { _id: "7", name: "Toner Simple Kind to Skin", sku: "TON-SIM-2026-0001", brand: "Unilever", last_imported: "2025-11-06T19:30:02" },
  { _id: "694ae4efbe8952d1e4f58cb5", name: "Mặt nạ giấy Mediheal Tea Tree", sku: "PAP-MED-2026-0001", brand: "Mediheal", last_imported: "2025-11-06T19:30:02" },
  { _id: "9", name: "Dầu gội Tsubaki Premium Moist", sku: "SHA-TSU-2026-0001", brand: "Shiseido", last_imported: "2025-11-06T19:30:02" },
];

interface IStockManagementData {
  stats: IStockStats;
  lowStockItems: ILowStockItem[];
  outOfStockItems: IOutOfStockItem[];
}

const mockData: IStockManagementData = {
  stats,
  lowStockItems,
  outOfStockItems,
};

export default function StockManagement() {
  const router = useRouter();
  const [data, setData] = useState<IStockManagementData>();

  const fetchData = async () => {

  };

  useEffect(() => {
    fetchData();
    setData(mockData) //sau khi fetch data thật thì xóa dòng này đi
  }, []);

  if (data) return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Stock Management
        </h1>

        {/** 
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("stock/import-history")}
          >
            <History className="w-4 h-4 mr-2" />
            View Import History
          </Button>
          <Button
            onClick={() => router.push("stock/import-history/new")}
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Stock
          </Button>
        </div>
        */}
      </div>

      <StatCards data={data.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LowStockCard data={data.lowStockItems} />
        <OutOfStockCard data={data.outOfStockItems} />
      </div>
    </div>
  );
}