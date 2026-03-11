import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ChevronRight, Plus } from "lucide-react";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import productApi from "@/lib/api/product.api";

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

export default function AddEditImportItemDialog({
  open,
  setOpen,
  handleAddItem,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAddItem: (selectedProduct: any, quantity: number, unitCost: number) => void;
}) {
  const [selectedProduct, setSelectedProduct] = useState<IFetchedProduct | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [unitCost, setUnitCost] = useState(0);
  const [searchSku, setSearchSku] = useState("");
  const [loading, setLoading] = useState(false);
  const productFound = selectedProduct ? true : false;

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const res = await productApi.fetchProductBySKU(searchSku);
      setSelectedProduct(res ?? null);
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Import Item
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
            <Input
              value={searchSku}
              onChange={(e) => setSearchSku(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter SKU code to search for product"
              className="h-12"
            />
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label
                htmlFor="item-quantity"
                className="text-muted-foreground"
              >
                Quantity *
              </Label>
              <Input
                id="item-quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                className="h-12"
              />
            </div>
            <div className="space-y-1">
              <Label
                htmlFor="unit-cost"
                className="text-muted-foreground"
              >
                Unit Cost (đ) *
              </Label>
              <Input
                id="unit-cost"
                type="number"
                value={unitCost}
                onChange={(e) => setUnitCost(Number(e.target.value))}
                min="0"
                className="h-12"
              />
            </div>
          </div>

          {quantity > 0 && unitCost >= 0 && (
            <div className="p-3 bg-muted/60 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Cost:</span>
                <span className="font-bold text-green-600 dark:text-success1-foreground">
                  {(quantity * unitCost).toLocaleString()} đ
                </span>
              </div>
            </div>
          )}
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
            disabled={!selectedProduct || quantity < 1 || unitCost < 0}
            onClick={() => {
              handleAddItem(selectedProduct, quantity, unitCost);
            }}
          >
            Add Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}