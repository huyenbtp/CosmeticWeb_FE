"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Edit } from "lucide-react";
import { getOrderPaymentStatusBadge, getOrderStatusBadge } from "../OrdersFilter";
import StatCards from "./StatCards";
import DetailsTab from "./DetailsTab";
import StatusTab from "./StatusTab";
import UpdateOrderStatusDialog from "./UpdateOrderStatusDialog";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { IOrderDetail } from "@/interfaces/order.interface";
import { IOrderStatus, IUpdateOrderStatus } from "@/interfaces/orderStatus.interface";
import orderApi, { OrderStatus } from "@/lib/api/order.api";
import orderStatusApi, { ALLOWED_TRANSITIONS } from "@/lib/api/orderStatus.api";

const mockOrder = {
  _id: "ORD-001",
  order_code: "ORD-2025-000001",
  user_id: "1",
  customer: {
    _id: "1",
    name: "Emma Wilson",
    phone: "0123456789",
  },
  items: [
    {
      _id: "1",
      order_id: "1",
      product_id: "1",
      product: {
        _id: "1",
        name: "Kem chống nắng Anessa Perfect UV",
        sku: "SUN-ANE-0001",
        image: "https://picsum.photos/200/300",
      },
      unit_price: 480000,
      quantity: 1,
    },
    {
      _id: "2",
      order_id: "1",
      product_id: "2",
      product: {
        _id: "2",
        name: "Sữa rửa mặt Innisfree Green Tea",
        sku: "CLS-INN-0001",
        image: "https://picsum.photos/200/300",
      },
      unit_price: 210000,
      quantity: 1,
    },
    {
      _id: "3",
      order_id: "1",
      product_id: "3",
      product: {
        _id: "3",
        name: "Phấn phủ Fit Me Matte + Poreles",
        sku: "MAK-FIT-0003",
        image: "https://picsum.photos/200/300",
      },
      unit_price: 295000,
      quantity: 1,
    }
  ],
  total_items: 3,
  subtotal: 985000,
  shipping_fee: 98500,
  points_used: 10000,
  total_estimated: 876500,
  payment_method: "COD",
  payment_status: "paid",
  notes: "",
  createdAt: "2025-11-15T09:30:00",
  updatedAt: "2025-11-15T09:30:00",
};

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IOrderDetail>();
  const [statusHistory, setStatusHistory] = useState<IOrderStatus[]>();
  const [loading, setLoading] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleUpdateStatus = async (updateData: IUpdateOrderStatus) => {
    if (!id || !updateData.status) return;
    setLoading(true)

    try {
      const payload = {
        order_id: id,
        ...updateData
      }
      await orderStatusApi.updateOrderStatus(payload);

      toast.success("Update order status successfully")

      fetchOrder();
      fetchOrderStatus();
    } catch (error) {
      toast.error("Create category failed:" + error);
    } finally {
      setLoading(false);
      setDialogVisible(false);
    }
  };

  const fetchOrder = async () => {
    setLoading(true)
    try {
      const res = await orderApi.fetchOrderById(id);
      setData(res);
    } catch (error) {
      toast.error("Fetch order failed:" + error);
    } finally {
      setLoading(false)
    }
  };

  const fetchOrderStatus = async () => {
    setLoading(true)
    try {
      const res = await orderStatusApi.fetchOrderStatusByOrderId(id);
      setStatusHistory(res);
    } catch (error) {
      toast.error("Fetch order status failed:" + error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchOrder();
    fetchOrderStatus();
  }, []);

  if (loading) return (
    <div className="h-full flex justify-center items-center">
      <Spinner className="size-12" />
    </div>
  )
  if (data && statusHistory) return (
    <div className="px-8 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 mr-10">
          <h1 className="text-2xl font-semibold">Order {data.order_code}</h1>
          <p className="text-muted-foreground">
            Placed on {dayjs(data.createdAt).format("MMMM D, YYYY")} at {dayjs(data.createdAt).format("hh:mm A")}
          </p>
        </div>

        {getOrderStatusBadge(data.order_status,)}
        {getOrderPaymentStatusBadge(data.payment_status)}

      </div>

      <StatCards data={data} />

      <Tabs defaultValue="details" className="w-full space-y-1">
        <TabsList className="space-x-2">
          <TabsTrigger value="details">Order Details</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <DetailsTab data={data} />
        </TabsContent>

        <TabsContent value="status" className="space-y-6">
          <StatusTab
            currentStatus={data.order_status as OrderStatus}
            data={statusHistory}
            openUpdateDialog={() => setDialogVisible(true)}
          />
        </TabsContent>
      </Tabs>

      <UpdateOrderStatusDialog
        loading={loading}
        availableStatusList={ALLOWED_TRANSITIONS[data.order_status]}
        open={dialogVisible}
        setOpen={setDialogVisible}
        onSubmit={handleUpdateStatus}
      />
    </div>
  );
}