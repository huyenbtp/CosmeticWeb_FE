"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Filter, Plus } from "lucide-react";
import SearchBar from "@/components/layout/SearchBar";
import BrandsFilter from "./BrandsFilter";
import BrandsTable from "./BrandsTable";
import { Pagination } from "@/components/layout/Pagination";
import { IAddEditBrand, IBrand } from "@/interfaces/brand.interface";
import brandApi, { BrandStatus } from "@/lib/api/brand.api";
import AddEditBrandDialog from "./AddEditBrandDialog";
import { ImageState } from "@/components/layout/ImageUploader";

const mockBrands: IBrand[] = [
  {
    _id: "64f1a2b3c9e123001",
    name: "Centella",
    logo: "https://picsum.photos/seed/technova/300/200",
    status: "active",
    total_products: 150,
  },
  {
    _id: "64f1a2b3c9e123002",
    name: "Simple",
    logo: "https://picsum.photos/seed/urbanstyle/300/200",
    status: "active",
    total_products: 342,
  },
  {
    _id: "64f1a2b3c9e123003",
    name: "Clair",
    logo: "https://picsum.photos/seed/greenleaf/300/200",
    status: "archived",
    total_products: 24,
  },
  {
    _id: "64f1a2b3c9e123004",
    name: "Cocoon",
    logo: "https://picsum.photos/seed/blueocean/300/200",
    status: "active",
    total_products: 89,
  },
  {
    _id: "64f1a2b3c9e123005",
    name: "Gucci",
    logo: "https://picsum.photos/seed/reddragon/300/200",
    status: "archived",
    total_products: 0,
  },
  {
    _id: "64f1a2b3c9e123006",
    name: "Hada Labo",
    logo: "https://picsum.photos/seed/minimalist/300/200",
    status: "active",
    total_products: 210,
  },
  {
    _id: "64f1a2b3c9e123007",
    name: "Innisfree",
    logo: "https://picsum.photos/seed/retro/300/200",
    status: "active",
    total_products: 56,
  },
  {
    _id: "64f1a2b3c9e123008",
    name: "Color Key",
    logo: "https://picsum.photos/seed/foodie/300/200",
    status: "archived",
    total_products: 12,
  },
  {
    _id: "64f1a2b3c9e123009",
    name: "JulyDoll",
    logo: "https://picsum.photos/seed/cosmic/300/200",
    status: "active",
    total_products: 430,
  },
  {
    _id: "64f1a2b3c9e123010",
    name: "3CE",
    logo: "https://picsum.photos/seed/sporty/300/200",
    status: "active",
    total_products: 115,
  },
];

export default function BrandsManagement() {
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
  //const minTotal = Number(searchParams.get("minTotal") || 0) || 0;
  //const maxTotal = Number(searchParams.get("maxTotal") || 0) || 0;

  const [selected, setSelected] = useState<IBrand | null>(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);

  const fetchBrands = async () => {
    setLoading(true);

    try {
      const res = await brandApi.fetchBrandsPagination({
        page,
        limit,
        q: searchQuery || undefined,
        status: status as BrandStatus || undefined
      });
      setData(res.data);
      setTotal(res.pagination?.total ?? 0);
    } catch (error) {
      console.error("Fetch brands failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [page, limit, searchQuery, status]);

  const handleCreateBrand = async (createData: IAddEditBrand, file: File | null) => {
    setLoading(true)

    const { _id, logo, ...payload } = createData;
    try {
      const res = await brandApi.createBrand({
        ...payload,
        logo: file
      });

      setSelected(null);
      setIsAddEditDialogOpen(false);
      fetchBrands();
    } catch (error) {
      console.error("Create brand failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBrand = async (updateData: IAddEditBrand, file: File | null, imageState: ImageState) => {
    const { _id, ...rest } = updateData;
    if (!_id) return;

    setLoading(true)

    try {
      const payload: any = { ...rest };

      if (imageState === "new") {
        payload.logo = file
      }

      if (imageState === "remove") {
        payload.logo = null
      }

      const res = await brandApi.updateBrand(_id, payload);

      setSelected(null);
      setIsAddEditDialogOpen(false);
      fetchBrands();
    } catch (error) {
      console.error("Update brand failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Brands Management
        </h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              setSelected(null)
              setIsAddEditDialogOpen(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Brand
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchBar placeholder="Search brands..." willUpdateQuery className="w-84" />

            <BrandsFilter maxTotal={0} />
          </div>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<Spinner />}>
            <BrandsTable
              loading={loading}
              data={data}
              onView={(id) => { router.push(`products?page=1&brand=${id}`) }}
              onEdit={(item) => {
                setSelected(item)
                setIsAddEditDialogOpen(true);
              }}
            />
          </Suspense>

          <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="brand" />

        </CardContent>
      </Card>

      <AddEditBrandDialog
        loading={loading}
        initialData={selected}
        open={isAddEditDialogOpen}
        setOpen={setIsAddEditDialogOpen}
        onCreate={(data, file) => handleCreateBrand(data, file)}
        onUpdate={(data, file, state) => handleUpdateBrand(data, file, state)}
      />
    </div>
  );
}