import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IOrderStatus } from "@/interfaces/orderStatus.interface";
import { OrderStatus } from "@/lib/api/order.api";
import dayjs from "dayjs";
import { CircleCheck, Clock, Package, PackageOpen, Plus, RefreshCcwIcon, Truck, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export const getOrderStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "The order has been placed"
    case "confirmed":
      return "The order has been confirmed"
    case "packed":
      return "The order has been packed"
    case "shipping":
      return "The order is being shipped"
    case "delivered":
      return "The order has been delivered"
    case "cancelled":
      return "The order has been cancelled"
    case "returned":
      return "The order has been returned"
  }
}

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock />;
    case "confirmed":
      return <CircleCheck />;
    case "packed":
      return <Package />;
    case "shipping":
      return <Truck />;
    case "delivered":
      return <PackageOpen />;
    case "cancelled":
      return <XCircle />;
    case "returned":
      return <RefreshCcwIcon />;
  }
};

export default function StatusTab({
  currentStatus,
  data,
  openUpdateDialog
}: {
  currentStatus: OrderStatus;
  data: IOrderStatus[];
  openUpdateDialog: () => void;
}) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>Order Status History</CardTitle>
          {!["cancelled", "returned"].includes(currentStatus) && (
            <Button
              onClick={openUpdateDialog}
            >
              <Plus />
              Update Status
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col border-l-4 border-yellow-200 pl-4 gap-6">
          {data.map(item => (
            <div key={item._id} className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {/*
                  {getStatusIcon(item.status)}
                  */}
                  <span className="font-medium text-foreground">{getOrderStatus(item.status)}</span>
                  <span className="text-xs text-muted-foreground">{dayjs(item.updatedAt).format("hh:mm - DD/MM/YYYY")}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.notes}</p>
              </div>

              <div className="flex justify-end items-center gap-1 text-xs text-muted-foreground">
                <span className="">
                  Updated by
                </span>
                {item.updated_by_type === "customer" ? (
                  <span>
                    Customer
                  </span>
                ) : (
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => router.push(`../staffs/${item.updated_by}`)}
                  >
                    {item.updated_by_name}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}