"use client"

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageWithFallback } from "@/components/layout/ImageWithFallback";
import { Edit, Phone, } from "lucide-react";
import { getStaffStatusBadge } from "../StaffsFilter";
import ProfileTab from "./ProfileTab";
import PurchasesHandledTab from "./PurchasesHandledTab";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { IStaffDetail } from "@/interfaces/staff.interface";
import { capitalizeWords } from "@/lib/utils";
import staffApi from "@/lib/api/staff.api";

const mockStaff = {
  _id: '1',
  staff_code: "ADM-2025-0001",
  full_name: "Sarah Johnson",
  gender: "female",
  dob: "1998-02-25T00:00:00",
  phone: "0123456789",
  image: "https://picsum.photos/200/300",
  status: "active",
  user: {
    _id: '1',
    email: "sarahjohnson@email.com",
    role: "warehouse_manager",
    status: "active",
    createdAt: "2025-01-15T09:30:00",
    updatedAt: "2025-11-26T09:30:00",
  },
  createdAt: "2025-01-15T09:30:00",
  updatedAt: "2025-11-26T09:30:00",
  purchasesHandled: [
    {
      _id: "REC-001",
      order_code: "REC-29112025-122530",
      customerName: "Mike Chen",
      date: "2025-11-26T08:00:00",
      final_amount: 565500,
      payment_method: "cash",
    },
    {
      _id: "REP-015",
      order_code: "REC-015",
      customerName: "Emma Wilson",
      date: "2025-10-11T09:30:00",
      final_amount: 825200,
      payment_method: "bank transfer",
    },
    {
      _id: "REP-022",
      order_code: "REC-022",
      customerName: "David Brown",
      date: "2025-07-28T08:00:00",
      final_amount: 374100,
      payment_method: "bank transfer",
    },
    {
      _id: "REP-031",
      order_code: "REC-031",
      customerName: "Lisa Garcia",
      date: "2025-06-12T09:30:00",
      final_amount: 1100000,
      payment_method: "cash",
    },
    {
      _id: "REP-045",
      order_code: "REC-045",
      customerName: "James Taylor",
      date: "2025-05-03T09:30:00",
      final_amount: 425500,
      payment_method: "bank transfer",
    }
  ]
};

export default function StaffDetail() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IStaffDetail>();
  const [loading, setLoading] = useState(false);

  const fetchStaff = async () => {
    setLoading(true)
    try {
      const res = await staffApi.fetchStaffByUserId(id);
      setData(res);
    } catch (error) {
      console.error("Fetch staff failed:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  if (loading) return (
    <div className="h-full flex justify-center items-center">
      <Spinner className="size-12" />
    </div>
  )
  if (data) return (
    <div className="px-8 py-6 space-y-6 flex flex-col h-full">
      <Card className="py-4">
        <CardContent className="flex gap-4 px-4">
          <ImageWithFallback
            src={data.image}
            alt={data.full_name}
            className="w-30 h-30 rounded-lg object-cover"
          />
          <div className="flex flex-col flex-1 mr-10">
            <h1 className="text-2xl font-semibold">{data.full_name}</h1>
            <p className="flex-1 text-muted-foreground">
              <Badge variant="outline">
                {capitalizeWords(data.user.role)}
              </Badge> - Employee since {dayjs(data.createdAt).format("MMM D, YYYY")}
            </p>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <p className="text-muted-foreground text-sm">
                Phone: <span className="text-foreground">{data.phone}</span>
              </p>
              {getStaffStatusBadge(data.status)}
            </div>
          </div>

          <div className="flex flex-col self-end gap-3">
            <Button
              className="justify-start"
              onClick={() => { router.push(`${id}/edit`) }}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Staff
            </Button>
          </div>
        </CardContent>
      </Card>


      <Tabs defaultValue="profile" className="w-full space-y-1 h-full">
        <TabsList className="space-x-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
        {/** 
          {data.account.role === "warehouse_manager" &&
            <TabsTrigger value="purchasesHandled">Purchases Handled</TabsTrigger>
          }
            */}
        </TabsList>

        <TabsContent value="profile" className="space-y-6 h-full">
          <ProfileTab data={data} setData={setData} />
        </TabsContent>

        <TabsContent value="purchasesHandled" className="space-y-6">
        {/**
          {data.account.role === "warehouse_manager" &&
            <PurchasesHandledTab data={data.purchasesHandled} />
          }
            */}
        </TabsContent>
      </Tabs>
    </div>
  );
}