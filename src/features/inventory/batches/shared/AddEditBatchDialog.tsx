import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import productApi from "@/lib/api/product.api";
import dayjs from "dayjs";
import { Search } from "lucide-react";
import { IAddEditBatch, IBatch } from "@/interfaces/batch.interface";

export interface IFetchedProduct {
  _id: string;
  name: string;
  sku: string;
  image: string;
}

const mockProducts: IFetchedProduct[] = [
  {
    _id: "1",
    name: "Kem chống nắng Anessa Perfect UV",
    sku: "SUN-ANE-251204215107",
    image: "https://picsum.photos/200/300?random=1",
  },
  {
    _id: "2",
    name: "Sữa rửa mặt Innisfree Green Tea",
    sku: "CLS-INN-251204215107",
    image: "https://picsum.photos/200/300?random=2",
  },
  {
    _id: "3",
    name: "Phấn phủ Fit Me Matte + PorelesPhấn phủ Fit Me Matte + PorelesPhấn phủ Fit Me Matte + Poreles",
    sku: "MAK-FIT-251204215107",
    image: "https://picsum.photos/200/300?random=3",
  },
];

const NullBatch = {
  product_id: "",
  batch_code: "",
  mfg_date: "",
  exp_date: "",
}

interface DialogProps {
  initialData?: IBatch | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  onCreate: (payload: IAddEditBatch) => void;
  onUpdate: (payload: IAddEditBatch) => void;
}

export default function AddEditBatchDialog({
  initialData,
  open,
  setOpen,
  onCreate,
  onUpdate,
}: DialogProps) {
  const [formData, setFormData] = useState<IAddEditBatch>(NullBatch);
  const [selectedProduct, setSelectedProduct] = useState<IFetchedProduct | null>(null);
  const [searchSku, setSearchSku] = useState("");
  const [loading, setLoading] = useState(false);
  const productFound = selectedProduct ? true : false;

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const res = await productApi.fetchProductBySKU(searchSku);
      setSelectedProduct(res ?? null);
      setFormData(prev => ({ ...prev, product_id: res._id }))
    } finally {
      setLoading(false)
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!searchSku.trim()) return;

      fetchProduct();
    }
  };

  useEffect(() => {
    if (initialData) {
      setSelectedProduct(initialData.product)
      setFormData({
        ...initialData,
        product_id: initialData.product._id
      })
    } else {
      setSelectedProduct(null)
      setFormData(NullBatch)
    }
  }, [initialData])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit" : "Add New"} Batch
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-1">
            <Label
              htmlFor="item-product"
              className="text-muted-foreground"
            >
              Product *
            </Label>
            <div className="flex items-center gap-1">
              <Input
                value={searchSku}
                onChange={(e) => setSearchSku(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter SKU code to search for product"
                className="h-12"
              />
              <Button className="w-12 h-12" onClick={() => fetchProduct()}>
                <Search />
              </Button>
            </div>
          </div>

          {loading ?
            <Spinner className="size-10 mx-auto" />
            : productFound ? (
              <div className="flex items-center p-2 gap-4 border rounded-md">
                <ImageWithFallback
                  src={selectedProduct?.image}
                  alt={selectedProduct?.name}
                  className="w-22 h-22 rounded-md"
                />
                <div className="flex-1 w-0 truncate space-y-1">
                  <div className="truncate font-medium">{selectedProduct?.name}</div>
                  <div className="text-muted-foreground">{selectedProduct?.sku}</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center py-10 border rounded-md">
                <div className="text-muted-foreground">Product not found</div>
                {/**
                    <Button
                      variant="ghost"
                      onClick={() => { }}
                      className="text-primary"
                    >
                      Add New Product
                      <ChevronRight />
                    </Button>
                */}
              </div>
            )
          }

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1 col-span-2">
              <Label
                htmlFor="batch"
                className="text-muted-foreground"
              >
                Batch Code
              </Label>
              <Input
                id="batch"
                value={formData.batch_code}
                onChange={(e) => setFormData(prev => ({ ...prev, batch_code: e.target.value }))}
                className="h-12"
                placeholder="Enter batch code"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="mfg"
                className="text-muted-foreground"
              >
                Manufacturing Date
              </Label>
              <Input
                id="mfg"
                type="date"
                value={dayjs(formData.mfg_date).format("YYYY-MM-DD")}
                onChange={(e) => setFormData(prev => ({ ...prev, mfg_date: e.target.value }))}
                className="h-12"
              />
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="exp"
                className="text-muted-foreground"
              >
                Expiration Date
              </Label>
              <Input
                id="exp"
                type="date"
                value={dayjs(formData.exp_date).format("YYYY-MM-DD")}
                onChange={(e) => setFormData(prev => ({ ...prev, exp_date: e.target.value }))}
                className="h-12"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex-row">
          <DialogClose asChild>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            size="lg"
            className="flex-1"
            disabled={!selectedProduct || !formData.product_id || !formData.batch_code}
            onClick={() => {
              initialData ?
                onUpdate(formData)
                : onCreate(formData)
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}