"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import StatCards from "./StatCards";
import ImportItemsCard from "./ImportItemsCard";
import ImportInformation from "./ImportInformation";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { IImportDetail } from "@/interfaces/import.interface";
import importApi from "@/lib/api/importOrder.api";

const mockImport: IImportDetail = {
  _id: "IMP-001",
  import_code: "IMP-15112025-093000",
  staff: {
    _id: "1",
    staff_code: "WAM-2025-001",
    full_name: "Sarah Johnson",
  },
  items: [
    {
      _id: "1",
      import_id: "1",
      product: {
        _id: "1",
        name: "Kem chống nắng Anessa Perfect UV",
        sku: "SUN-ANE-251204215107",
        image: "https://picsum.photos/200/300?random=1",
      },
      unit_price: 200000,
      quantity: 40,
    },
    {
      _id: "2",
      import_id: "1",
      product: {
        _id: "2",
        name: "Sữa rửa mặt Innisfree Green Tea",
        sku: "CLS-INN-251204215107",
        image: "https://picsum.photos/200/300?random=2",
      },
      unit_price: 100000,
      quantity: 20,
    },
    {
      _id: "3",
      import_id: "1",
      product: {
        _id: "3",
        name: "Phấn phủ Fit Me Matte + Poreles",
        sku: "MAK-FIT-251204215107",
        image: "https://picsum.photos/200/300?random=3",
      },
      unit_price: 150000,
      quantity: 40,
    }
  ],
  products_updated: 3,
  items_imported: 100,
  total_amount: 16000000,
  note: "Regular monthly stock replenishment order",
  createdAt: "2025-11-15T09:30:00",
  updatedAt: "2025-11-15T09:30:00",
};

export default function ImportDetail() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IImportDetail>();
  const [loading, setLoading] = useState(false);

  const fetchImport = async () => {
    setLoading(true)
    try {
      const res = await importApi.fetchImportById(id);
      setData(res);
    } catch (error) {
      console.error("Fetch import failed:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchImport();
  }, []);

  const handleNoteChange = async (note: string) => {
    try {
      await importApi.updateNote(id, note);
    } catch (error) {
      console.error("Update note failed:", error);
    } finally {
      fetchImport()
    }
  };

  if (loading) return (
    <div className="h-full flex justify-center items-center">
      <Spinner className="size-12" />
    </div>
  )
  if (data) return (
    <div className="px-8 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 mr-10">
          <h1 className="text-2xl font-semibold">Import {data.import_code}</h1>
          <p className="text-muted-foreground">
            Placed on {dayjs(data.createdAt).format("MMMM D, YYYY")} at {dayjs(data.createdAt).format("hh:mm A")}
          </p>
        </div>
      </div>

      <StatCards data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Import Items */}
        <div className="lg:col-span-2">
          <ImportItemsCard data={data} />
        </div>

        {/* Import Information */}
        <div className="col-span-1 space-y-6">
          <ImportInformation
            data={data}
            onChangeNote={(note) => {
              handleNoteChange(note)
              router.refresh()
            }}
          />
        </div>
      </div>
    </div>
  );
}