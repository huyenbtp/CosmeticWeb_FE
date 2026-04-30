"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import StaffForm from "../../StaffForm";
import { IAddEditStaff, IEditStaff } from "@/interfaces/staff.interface";
import staffApi from "@/lib/api/staff.api";
import { Spinner } from "@/components/ui/spinner";
import { ImageState } from "@/components/layout/ImageUploader";
import { IRole } from "@/interfaces/role.interface";
import roleApi from "@/lib/api/role.api";

const mockStaff: IAddEditStaff = {
  full_name: "Sarah Johnson",
  gender: "female",
  dob: "1998-02-25T00:00:00",
  phone: "0123456789",
  image: "https://picsum.photos/200/300",
  status: "active",
  user: {
    email: "SarahJohnson",
    role: { _id: "1", name: "admin" },
    is_active: true,
  },
};

export default function EditStaff() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IEditStaff>();
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

  const fetchStaff = async () => {
    setLoading(true)
    try {
      const res = await staffApi.fetchStaffByIdToAdminEdit(id);
      setData(res);
      console.log(res)
    } catch (error) {
      console.error("Fetch staff failed:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchStaff();

  }, []);

  const handleSave = async (updateData: IEditStaff, file: File | null, imageState: ImageState) => {
    setLoading(true)

    try {
      const payload: any = {
        ...updateData,
        is_active: updateData.user.is_active,
        role_id: updateData.user.role._id,
      }

      if (imageState === "new") {
        payload.image = file
      }

      if (imageState === "remove") {
        payload.image = null
      }

      const res = await staffApi.updateStaff(id, payload)

      router.replace(`../${res._id}`)
    } catch (error) {
      console.error("Save staff failed:", error);
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="h-full flex justify-center items-center">
      <Spinner className="size-12" />
    </div>
  )
  return (
    <StaffForm
      mode="edit"
      loading={loading}
      initialData={data}
      onSubmit={(data, file, state) => { handleSave(data, file, state) }}
      roleList={roleList}
    />
  );
}