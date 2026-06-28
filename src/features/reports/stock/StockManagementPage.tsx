"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, History } from "lucide-react";
import StatCards from "./StatCards";
import LowStockCard from "./LowStockCard";
import OutOfStockCard from "./OutOfStockCard";
import { IStockStats, ILowStockItem, IOutOfStockItem } from "@/interfaces/stock.interface";
import { useRouter } from "next/navigation";
import stockApi from "@/lib/api/stock.api";
import { toast } from "sonner";

interface IStockManagementData {
  stats: IStockStats;
  lowStockItems: ILowStockItem[];
  outOfStockItems: IOutOfStockItem[];
}

export default function StockManagementPage() {
  const router = useRouter();
  const [data, setData] = useState<IStockManagementData>();

  const fetchData = async () => {
    try {
      const res = await stockApi.fetchOverview();
      setData(res);
    } catch (error) {
      toast.error("Fetch stock overview failed: " + error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data) return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Stock Management</h1>
      </div>

      <StatCards data={data.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LowStockCard data={data.lowStockItems} />
        <OutOfStockCard data={data.outOfStockItems} />
      </div>
    </div>
  );
}
