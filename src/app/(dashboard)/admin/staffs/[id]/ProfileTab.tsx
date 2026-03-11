import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { IStaffDetail } from "@/interfaces/staff.interface";
import dayjs from "dayjs";
import { Calendar, CircleUser, Mars, Phone, User, Venus } from "lucide-react";
import { getStaffStatusBadge } from "../StaffsFilter";
import { capitalizeWords } from "@/lib/utils";

export default function ProfileTab({
  data,
  setData,
}: {
  data: IStaffDetail;
  setData: (data: IStaffDetail) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
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

          <div className="grid grid-cols-2 gap-4 p-3 pt-6 border-t">
            <div>
              <Label className="text-sm text-muted-foreground">Employee Since</Label>
              <p className="font-medium">
                {dayjs(data.createdAt).format("MMMM D, YYYY")}
              </p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Last Updated</Label>
              <p className="font-medium">
                {dayjs(data.updatedAt).format("MMMM D, YYYY")}
              </p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Position</Label>
              <Badge variant="outline">
                {capitalizeWords(data.position)}
              </Badge>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Status</Label>
              {getStaffStatusBadge(data.status)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center w-12 h-12 bg-muted rounded-full">
              <CircleUser className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Username</p>
              <p className="font-medium">
                {data.account.username}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 p-3 pt-6 border-t">
            <div>
              <Label className="text-sm text-muted-foreground">Last Updated</Label>
              <p className="font-medium">
                {data.account.updatedAt && dayjs(data.account.updatedAt).format("MMMM D, YYYY")}
              </p>
            </div>
            <div></div>
            <div>
              <Label className="text-sm text-muted-foreground">Role</Label>
              <Badge variant="outline">
                {capitalizeWords(data.account.role)}
              </Badge>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Status</Label>
              {getStaffStatusBadge(data.account.status)}
            </div>
          </div>


        </CardContent>
      </Card>
    </div>
  )
}