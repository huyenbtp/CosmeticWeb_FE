"use client"

import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Filter, Plus } from "lucide-react";
import SkinTypesTable from "./SkinTypesTable";
import { ISkinType, IAddEditSkinType } from "@/interfaces/skinType.interface";
import skinTypeApi from "@/lib/api/skinType.api";
import { toast } from "sonner";
import AddEditSkinTypeDialog from "../shared/AddEditSkinTypeDialog";
import AlertDialog from "@/components/layout/AlertDialog";

const mockSkinTypes: ISkinType[] = [
  {
    _id: "64f1a2b3c9e123001",
    name: "Dry skin",
    description: "",
    status: "active",
    total_products: 150,
  },
  {
    _id: "64f1a2b3c9e123002",
    name: "Oily skin",
    description: "",
    status: "active",
    total_products: 342,
  },
  {
    _id: "64f1a2b3c9e123003",
    name: "Normal skin",
    description: "",
    status: "archived",
    total_products: 24,
  },
  {
    _id: "64f1a2b3c9e123004",
    name: "Acne skin",
    description: "",
    status: "active",
    total_products: 89,
  },
  {
    _id: "64f1a2b3c9e123005",
    name: "Combination skin",
    status: "archived",
    description: "",
    total_products: 0,
  },
  {
    _id: "64f1a2b3c9e123006",
    name: "Sensitive skin",
    description: "",
    status: "active",
    total_products: 0,
  },
];

export default function SkinTypesManagementPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [selected, setSelected] = useState<ISkinType | null>(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const fetchSkinTypes = async () => {
    setLoading(true);

    try {
      const res = await skinTypeApi.fetchAllSkinTypes();
      setData(res);
    } catch (error) {
      toast.error("Fetch skin types failed:" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSkinType = async (createData: IAddEditSkinType) => {
    setLoading(true)

    const { _id, ...payload } = createData;
    try {
      const res = await skinTypeApi.createSkinType(payload);

      toast.success("Create skin type successfully");
      setSelected(null);
      setIsAddEditDialogOpen(false);
      fetchSkinTypes();
    } catch (error) {
      toast.error("Create skin type failed:" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSkinType = async (updateData: IAddEditSkinType) => {
    const { _id, ...payload } = updateData;
    if (!_id) return;

    setLoading(true)

    try {
      const res = await skinTypeApi.updateSkinType(_id, payload);

      toast.success("Update successfully");
      setSelected(null);
      setIsAddEditDialogOpen(false);
      fetchSkinTypes();
    } catch (error) {
      toast.error("Update failed:" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkinType = async () => {
    if (!selected) return;
    setLoading(true)

    try {
      const res = await skinTypeApi.deleteSkinType(selected._id);

      toast.success("Delete skin type successfully");
      setSelected(null);
      setAlertVisible(false);
      fetchSkinTypes();
    } catch (error) {
      toast.error("Delete skin type failed:" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkinTypes();
  }, []);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Skin Types Management
        </h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setSelected(null)
              setIsAddEditDialogOpen(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Skin Type
          </Button>
        </div>
      </div>

      <Card>
        <CardContent>
          <Suspense fallback={<Spinner />}>
            <SkinTypesTable
              data={data}
              onViewProducts={(id) => { }}
              onEdit={(item) => {
                setSelected(item)
                setIsAddEditDialogOpen(true);
              }}
              onDelete={(item) => {
                setSelected(item)
                setAlertVisible(true);
              }}
            />
          </Suspense>

        </CardContent>
      </Card>

      <AddEditSkinTypeDialog
        loading={loading}
        initialData={selected}
        open={isAddEditDialogOpen}
        setOpen={setIsAddEditDialogOpen}
        onCreate={(payload) => handleCreateSkinType(payload)}
        onUpdate={(payload) => handleUpdateSkinType(payload)}
      />

      <AlertDialog
        visible={alertVisible}
        onVisibleChange={setAlertVisible}
        message={"Are you sure you want to delete this skin type?"}
        description="This action cannot be undone"
        onConfirm={() => { handleDeleteSkinType() }}
      />
    </div>
  );
}