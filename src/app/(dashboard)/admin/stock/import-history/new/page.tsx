"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImportOrderForm from "./ImportOrderForm";
import { IAddEditImport } from "@/interfaces/import.interface";
import importApi from "@/lib/api/importOrder.api";

export default function NewImport() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSave = async (createData: IAddEditImport) => {
    setLoading(true)

    try {
      const res = await importApi.createImport(createData)

      router.replace(`./${res._id}`)
    } catch (error) {
      console.error("Save import failed:", error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <ImportOrderForm
      loading={loading}
      onSubmit={(data) => handleSave(data)}
    />
  );
}