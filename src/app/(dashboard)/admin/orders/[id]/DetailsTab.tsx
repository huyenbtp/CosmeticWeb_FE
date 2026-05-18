import OrderItemsCard from "./OrderItemsCard";
import OrderInformation from "./OrderInformation";
import { IOrderDetail } from "@/interfaces/order.interface";

export default function DetailsTab({
  data,
}: {
  data: IOrderDetail
}) {
  return (
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
  )
}