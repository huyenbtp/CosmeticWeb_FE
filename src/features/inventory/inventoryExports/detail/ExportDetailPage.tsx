"use client"

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner"
import StatCards from "./StatCards";
import ExportItemsCard from "./ExportItemsCard";
import ExportInformation from "./ExportInformation";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { IExportDetail } from "@/interfaces/export.inerface";
import exportApi from "@/lib/api/inventoryExport.api";
import { getProductExportTypeBadge } from "@/features/inventory/inventoryExports/management/ExportsFilter";


export default function ExportDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IExportDetail>();
  const [loading, setLoading] = useState(false);

  const fetchExport = async () => {
    setLoading(true)
    try {
      const res = await exportApi.fetchExportById(id);
      setData(res);
    } catch (error) {
      console.error("Fetch export failed:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchExport();
  }, []);

  const handleNotesChange = async (notes: string) => {
    try {
      await exportApi.updateNotes(id, notes);
      toast.success("Update notes successfully")
    } catch (error) {
      toast.error("Update notes failed:" + error);
    } finally {
      fetchExport()
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
        <div className="flex-1 mr-10 flex items-start gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Export {data.export_code}</h1>
            <p className="text-muted-foreground">
              Placed on {dayjs(data.createdAt).format("MMMM D, YYYY")} at {dayjs(data.createdAt).format("hh:mm A")}
            </p>
          </div>
        </div>

        {getProductExportTypeBadge(data.type, "sm")}
      </div>

      <StatCards data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Items */}
        <div className="lg:col-span-2">
          <ExportItemsCard data={data} />
        </div>

        {/* Export Information */}
        <div className="col-span-1 space-y-6">
          <ExportInformation
            data={data}
            onChangeNotes={(notes) => {
              handleNotesChange(notes)
              router.refresh()
            }}
          />
        </div>
      </div>
    </div>
  );
}