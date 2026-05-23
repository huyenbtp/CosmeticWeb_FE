"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Filter, Plus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import TagsTable from "@/features/tags/management/TagsTable";
import { Pagination } from "@/components/layout/Pagination";
import { IAddEditTag, ITag } from "@/interfaces/tag.interface";
import tagApi, { TagStatus } from "@/lib/api/tag.api";
import TagsFilter from "./TagsFilter";
import AddEditTagDialog from "../shared/AddEditTagDialog";
import { toast } from "sonner";
import AlertDialog from "@/components/layout/AlertDialog";

const mockTags: ITag[] = [
  {
    _id: "64f1a2b3c9e123001",
    name: "hydrating",
    status: "active",
    total_products: 150,
  },
  {
    _id: "64f1a2b3c9e123002",
    name: "acne-care",
    status: "active",
    total_products: 342,
  },
  {
    _id: "64f1a2b3c9e123003",
    name: "for-beginners",
    status: "archived",
    total_products: 24,
  },
  {
    _id: "64f1a2b3c9e123004",
    name: "fragrance-free,",
    status: "active",
    total_products: 89,
  },
  {
    _id: "64f1a2b3c9e123005",
    name: "pregnancy",
    status: "archived",
    total_products: 0,
  },
];

export default function TagsManagementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const [limit, setLimit] = useState(7);
  const rawPage = Number(searchParams.get("page"));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const searchQuery = searchParams.get("q") || "";
  const status = searchParams.get("status") || "";

  const [selected, setSelected] = useState<ITag | null>(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const fetchTags = async () => {
    setLoading(true);

    try {
      const res = await tagApi.fetchTagsPagination({
        page,
        limit,
        q: searchQuery || undefined,
        status: status as TagStatus || undefined
      });
      setData(res.data);
      setTotal(res.pagination?.total ?? 0);
    } catch (error) {
      console.error("Fetch tags failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTag = async (createData: IAddEditTag) => {
    setLoading(true)

    const { _id, ...payload } = createData;
    try {
      const res = await tagApi.createTag(payload);

      toast.success("Create tag successfully");
      setSelected(null);
      setIsAddEditDialogOpen(false);
      fetchTags();
    } catch (error) {
      toast.error("Create tag failed:" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTag = async (updateData: IAddEditTag) => {
    const { _id, ...payload } = updateData;
    if (!_id) return;

    setLoading(true)

    try {
      const res = await tagApi.updateTag(_id, payload);

      toast.success("Update successfully");
      setSelected(null);
      setIsAddEditDialogOpen(false);
      fetchTags();
    } catch (error) {
      toast.error("Update failed:" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: TagStatus) => {
    if (!id || !status) return;

    setLoading(true)

    try {
      const res = await tagApi.updateStatus(id, status);
      
      toast.success("Update status successfully");
      fetchTags();
    } catch (error) {
      toast.error("Update status failed:" + error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTag = async () => {
    if (!selected) return;
    setLoading(true)

    try {
      const res = await tagApi.deleteTag(selected._id);

      toast.success("Delete successfully");
      setSelected(null);
      setAlertVisible(false);
      fetchTags();
    } catch (error) {
      toast.error("Delete tag failed:" + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, [page, limit, searchQuery, status]);

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Tags Management
        </h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setSelected(null)
              setIsAddEditDialogOpen(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Tag
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar placeholder="Search tags..." willUpdateQuery className="w-96" />

            <TagsFilter />
          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <TagsTable
              data={data}
              onViewProducts={(id) => { }}
              onEdit={(item) => {
                setSelected(item)
                setIsAddEditDialogOpen(true);
              }}
              onChangeStatus={handleUpdateStatus}
              onDelete={(item) => {
                setSelected(item)
                setAlertVisible(true);
              }}
            />
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="tag" />

        </CardContent>
      </Card>

      <AddEditTagDialog
        loading={loading}
        initialData={selected}
        open={isAddEditDialogOpen}
        setOpen={setIsAddEditDialogOpen}
        onCreate={(payload) => handleCreateTag(payload)}
        onUpdate={(payload) => handleUpdateTag(payload)}
      />

      <AlertDialog
        visible={alertVisible}
        onVisibleChange={setAlertVisible}
        message={"Are you sure you want to delete this tag?"}
        description="This action cannot be undone"
        onConfirm={() => { handleDeleteTag() }}
      />
    </div>
  );
}