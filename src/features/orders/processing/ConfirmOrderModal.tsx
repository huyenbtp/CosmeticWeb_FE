import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { ICheckStockBatch } from "@/interfaces/batch.interface";
import { IOrderDetail } from "@/interfaces/order.interface";
import { IOrderItem } from "@/interfaces/orderItem.interface";
import dayjs from "dayjs";
import { AlertTriangle, ArrowRight, Boxes, CheckCheck, CheckCircle2, X } from "lucide-react";
import { useState } from "react";

const mockCheckBatch: ICheckStockBatch[] = [
  {
    product_id: "prod_001",
    batches: [
      {
        _id: "1",
        batch_number: "2026000001",
        exp_date: "2026-11-14T00:00:00",
        remaining_qty: 10,
      },
    ]
  },
  {
    product_id: "prod_002",
    batches: [
      {
        _id: "2",
        batch_number: "2026000002",
        exp_date: "2026-11-14T00:00:00",
        remaining_qty: 10,
      },
    ]
  },
  {
    product_id: "prod_009",
    batches: [
      {
        _id: "3",
        batch_number: "2026000003",
        exp_date: "2026-11-14T00:00:00",
        remaining_qty: 1,
      },
      {
        _id: "4",
        batch_number: "2026000004",
        exp_date: "2027-6-14T00:00:00",
        remaining_qty: 30,
      },
    ]
  },
];

export default function ConfirmOrderModal({
  order,
  onClose,
  onConfirm,
}: {
  order: IOrderDetail;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const [data, setData] = useState<ICheckStockBatch[]>(mockCheckBatch);

  const getProductInventory = (productId: string): ICheckStockBatch => {
    return (
      data.find((i) => i.product_id === productId) ?? {
        product_id: productId,
        batches: [],
      }
    );
  };

  const getProductTotalStock = (productId: string): number => {
    return getProductInventory(productId).batches.reduce((s, b) => s + b.remaining_qty, 0);
  }

  const allOk = order.items.every(
    (item) => getProductTotalStock(item.product._id) >= item.quantity
  );

  const StockCheckRow = ({ item }: { item: IOrderItem }) => {
    const total = getProductTotalStock(item.product._id);
    const enough = total >= item.quantity;
    const batches = getProductInventory(item.product._id).batches;

    return (
      <div
        className={`rounded-lg border p-3 ${enough ? "border-border bg-card" : "border-red-200 bg-red-50"}`}
      >
        <div className="flex items-center gap-3">
          <ImageWithFallback
            src={item.product.image}
            alt={item.product.name}
            className="w-11 h-11 rounded-lg object-cover bg-muted shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {item.product.name}
            </p>
            <p className="text-xs text-muted-foreground">
              SKU: {item.product.sku}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">Required / In stock</p>
            <p
              className={`text-sm font-bold mt-0.5 ${enough ? "text-primary" : "text-error"
                }`}
            >
              {item.quantity} / {total}
            </p>
          </div>
          {enough ? (
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-error shrink-0" />
          )}
        </div>
        <div className="mt-2.5 pl-14 space-y-1">
          {batches.map((batch) => (
            <div key={batch._id} className="flex items-center gap-2 text-xs">
              <span className="font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                {batch.batch_number}
              </span>
              <span className="text-muted-foreground">
                Exp: {dayjs(batch.exp_date).format("DD/MM/YYYY")}
              </span>
              <span
                className={`ml-auto font-semibold ${batch.remaining_qty === 0
                  ? "text-error"
                  : batch.remaining_qty < 3
                    ? "text-warning1-foreground/80"
                    : "text-primary"
                  }`}
              >
                {batch.remaining_qty} units
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative flex flex-col bg-card rounded-xl shadow-2xl w-full max-w-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <Boxes className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Inventory Check</p>
              <h3 className="font-mono font-semibold text-foreground tracking-wider">
                {order.order_code}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto space-y-3">
          <p className="text-sm text-muted-foreground">
            Review stock availability for all items before confirming this
            order. Each batch is listed with its expiry date and remaining
            units.
          </p>
          {order.items.map((item) => (
            <StockCheckRow key={item._id} item={item} />
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between gap-3">
          {!allOk && (
            <p className="text-xs text-error flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              Insufficient stock for one or more items.
            </p>
          )}
          {allOk && (
            <p className="text-xs text-primary flex items-center gap-1.5">
              <CheckCheck className="w-3.5 h-3.5 shrink-0" />
              All items are sufficiently stocked.
            </p>
          )}
          <div className="flex gap-2 ml-auto">
            <Button
              variant={"outline"}
              onClick={onClose}
              className="border-border text-muted-foreground hover:bg-muted"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={!allOk}
            >
              Confirm Order
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}