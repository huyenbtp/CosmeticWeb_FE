"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Plus } from "lucide-react"
import { IAddEditCategory, ICategory } from "@/interfaces/category.interface"
import { useRouter } from "next/navigation"
import CategoriesTree from "./CategoriesTree"
import AddEditCategoryDialog from "./AddEditCategoryDialog"
import CategoryDetailCard from "./CategoryDetailCard"
import categoryApi from "@/lib/api/category.api"

const mockCategories: ICategory[] = [
  {
    _id: "1",
    parent_id: null,
    name: "Skincare",
    slug: "skincare",
  },
  {
    _id: "2",
    parent_id: "1",
    name: "Cleanser",
    slug: "cleanser",
  },
  {
    _id: "3",
    parent_id: "1",
    name: "Toner",
    slug: "toner",
  },
  {
    _id: "4",
    parent_id: "2",
    name: "Makeup Remover",
    slug: "makeup-remover",
  },
  {
    _id: "6",
    parent_id: "2",
    name: "Exfoliators/Scrub",
    slug: "exfoliators-scrub",
  },
  {
    _id: "7",
    parent_id: "1",
    name: "Suncare",
    slug: "suncare",
  },
  {
    _id: "8",
    parent_id: null,
    name: "Makeup",
    slug: "makeup",
  },
  {
    _id: "9",
    parent_id: "8",
    name: "Face",
    slug: "face",
  },
  {
    _id: "10",
    parent_id: "9",
    name: "Cushion",
    slug: "cushion",
  },
  {
    _id: "11",
    parent_id: "9",
    name: "Blush",
    slug: "blush",
  },
  {
    _id: "12",
    parent_id: "8",
    name: "Eyes",
    slug: "eyes",
  },
  {
    _id: "13",
    parent_id: "8",
    name: "Lips",
    slug: "lips",
  },
  {
    _id: "14",
    parent_id: null,
    name: "Personal Care",
    slug: "personal-care",
  },
  {
    _id: "15",
    parent_id: "14",
    name: "Body Care",
    slug: "body-care",
  },
  {
    _id: "16",
    parent_id: "14",
    name: "Hands Care",
    slug: "hands-care",
  },
  {
    _id: "17",
    parent_id: "14",
    name: "Oral",
    slug: "oral",
  },
  {
    _id: "18",
    parent_id: "14",
    name: "Fragnance",
    slug: "fragnance",
  },
];

export default function CategoriesPage() {
  const router = useRouter();
  const [data, setData] = useState<ICategory[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ICategory | null>(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);

    try {
      const res = await categoryApi.fetchAllCategories();
      setData(res);
    } catch (error) {
      console.error("Fetch categories failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (createData: IAddEditCategory) => {
    setLoading(true)

    const { _id, ...payload } = createData;
    try {
      const res = await categoryApi.createCategory(payload);

      fetchCategories();
      setSelected(res);
    } catch (error) {
      console.error("Create category failed:", error);
    } finally {
      setLoading(false);
      setIsAddEditDialogOpen(false);
    }
  };

  const handleUpdateCategory = async (updateData: IAddEditCategory) => {
    const { _id, ...payload } = updateData;
    if (!_id) return;

    setLoading(true)

    try {
      const res = await categoryApi.updateCategory(_id, payload);

      fetchCategories();
      setSelected(res);
    } catch (error) {
      console.error("Create category failed:", error);
    } finally {
      setLoading(false);
      setIsAddEditDialogOpen(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <div className="h-full flex flex-col px-8 py-6 space-y-6">
      <div className="flex h-9 items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Categories Management
        </h1>
      </div>

      <Card className="flex-1 overflow-hidden">
        <CardContent className="flex flex-1 overflow-hidden">
          {/* left: categories tree */}
          <div className="flex flex-col flex-2 pr-8">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="m-1 h-10"
            />
            <div className="flex-1 overflow-y-auto my-4">
              {loading ? (
                <div className="h-full flex justify-center items-center">
                  <Spinner className="size-10" />
                </div>
              ) : (
                <CategoriesTree
                  data={data}
                  search={search}
                  selected={selected}
                  setSelected={(value) => {
                    setSelected(value);
                  }}
                />
              )}
            </div>
            <Button
              onClick={() => {
                setSelectedParentId(null);
                setIsAddEditDialogOpen(true);
              }}
            >
              <Plus />
              Add New Category
            </Button>
          </div>

          {/* right: detail panel */}
          <div className="flex-3 p-6 px-8 pl-14 border-l">
            {!selected ? (
              <p className="text-muted-foreground">
                Select a category to view details and edit.
              </p>
            ) : (
              <CategoryDetailCard
                data={selected}
                categoryList={data}
                onSaveChanges={(payload) => { handleUpdateCategory(payload) }}
                onAddChild={() => {
                  setSelectedParentId(selected._id);
                  setIsAddEditDialogOpen(true);
                }}
                onViewProducts={() => { router.push(`products?page=1&category=${selected.slug}`) }}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <AddEditCategoryDialog
        parentId={selectedParentId}
        categoryList={data}
        open={isAddEditDialogOpen}
        setOpen={setIsAddEditDialogOpen}
        onCreate={(payload) => handleCreateCategory(payload)}
        onUpdate={(payload) => handleUpdateCategory(payload)}
      />
    </div>
  );
}