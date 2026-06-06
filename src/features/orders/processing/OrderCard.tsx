import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { Button } from "@/components/ui/button";
import { IOrderDetail } from "@/interfaces/order.interface";
import { OrderStatus } from "@/lib/api/order.api";
import { TRANSITIONS } from "./OrderProcessingPage";
import { getOrderStatusBadge } from "../management/OrdersFilter";
import dayjs from "dayjs";
import { Eye, FileText } from "lucide-react";

export const primaryLabel: Partial<Record<OrderStatus, string>> = {
  confirmed: "Confirm",
  packed: "Mark Packed",
  shipping: "Hand to Courier",
  delivered: "Mark Delivered",
  cancelled: "Cancel"
};

export default function OrderCard({
  data,
  onAction,
  onViewDetail,
  onShowPickingList,
  onMarkPacked,
}: {
  data: IOrderDetail;
  onAction: (status: OrderStatus) => void;
  onViewDetail: (order: IOrderDetail) => void;
  onShowPickingList: (order: IOrderDetail) => void;
  onMarkPacked: (order: IOrderDetail) => void;
}) {
  const transitions = TRANSITIONS[data.order_status as OrderStatus];
  const primaryNext = transitions.find((t) => t !== "cancelled" && t !== "returned");
  const canCancel = transitions.includes("cancelled");


  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <div className="px-5 py-4 flex items-start justify-between border-b border-border">
        <div>
          <p className="font-mono text-xs text-muted-foreground tracking-wider">
            {data.order_code}
          </p>
          <p className="font-semibold text-foreground text-base mt-0.5">
            {data.customer.full_name}
          </p>
        </div>
        {getOrderStatusBadge(data.order_status)}
      </div>

      <div className="px-5 py-3 flex items-center gap-3">
        <div className="flex -space-x-2">
          {data.items.slice(0, 2).map((item) => (
            <ImageWithFallback
              key={item._id}
              src={item.product.image}
              className="w-9 h-9 rounded-full object-cover border-2 border-card bg-muted"
            />
          ))}
          {data.items.length > 2 && (
            <div className="w-9 h-9 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium text-muted-foreground">
              +{data.items.length - 2}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground truncate">
            {data.items.map((i) => i.product.name).join(", ")}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {data.total_items} item
            {data.total_items !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="px-5 py-3 flex items-center justify-between bg-muted/30 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground">
            {dayjs(data.createdAt).format("DD/MM/YYYY, hh:mm")}
          </p>
          <p className="text-sm font-bold text-foreground mt-0.5">
            {(data.total_estimated).toLocaleString()} ₫
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={() => onViewDetail(data)}
          >
            <Eye className="w-4 h-4" />
          </Button>

          {canCancel && (
            <Button
              size={"sm"}
              onClick={() => onAction("cancelled")}
              className="text-xs text-error border border-error/20 bg-clear hover:bg-error1/50"
            >
              Cancel
            </Button>
          )}

          {data.order_status === "confirmed" && (
            <>
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => onShowPickingList(data)}
                className="text-xs text-muted-foreground border-border bg-clear"
                title="View picking list"
              >
                <FileText className="w-3.5 h-3.5" /> Pick List
              </Button>
              <Button
                size={"sm"}
                onClick={() => onMarkPacked(data)}
                className="text-xs"
              >
                Mark Packed
              </Button>
            </>
          )}

          {data.order_status === "pending" && (
            <Button
              size={"sm"}
              onClick={() => onAction("confirmed")}
              className="text-xs"
            >
              Confirm Order
            </Button>
          )}

          {data.order_status === "packed" && (
            <Button
              size={"sm"}
              onClick={() => onAction("shipping")}
              className="text-xs"
            >
              Hand to Courier
            </Button>
          )}

          {data.order_status === "shipping" && (
            <Button
              size={"sm"}
              onClick={() => onAction("delivered")}
              className="text-xs"
            >
              Mark Delivered
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}