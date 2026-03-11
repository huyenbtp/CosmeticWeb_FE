"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import StaffForm from "../StaffForm";
import { IAddEditStaff } from "@/interfaces/staff.interface";
import staffAPi from "@/lib/api/staff.api";
import { ImageState } from "@/components/layout/ImageUploader";

export default function NewStaff() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSave = async (createData: IAddEditStaff, file: File | null, imageState: ImageState) => {
    setLoading(true)

    try {
      const payload: any = {
        ...createData,
        staffStatus: createData.status,
        username: createData.account.username,
        password: createData.account.password,
        accountStatus: createData.account.status,
        role: createData.account.role,
        image: file,
      }

      const res = await staffAPi.createStaff(payload)

      router.replace(`./${res._id}`)
    } catch (error) {
      console.error("Save staff failed:", error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <StaffForm
      mode="create"
      loading={loading}
      onSubmit={(data, file, state) => handleSave(data, file, state)}
    />
  );
}