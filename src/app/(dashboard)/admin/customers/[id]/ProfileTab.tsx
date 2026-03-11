import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICustomerDetail } from "@/interfaces/customer.interface";
import dayjs from "dayjs";

export default function ProfileTab({
  data,
  setData,
  isEditing,
}: {
  data: ICustomerDetail;
  setData: (data: ICustomerDetail) => void;
  isEditing: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex justify-center items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage alt={data.name} />
              <AvatarFallback className="bg-primary text-white text-2xl">
                {data.name[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="customer-name">Full Name</Label>
              <Input
                id="customer-name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="customer-phone">Phone Number</Label>
              <Input
                id="customer-phone"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm text-muted-foreground">Member Since</Label>
              <p className="font-medium">
                {dayjs(data.createdAt).format("MMMM D, YYYY")}
              </p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Last Purchase</Label>
              <p className="font-medium">
                {dayjs(data.lastPurchase).format("MMMM D, YYYY")}
              </p>
            </div>
          </div>
          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer Lifetime Value</span>
              <span className="font-medium text-green-600">{data.totalSpent.toLocaleString()} VND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Purchase Frequency</span>
              <span className="font-medium ">1.2x per month</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}