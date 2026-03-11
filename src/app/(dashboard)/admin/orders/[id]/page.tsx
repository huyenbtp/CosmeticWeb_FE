"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { getOrderStatusBadge } from "../OrdersFilter";
import StatCards from "./StatCards";
import OrderItemsCard from "./OrderItemsCard";
import OrderInformation from "./OrderInformation";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { IOrderDetail } from "@/interfaces/order.interface";

const mockOrder: IOrderDetail = {
  _id: "ORD-001",
  order_code: "ORD-2025-000001",
  customer_id: "1",
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
  discount_amount: 98500,
  points_used: 10000,
  total: 876500,
  payment_method: "COD",
  payment_status: "paid",
  note: "",
  createdAt: "2025-11-15T09:30:00",
  updatedAt: "2025-11-15T09:30:00",
};

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useParams()
  const [data, setData] = useState<IOrderDetail>(mockOrder);

  return (
    <div className="px-8 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 mr-10">
          <h1 className="text-2xl font-semibold">Order {data.order_code}</h1>
          <p className="text-muted-foreground">
            Placed on {dayjs(data.createdAt).format("MMMM D, YYYY")} at {dayjs(data.createdAt).format("hh:mm A")}
          </p>
        </div>

        <Button
          onClick={() => { }}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Order
        </Button>
      </div>

      <StatCards data={data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <OrderItemsCard data={data} />
        </div>

        {/* Order Information */}
        <div className="col-span-1 space-y-6">
          <OrderInformation data={data} />
        </div>
      </div>
    </div>
  );
}