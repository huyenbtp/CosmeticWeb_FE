import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ICustomerDetail } from "@/interfaces/customer.interface";
import dayjs from "dayjs";
import { getCustomerStatusBadge } from "../management/CustomersFilter";
import { capitalizeWords } from "@/lib/utils";
import { Calendar, Mars, Phone, User, Venus } from "lucide-react";

export default function ProfileTab({
  data,
  setData,
}: {
  data: ICustomerDetail;
  setData: (data: ICustomerDetail) => void;
}) {
  const is_active = data.user.is_active ? "active" : "inactive";
  const is_verified = data.user.is_verified ? "verified" : "unverified";

  const monthSinceJoining =
    (new Date().getFullYear() - new Date(data.createdAt).getFullYear()) * 12 +
    (new Date().getMonth() - new Date(data.createdAt).getMonth()) | 1;
    
  const orderFrequency = data.totalOrders / monthSinceJoining;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-10">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage alt={data.full_name} />
              <AvatarFallback className="bg-primary text-white text-2xl">
                {data.full_name[0]}
              </AvatarFallback>
            </Avatar>
            <div >
              <h3 className="text-lg font-medium">{data.full_name}</h3>
              <p className="text-muted-foreground">{data.user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                {getCustomerStatusBadge(is_active)}
                {getCustomerStatusBadge(is_verified)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center w-12 h-12 bg-muted rounded-full">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium">
                  {data.full_name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center w-12 h-12 bg-muted rounded-full">
                <Phone className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{data.phone}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center w-12 h-12 bg-muted rounded-full">
                {data.gender === "Male"
                  ? <Mars className="w-5 h-5 text-muted-foreground" />
                  : <Venus className="w-5 h-5 text-muted-foreground" />}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-medium">
                  {capitalizeWords(data.gender)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex justify-center items-center w-12 h-12 bg-muted rounded-full">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-medium">
                  {dayjs(data.dob).format("DD/MM/YYYY")}
                </p>
              </div>
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
              <Label className="text-sm text-muted-foreground">Last Order</Label>
              <p className="font-medium">
                {data.lastOrder ? dayjs(data.lastOrder).format("MMMM D, YYYY") : "No information available"}
              </p>
            </div>
          </div>
          <div className="space-y-3 pt-4 border-t">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer Lifetime Value</span>
              <span className="font-medium text-green-600">{data.totalSpent.toLocaleString()} VND</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Frequency</span>
              <span className="font-medium ">{orderFrequency}x per month</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}