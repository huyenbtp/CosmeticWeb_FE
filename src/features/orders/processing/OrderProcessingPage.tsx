"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import AlertDialog from "@/components/layout/AlertDialog";
import { capitalize, cn, updateQueryParams } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import OrderCard, { primaryLabel } from "./OrderCard";
import OrderDetailModal from "./OrderDetailModal";
import ConfirmOrderModal from "./ConfirmOrderModal";
import { PickingListModal } from "./PickingListModal";
import { useRouter, useSearchParams } from "next/navigation";
import { IOrderDetail } from "@/interfaces/order.interface"
import { IExportDetail } from "@/interfaces/export.inerface";
import { OrderStatus } from "@/lib/api/order.api"
import { PackingVerification } from "./PackingVerificationModal";

const mockOrders: IOrderDetail[] = [
  {
    _id: "65f1a2b3c4d5e6f7a8b90101",
    order_code: "ORD-20260602-001",
    user_id: "65f1a2b3c4d5e6f7a8b90001",
    customer: {
      _id: "65f1a2b3c4d5e6f7a8b90001",
      full_name: "Nguyễn Văn A",
      phone: "0901234567",
      email: "nguyenvana@gmail.com"
    },
    items: [
      {
        _id: "item_001",
        product: {
          _id: "prod_001",
          sku: "000001",
          name: "Bifesta Micellar Water",
          image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop&auto=format",
        },
        quantity: 1,
        unit_price: 250000
      },
      {
        _id: "item_002",
        product: {
          _id: "prod_002",
          sku: "000002",
          name: "Anessa Sunscreen SPF50+",
          image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=80&h=80&fit=crop&auto=format",
        },
        quantity: 1,
        unit_price: 400000
      },
      {
        _id: "item_009",
        product: {
          _id: "prod_009",
          sku: "000003",
          name: "Velvet Matte Lipstick",
          image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=80&h=80&fit=crop&auto=format",
        },
        quantity: 4,
        unit_price: 200000
      }
    ],
    total_items: 6,
    subtotal: 1450000,
    shipping_fee: 30000,
    total_estimated: 1480000,
    payment_method: "cod",
    payment_status: "unpaid",
    order_status: "pending",
    notes: "Giao giờ hành chính, gọi trước khi giao",
    receiver_name: "Nguyễn Văn A",
    phone: "0901234567",
    address_line: "123 Đường Lê Lợi",
    ward: "Phường Bến Nghé",
    district: "Quận 1",
    city: "Hồ Chí Minh",
    reveive_time: null,
    createdAt: "2026-06-02T08:00:00.000Z",
    updatedAt: "2026-06-02T08:30:00.000Z"
  },
  {
    _id: "65f1a2b3c4d5e6f7a8b90102",
    order_code: "ORD-20260602-002",
    user_id: "65f1a2b3c4d5e6f7a8b90002",
    customer: {
      _id: "65f1a2b3c4d5e6f7a8b90002",
      full_name: "Trần Thị B",
      phone: "0912345678",
      email: "thib.tran@yahoo.com"
    },
    items: [
      {
        _id: "item_003",
        product: {
          _id: "prod_003",
          sku: "MACBOOK-AIR-M2",
          name: "5-Step Skincare Kit",
          image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=80&h=80&fit=crop&auto=format",
        },
        quantity: 1,
        unit_price: 28000000
      }
    ],
    total_items: 1,
    subtotal: 28000000,
    shipping_fee: 0, // Freeship
    total_estimated: 28000000,
    payment_method: "bank_transfer",
    payment_status: "paid",
    order_status: "packed",
    notes: "Để ở bảo vệ nếu không gọi được",
    receiver_name: "Trần Thị B",
    phone: "0912345678",
    address_line: "456 Đường Nguyễn Huệ",
    ward: "Phường 1",
    district: "Quận 3",
    city: "Hồ Chí Minh",
    reveive_time: null,
    createdAt: "2026-06-02T09:15:00.000Z",
    updatedAt: "2026-06-02T11:00:00.000Z"
  },
  {
    _id: "65f1a2b3c4d5e6f7a8b90103",
    order_code: "ORD-20260601-003",
    user_id: "65f1a2b3c4d5e6f7a8b90003",
    customer: {
      _id: "65f1a2b3c4d5e6f7a8b90003",
      full_name: "Lê Hoàng C",
      phone: "0934567890",
      email: "hoangc.le@hotmail.com"
    },
    items: [
      {
        _id: "item_004",
        product: {
          _id: "prod_004",
          sku: "000004",
          name: "CeraVe Foaming Cleanser",
          image: "https://images.unsplash.com/photo-1586495777744-4e6232bf2f36?w=80&h=80&fit=crop&auto=format",
        },
        quantity: 1,
        unit_price: 6500000
      }
    ],
    total_items: 1,
    subtotal: 6500000,
    shipping_fee: 40000,
    total_estimated: 6540000,
    payment_method: "bank_transfer",
    payment_status: "paid",
    order_status: "delivered",
    notes: "Giao hàng nhanh giúp mình nhé",
    receiver_name: "Lê Hoàng C",
    phone: "0934567890",
    address_line: "789 Đường Láng",
    ward: "Phường Láng Hạ",
    district: "Đống Đa",
    city: "Hà Nội",
    reveive_time: "2026-06-02T04:00:00.000Z", // Đã nhận hàng
    createdAt: "2026-06-01T14:20:00.000Z",
    updatedAt: "2026-06-02T04:05:00.000Z"
  },
  {
    _id: "65f1a2b3c4d5e6f7a8b90104",
    order_code: "ORD-20260602-004",
    user_id: "65f1a2b3c4d5e6f7a8b90004",
    customer: {
      _id: "65f1a2b3c4d5e6f7a8b90004",
      full_name: "Phạm Minh D",
      phone: "0976543210",
      email: "minhd.pham@outlook.com"
    },
    items: [
      {
        _id: "item_005",
        product: {
          _id: "prod_005",
          sku: "000005",
          name: "Dior Beauty Set",
          image: "https://example.com/images/keychronk3.jpg"
        },
        quantity: 1,
        unit_price: 2200000
      },
      {
        _id: "item_006",
        product: {
          _id: "prod_006",
          sku: "000006",
          name: "Vita Genic Hydrating (Vitamin E)",
          image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&h=80&fit=crop&auto=format",
        },
        quantity: 1,
        unit_price: 2400000
      }
    ],
    total_items: 2,
    subtotal: 4600000,
    shipping_fee: 35000,
    total_estimated: 4635000,
    payment_method: "bank_transfer",
    payment_status: "unpaid", // Thanh toán lỗi
    order_status: "cancelled", // Huỷ đơn
    notes: "",
    receiver_name: "Phạm Minh D",
    phone: "0976543210",
    address_line: "12 Đường Trần Hưng Đạo",
    ward: "Phường Hải Châu I",
    district: "Hải Châu",
    city: "Đà Nẵng",
    reveive_time: null,
    createdAt: "2026-06-02T02:10:00.000Z",
    updatedAt: "2026-06-02T02:15:00.000Z"
  },
  {
    _id: "65f1a2b3c4d5e6f7a8b90105",
    order_code: "ORD-20260602-005",
    user_id: "65f1a2b3c4d5e6f7a8b90005",
    customer: {
      _id: "65f1a2b3c4d5e6f7a8b90005",
      full_name: "Hoàng Thu E",
      phone: "0988888888",
      email: "thue.hoang@gmail.com"
    },
    items: [
      {
        _id: "item_007",
        product: {
          _id: "prod_007",
          sku: "000007",
          name: "Velvet Matte Lipstick",
          image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=80&h=80&fit=crop&auto=format",
        },
        quantity: 1,
        unit_price: 3800000
      }
    ],
    total_items: 1,
    subtotal: 3800000,
    shipping_fee: 25000,
    total_estimated: 3825000,
    payment_method: "cod",
    payment_status: "unpaid",
    order_status: "pending", // Chờ xác nhận
    notes: "Tặng quà, vui lòng không dán băng keo lên hộp sản phẩm",
    receiver_name: "Nguyễn Vũ Long (Bạn của E)", // Người nhận khác người đặt
    phone: "0922223333",
    address_line: "88 Đường Xuân Thủy",
    ward: "Phường Dịch Vọng Hậu",
    district: "Cầu Giấy",
    city: "Hà Nội",
    reveive_time: null,
    createdAt: "2026-06-02T15:30:00.000Z",
    updatedAt: "2026-06-02T15:30:00.000Z"
  },
  {
    _id: "65f1a2b3c4d5e6f7a8b90106",
    order_code: "ORD-20260602-006",
    user_id: "65f1a2b3c4d5e6f7a8b90006",
    customer: {
      _id: "65f1a2b3c4d5e6f7a8b90006",
      full_name: "Vũ Đình G",
      phone: "0945678123",
      email: "dinhg.vu@gmail.com"
    },
    items: [
      {
        _id: "item_008",
        product: {
          _id: "prod_008",
          sku: "000008",
          name: "Anessa Sunscreen SPF50+",
          image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=80&h=80&fit=crop&auto=format",
        },
        quantity: 2,
        unit_price: 2300000
      }
    ],
    total_items: 2,
    subtotal: 4600000,
    shipping_fee: 30000,
    total_estimated: 4630000,
    payment_method: "bank_transfer",
    payment_status: "paid",
    order_status: "confirmed",
    notes: "Xuất hóa đơn VAT cho công ty",
    receiver_name: "Vũ Đình G",
    phone: "0945678123",
    address_line: "56 Đường Nguyễn Chí Thanh",
    ward: "Phường Thạch Thang",
    district: "Hải Châu",
    city: "Đà Nẵng",
    reveive_time: null,
    createdAt: "2026-06-02T11:45:00.000Z",
    updatedAt: "2026-06-02T12:00:00.000Z"
  },
  {
    _id: "65f1a2b3c4d5e6f7a8b90107",
    order_code: "ORD-20260530-007",
    user_id: "65f1a2b3c4d5e6f7a8b90007",
    customer: {
      _id: "65f1a2b3c4d5e6f7a8b90007",
      full_name: "Đặng Thị H",
      phone: "0967890123",
      email: "thih.dang@gmail.com"
    },
    items: [
      {
        _id: "item_009",
        product: {
          _id: "prod_009",
          sku: "000009",
          name: "Dầu Gội Phục Hồi & Bóng Mượt Tsubaki Premium Moist & Repair Shampoo 450ml",
          image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=80&h=80&fit=crop&auto=format",
        },
        quantity: 1,
        unit_price: 170000
      }
    ],
    total_items: 1,
    subtotal: 170000,
    shipping_fee: 10000,
    total_estimated: 180000,
    payment_method: "cod",
    payment_status: "paid",
    order_status: "delivered",
    notes: "Tặng quà, vui lòng không dán băng keo lên hộp sản phẩm",
    receiver_name: "Đặng Thị H",
    phone: "0967890123",
    address_line: "789 Đường Hùng Vương",
    ward: "Phường 5",
    district: "Tuy Hòa",
    city: "Phú Yên",
    reveive_time: "2026-06-01T09:30:00.000Z",
    createdAt: "2026-05-30T10:00:00.000Z",
    updatedAt: "2026-06-01T09:35:00.000Z"
  },
  {
    _id: "65f1a2b3c4d5e6f7a8b90108",
    order_code: "ORD-20260602-008",
    user_id: "65f1a2b3c4d5e6f7a8b90008",
    customer: {
      _id: "65f1a2b3c4d5e6f7a8b90008",
      full_name: "Bùi Minh K",
      phone: "0955556666",
      email: "minhk.bui@gmail.com"
    },
    items: [
      {
        _id: "item_010",
        product: {
          _id: "prod_010",
          sku: "000010",
          name: "Kem Dưỡng Loreal Revitalift Hyaluronic Acid 8H Oil Control Gel-Cream 50ml",
          image: "https://images.unsplash.com/photo-1595272568891-123402d0fb3b?w=80&h=80&fit=crop&auto=format",
        },
        quantity: 1,
        unit_price: 5900000
      }
    ],
    total_items: 1,
    subtotal: 5900000,
    shipping_fee: 30000,
    total_estimated: 5930000,
    payment_method: "cod",
    payment_status: "unpaid",
    order_status: "shipping", // Đang giao hàng
    notes: "",
    receiver_name: "Bùi Minh K",
    phone: "0955556666",
    address_line: "321 Đường Nguyễn Văn Cừ",
    ward: "Phường An Khánh",
    district: "Ninh Kiều",
    city: "Cần Thơ",
    reveive_time: null,
    createdAt: "2026-06-02T07:00:00.000Z",
    updatedAt: "2026-06-02T13:00:00.000Z"
  }
];

const mockExport: IExportDetail = {
  _id: "1",
  export_code: "2026000001",
  createdStaff: {
    _id: "1",
    staff_code: "000001",
    full_name: "Tran Ha Ngan",
  },
  items: [
    {
      _id: "1",
      export_id: "1",
      product: {
        _id: "prod_001",
        sku: "000001",
        name: "Bifesta Micellar Water",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=80&h=80&fit=crop&auto=format",
      },
      batch: {
        _id: "1",
        batch_number: "2026000001",
      },
      notes: "",
      quantity: 1,
      unit_price: 250000
    },
    {
      _id: "2",
      export_id: "1",
      product: {
        _id: "prod_002",
        sku: "000002",
        name: "Anessa Sunscreen SPF50+",
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=80&h=80&fit=crop&auto=format",
      },
      batch: {
        _id: "2",
        batch_number: "2026000002",
      },
      notes: "",
      quantity: 1,
      unit_price: 400000
    },
    {
      _id: "3",
      export_id: "1",
      product: {
        _id: "prod_009",
        sku: "000003",
        name: "Velvet Matte Lipstick",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=80&h=80&fit=crop&auto=format",
      },
      batch: {
        _id: "3",
        batch_number: "2026000003",
      },
      notes: "",
      quantity: 1,
      unit_price: 200000
    },
    {
      _id: "4",
      export_id: "1",
      product: {
        _id: "prod_009",
        sku: "000003",
        name: "Velvet Matte Lipstick",
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=80&h=80&fit=crop&auto=format",
      },
      batch: {
        _id: "4",
        batch_number: "2026000004",
      },
      notes: "",
      quantity: 3,
      unit_price: 200000
    },
  ],
  products_updated: 3,
  items_exported: 6,
  total_amount: 1450000,
  status: "draft",
  type: "sales",
  order: {
    _id: "65f1a2b3c4d5e6f7a8b90101",
    order_code: "ORD-20260602-001",
  },
  notes: "",
  createdAt: "2026-06-03T08:00:00.000Z",
  updatedAt: "2026-06-03T08:30:00.000Z",
}

export const TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["packed", "cancelled"],
  cancelled: [],
  packed: ["shipping"],
  shipping: ["delivered"],
  delivered: [],
  returned: [],
};

interface OrderProcessingPageProps {
}

export default function OrderProcessingPage({

}: OrderProcessingPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<any[]>([]);
  const total = data.length;
  const limit = 12;
  const totalPages = Math.ceil(total / limit);
  const rawPage = Number(searchParams.get("page"));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const status = searchParams.get("status") || "";

  const [selectedOrder, setSelectedOrder] = useState<IOrderDetail | null>(null);
  const [nextStatus, setNextStatus] = useState<OrderStatus>();
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  const [confirmOrderModalVisible, setConfirmOrderModalVisible] = useState(false);

  const [exportData, setExportData] = useState<IExportDetail | null>(null);
  const [pickingListModalVisible, setPickingListModalVisible] = useState(false);
  const [confirmPackingModalVisible, setConfirmPackingModalVisible] = useState(false);

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  function goToPage(newPage: number) {
    const newQuery = updateQueryParams(searchParams, {
      page: newPage,
    });

    router.push(`?${newQuery}`);
  }

  const statuses = [
    { value: "all", label: "All Orders" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "packed", label: "Packed" },
    { value: "shipping", label: "Shipping" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
  ];

  const handleStatusChange = (value: string) => {
    const newQuery = updateQueryParams(searchParams, {
      status: value !== "all" ? value : "",
      page: 1,
    });
    router.push(`?${newQuery}`);
  }

  const handleOpenConfirmAction = (order: IOrderDetail, nextStatus: OrderStatus) => {
    setSelectedOrder(order);
    setNextStatus(nextStatus);
    setIsAlertDialogOpen(true);
  };

  const handleAction = () => {
    if (!selectedOrder || !nextStatus) return;

    // Intercept: confirm → show inventory check first
    if (nextStatus === "confirmed") {
      setConfirmOrderModalVisible(true)
      return;
    }

    // Intercept: packed → generate export slip
    if (nextStatus === "packed") {

      return;
    }

    //setLoading(true);

  };

  const handleShowPickingList = (order: IOrderDetail) => {
    const exportDoc = mockExport;
    setExportData(exportDoc);
    setSelectedOrder(order);
    setPickingListModalVisible(true)
  };

  const handleMarkPacked = (order: IOrderDetail) => {
    const exportDoc = mockExport;
    if (!exportDoc) return;
    setExportData(exportDoc);
    setSelectedOrder(order);
    setConfirmPackingModalVisible(true);
  };

  const fetchOrders = async () => {
    setLoading(true);

    try {
      const res = {
        data: mockOrders.filter(item => item.order_status === status || status === ""),
        pagination: {
          total: mockOrders.length
        }
      }
      setData(res.data);
    } catch (error) {
      toast.error("Fetch orders failed:" + error);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchOrders();
  }, [page, status]);

  return (
    <div className="px-8 py-6">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold">
          Order Processing
        </h1>
        <Badge variant={"outline"}>
          <span>Total:</span>
          <span className="text-destructive">{data.length}</span>
        </Badge>
      </div>

      <div className="flex px-4 gap-16 border-b mt-8">
        {statuses.map((item) => (
          <button
            key={item.value}
            onClick={() => handleStatusChange(item.value)}
            className={cn(
              "relative pb-3 text-sm cursor-pointer",
              (status === item.value || (item.value === "all" && status === ""))
                ? "font-medium after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary"
                : "hover:font-medium"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-8 mt-8">
        {loading ? (
          <Spinner className="size-10" />
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Package className="w-24 h-24 p-5 border bg-accent/30 text-gray-300 mx-auto mb-4 rounded-full" />
            <p className="text-muted-foreground font-medium">No orders found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
              {data.map((order) => (
                <OrderCard
                  key={order._id}
                  data={order}
                  onAction={(status) => {
                    handleOpenConfirmAction(order, status as OrderStatus);
                  }}
                  onViewDetail={() => {
                    setDetailModalVisible(true);
                    setSelectedOrder(order);
                  }}
                  onShowPickingList={handleShowPickingList}
                  onMarkPacked={handleMarkPacked}
                />
              ))}
            </div>

            <div className="flex justify-center items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => goToPage(page - 1)}
              >
                <ChevronLeft />
              </Button>

              <span className="font-medium text-primary">{page}</span> / {totalPages}

              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => goToPage(page + 1)}
              >
                <ChevronRight />
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Detail modal */}
      {detailModalVisible && selectedOrder && (
        <OrderDetailModal
          data={selectedOrder}
          onClose={() => {
            setDetailModalVisible(false)
          }}
          onAction={(status) => {
            handleOpenConfirmAction(selectedOrder, status as OrderStatus);
          }}
          onShowPickingList={handleShowPickingList}
          onMarkPacked={handleMarkPacked}
        />
      )}

      {/* Confirm order modal */}
      {confirmOrderModalVisible && selectedOrder && (
        <ConfirmOrderModal
          order={selectedOrder}
          onClose={() => {
            setConfirmOrderModalVisible(false)
          }}
          onConfirm={() => {
            handleAction();
          }}
        />
      )}

      {/* Picking list modal */}
      {pickingListModalVisible && exportData && selectedOrder && (
        <PickingListModal
          pickingList={exportData}
          order={selectedOrder}
          onClose={() => setPickingListModalVisible(false)}
        />
      )}

      {/* Confirm packing modal */}
      {confirmPackingModalVisible && exportData && selectedOrder && (
        <PackingVerification
          pickingList={exportData}
          order={selectedOrder}
          onConfirm={() => handleAction()}
          onClose={() => setConfirmPackingModalVisible(false)}
        />
      )}

      <AlertDialog
        visible={isAlertDialogOpen}
        onVisibleChange={setIsAlertDialogOpen}
        message={`Are you sure you want to ${primaryLabel[nextStatus ?? "confirmed"]?.toLocaleLowerCase()} this order?`}
        onConfirm={() => {
          handleAction()
        }}
      />
    </div>
  )
}