import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { ChevronRight, Plus, Search } from "lucide-react";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import batchApi from "@/lib/api/batch.api";

export interface IFetchedBatch {
  _id: string;
  batch_number: string;
  product: {
    _id: string;
    name: string;
    sku: string;
    image: string;
  }
}

interface DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleAddItem: (
    selectedBatch: any,
    quantity: number,
    unitCost: number,
  ) => void;
}

export default function AddEditImportItemDialog({
  open,
  setOpen,
  handleAddItem,
}: DialogProps) {
  const [selectedBatch, setSelectedBatch] = useState<IFetchedBatch | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [unitCost, setUnitCost] = useState(0);
  const [searchBatchNumber, setSearchBatchNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const batchFound = selectedBatch ? true : false;

  const fetchBatch = async () => {
    setLoading(true)
    try {
      const res = await batchApi.fetchBatchByBatchNumber(searchBatchNumber);
      setSelectedBatch(res ?? null);
    } finally {
      setLoading(false)
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!searchBatchNumber.trim()) return;

      fetchBatch();
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
              htmlFor="item-batch"
              className="text-muted-foreground"
            >
              Batch *
            </Label>
            <div className="flex items-center gap-1">
              <Input
                value={searchBatchNumber}
                onChange={(e) => setSearchBatchNumber(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter batch number to search for batch"
                className="h-12"
              />
              <Button className="w-12 h-12" onClick={() => fetchBatch()}>
                <Search />
              </Button>
            </div>
          </div>

          {loading ?
            <Spinner className="size-10 mx-auto" />
            : batchFound ? (
              <div className="flex items-center p-2 gap-4 border rounded-md">
                <ImageWithFallback
                  src={selectedBatch?.product.image}
                  alt={selectedBatch?.product.name}
                  className="w-22 h-22 rounded-md"
                />
                <div className="flex-1 w-0 truncate space-y-1">
                  <div className="truncate font-medium">{selectedBatch?.product.name}</div>
                  <div className="text-muted-foreground">{selectedBatch?.product.sku}</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col items-center py-10 border rounded-md">
                <div className="text-muted-foreground">Batch not found</div>
                {/**
                    <Button
                      variant="ghost"
                      onClick={() => { }}
                      className="text-primary"
                    >
                      Add New Batch
                      <ChevronRight />
                    </Button>
                */}
              </div>
            )
          }

          <div className="grid grid-cols-2 gap-6">
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
            disabled={!selectedBatch || quantity < 1 || unitCost < 0}
            onClick={() => {
              handleAddItem(selectedBatch, quantity, unitCost);
            }}
          >
            Add Item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}