import { IExportDetail } from "@/interfaces/export.inerface";
import { IOrderDetail } from "@/interfaces/order.interface";
import { AlertTriangle, CheckCheck, ClipboardCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { IExportItemUI } from "@/interfaces/exportItem.interface";
import AddEditExportItemsTable from "./AddEditExportItemsTable";
import { Button } from "@/components/ui/button";
import { IBatch } from "@/interfaces/batch.interface";
import dayjs from "dayjs";

export function PackingVerification({
  pickingList,
  order,
  onConfirm,
  onClose,
}: {
  pickingList: IExportDetail;
  order: IOrderDetail;
  onConfirm: (updatedLines: IExportItemUI[]) => void;
  onClose: () => void;
}) {
  const [rows, setRows] = useState<IExportItemUI[]>([]);

  useEffect(() => {
    setRows(pickingList.items.map(item => {
      const { _id, export_id, batch, quantity, ...rest } = item;
      return (
        {
          product_id: item.product._id,
          suggested_batch_id: item.batch._id,
          suggested_batch_number: item.batch.batch_number,
          suggested_quantity: quantity,
          actual_batch_id: item.batch._id,
          actual_batch_number: item.batch.batch_number,
          actual_quantity: quantity,
          ...rest,
        }
      )
    }))
  }, [pickingList]);

  const changeRowBatch = (
    oldBatchId: string,
    newBatch: IBatch
  ) => {
    setRows((prev) =>
      prev.map((r) =>
        r.actual_batch_id === oldBatchId
          ? {
            ...r,
            actual_batch_id: newBatch._id,
            actual_batch_number: newBatch.batch_number,
          }
          : r
      )
    )
  };

  const updateRow = (
    batch_id: string,
    field: "actual_quantity" | "notes",
    value: number | string,
  ) => {
    setRows((prev) =>
      prev.map((r) =>
        r.actual_batch_id === batch_id ? { ...r, [field]: value } : r
      )
    );
  };

  const removeRow = (batch_id: string) => {
    setRows(rows.filter(item => item.actual_batch_id !== batch_id));
  };

  const handleConfirm = () => {
    onConfirm(rows);
  };


  if (rows) return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between shrink-0 bg-[#576d64]">
          <div className="flex items-center gap-3">
            <ClipboardCheck className="w-5 h-5 text-white" />
            <div>
              <p className="text-white/70 text-xs uppercase tracking-wider">Packing Verification</p>
              <h3 className="font-mono tracking-wider font-semibold text-primary-foreground text-lg">
                {pickingList.export_code}
              </h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-header */}
        <div className="px-6 py-3 bg-primary/8 border-b border-border grid grid-cols-3 gap-4 shrink-0">
          {[
            { label: "Order", value: order.order_code },
            { label: "Customer", value: order.customer.full_name },
            { label: "Slip generated", value: dayjs(pickingList.createdAt).format("DD/MM/YYYY, hh:mm") },
          ].map((m) => (
            <div key={m.label}>
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-sm font-medium text-foreground mt-0.5 font-mono">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="px-6 pt-4 pb-1 shrink-0">
          <p className="text-xs text-muted-foreground">
            Verify the batches you actually picked. If any batch differs from the suggestion, update the{" "}
            <strong className="text-foreground">Actual Batch</strong> column before confirming.
          </p>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto px-6 py-3">
          <div className="rounded-lg border border-border overflow-hidden">
            <AddEditExportItemsTable
              data={rows}
              handleChangeBatch={(id, value) => { changeRowBatch(id, value) }}
              handleUpdateQuantity={(id, value) => { updateRow(id, "actual_quantity", value) }}
              handleUpdateNotes={(id, value) => { updateRow(id, "notes", value) }}
              handleRemoveItem={(id) => { removeRow(id) }}
            />
          </div>

          {rows.some((r) => r.actual_batch_id !== r.suggested_batch_id || r.actual_quantity !== r.suggested_quantity) && (
            <div className="mt-3 flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              Some batches have been changed from the original suggestion. Please double-check before confirming.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between gap-2 shrink-0">
          <p className="text-xs text-muted-foreground">
            Confirming will mark this order as <strong>Packed</strong> and lock the inventory export slip.
          </p>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm border border-border text-muted-foreground hover:bg-muted transition-colors">
              Back
            </button>
            <Button
              onClick={handleConfirm}
            >
              <CheckCheck className="w-4 h-4" />
              Confirm & Mark Packed
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}