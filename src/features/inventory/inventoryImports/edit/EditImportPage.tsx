"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ImportOrderForm from "../shared/ImportOrderForm";
import { IAddEditImport, IImportDetail } from "@/interfaces/import.interface";
import importApi from "@/lib/api/importOrder.api";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function EditImportPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IImportDetail>();
  const [loading, setLoading] = useState(false);

  const fetchImport = async () => {
    setLoading(true)
    try {
      const res = await importApi.fetchImportById(id);
      setData(res);
      console.log(res)
    } catch (error) {
      toast.error("Fetch import failed:" + error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchImport();

  }, []);


  const handleSave = async (updateData: IAddEditImport) => {
    setLoading(true)

    try {
      const res = await importApi.updateImport(id, updateData)
      toast.success("Save import successfully")
      router.replace(`../${res._id}`)
    } catch (error) {
      toast.error("Save import failed:" + error);
    } finally {
      setLoading(false)
    }
  };

  if (loading) return (
    <div className="h-full flex justify-center items-center">
      <Spinner className="size-12" />
    </div>
  )
  return (
    <ImportOrderForm
      mode="edit"
      loading={loading}
      initialData={data}
      onSubmit={(data) => handleSave(data)}
    />
  );
}