import { IOrderDetail } from "@/interfaces/order.interface";
import { OrderStatus } from "@/lib/api/order.api";
import { TRANSITIONS } from "./OrderProcessingPage";
import { Calendar, FileText, MapPin, Phone, User, X } from "lucide-react";
import { getOrderStatusBadge, getPaymentMethodName } from "../management/OrdersFilter";
import dayjs from "dayjs";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { Button } from "@/components/ui/button";

export default function OrderDetailModal({
  data,
  onClose,
  onAction,
  onShowPickingList,
  onMarkPacked,
}: {
  data: IOrderDetail;
  onClose: () => void;
  onAction: (status: OrderStatus) => void;
  onShowPickingList: (order: IOrderDetail) => void;
  onMarkPacked: (order: IOrderDetail) => void;
}) {
  const transitions = TRANSITIONS[data.order_status as OrderStatus];
  const shippingAddress = data.address_line + ", " + data.ward + ", " + data.district + ", " + data.city;

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative flex flex-col bg-card rounded-xl shadow-2xl w-full max-w-2xl h-[90vh] overflow-y-hidden">
        {/** header */}
        <div className="border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">
              Order Details
            </p>
            <h2 className="text-xl font-mono font-semibold text-foreground tracking-wider">
              {data.order_code}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between">
            {getOrderStatusBadge(data.order_status)}
            <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {dayjs(data.createdAt).format("DD/MM/YYYY, hh:mm")}
            </span>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Shipping Information
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm font-medium text-foreground">
                  {data.receiver_name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm text-foreground">{data.phone}</span>
              </div>
              <div className="flex items-start gap-2 col-span-2">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-sm text-foreground">{shippingAddress}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Items ({data.items.length})
            </p>
            <div className="space-y-3">
              {data.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card"
                >
                  <ImageWithFallback
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 rounded-lg object-cover bg-muted shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      SKU: {item.product.sku}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Qty: {item.quantity} × {(item.unit_price).toLocaleString()} ₫
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-foreground shrink-0">
                    {(item.quantity * item.unit_price).toLocaleString()} ₫
                  </p>
                </div>
              ))}
            </div>
          </div>

          {data.notes && (
            <div className="bg-warning1/30 border border-warning/40 rounded-lg p-3">
              <p className="text-xs font-semibold text-warning1-foreground/80 mb-1">
                Customer Note
              </p>
              <p className="text-sm text-warning1-foreground/90">{data.notes}</p>
            </div>
          )}

          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Method</span>
              <span className=" text-foreground">
                {getPaymentMethodName(data.payment_method)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">
                {(data.subtotal).toLocaleString()} ₫
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping Fee</span>
              <span className="font-medium">
                {(data.shipping_fee).toLocaleString()} ₫
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-foreground">Order Total</span>
              <span className="font-bold text-primary text-lg">
                {(data.total_estimated).toLocaleString()} ₫
              </span>
            </div>
          </div>
        </div>

        {transitions.length > 0 && (
          <div className="flex gap-3 border-t border-border px-6 pt-4 pb-2 ">

            {/* Confirmed-specific actions */}
            {data.order_status === "confirmed" && (
              <>
                <Button
                  onClick={() => {
                    onAction("cancelled");
                  }}
                  className="flex-1 font-semibold text-error border border-error/20 bg-clear hover:bg-error1/50"
                >
                  Cancel Order
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => onShowPickingList(data)}
                  className="flex-1 font-semibold text-muted-foreground border-border bg-clear"
                  title="View picking list"
                >
                  <FileText className="w-3.5 h-3.5" /> View Picking List
                </Button>
                <Button
                  onClick={() => onMarkPacked(data)}
                  className="flex-1 font-semibold"
                >
                  Mark as Packed
                </Button>
              </>
            )}

            {/* Other transitions */}
            {data.order_status !== "confirmed" &&
              transitions.map((next) => (
                <Button
                  key={next}
                  onClick={() => {
                    onAction(next);
                  }}
                  className={`flex-1 font-semibold ${next === "cancelled"
                    ? "text-error border border-error/20 bg-clear hover:bg-error1/50"
                    : ""
                    }`}
                >
                  {next === "confirmed" && "Confirm Order"}
                  {next === "cancelled" && "Cancel Order"}
                  {next === "shipping" && "Hand to Courier"}
                  {next === "delivered" && "Mark Delivered"}
                </Button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
