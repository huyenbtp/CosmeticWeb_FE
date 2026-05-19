"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StaffForm from "../shared/StaffForm";
import { IAddEditStaff } from "@/interfaces/staff.interface";
import staffAPi from "@/lib/api/staff.api";
import { ImageState } from "@/components/layout/ImageUploader";
import { IRole } from "@/interfaces/role.interface";
import roleApi from "@/lib/api/role.api";

export default function NewStaffPage() {
  const router = useRouter();
  const [roleList, setRoleList] = useState<IRole[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllRoles = async () => {
    try {
      const res = await roleApi.fetchAllRoles();
      setRoleList(res);
    } catch (error) {
      console.error("Fetch roles failed:", error);
    } finally {

    }
  };

  useEffect(() => {
    fetchAllRoles();
  }, []);

  const handleSave = async (createData: IAddEditStaff, file: File | null, imageState: ImageState) => {
    setLoading(true)

    try {
      const payload: any = {
        ...createData,
        email: createData.user.email,
        is_active: createData.user.is_active,
        role_id: createData.user.role._id,
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
      roleList={roleList}
    />
  );
}