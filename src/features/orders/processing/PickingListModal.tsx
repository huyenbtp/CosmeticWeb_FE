import { Button } from "@/components/ui/button";
import { ClipboardList, Printer, X } from "lucide-react";
import { getProductExportStatusBadge } from "@/features/inventory/inventoryExports/management/ExportsFilter";
import { IExportDetail } from "@/interfaces/export.inerface";
import { IOrderDetail } from "@/interfaces/order.interface";
import dayjs from "dayjs";
import ExportItemsTable from "./ExportItemsTable";

export function PickingListModal({
  pickingList,
  order,
  onClose,
}: {
  pickingList: IExportDetail;
  order: IOrderDetail;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
              <ClipboardList className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-mono tracking-wider font-semibold text-foreground text-lg">
                  {pickingList.export_code}
                </p>
                {getProductExportStatusBadge(pickingList.status)}
              </div>
              <p className="text-xs text-muted-foreground">
                Product Export · Generated {dayjs(pickingList.createdAt).format("DD/MM/YYYY, hh:mm:ss")}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Meta */}
        <div className="px-6 py-3 bg-muted/30 border-b border-border grid grid-cols-3 gap-4 shrink-0 text-sm">
          {[
            { label: "Order", value: order.order_code },
            { label: "Customer", value: order.customer.full_name },
            { label: "Total Items", value: order.total_items },
          ].map((m) => (
            <div key={m.label}>
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="font-medium text-foreground mt-0.5">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            Suggested Batch Allocations (FEFO)
          </p>

          {/* Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <ExportItemsTable
              data={pickingList.items || []}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between shrink-0">
          <p className="text-xs text-muted-foreground">Print this list and bring it to the warehouse.</p>
          <div className="flex gap-2">
            <Button
              variant={"outline"}
              onClick={() => { }}
            >
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
