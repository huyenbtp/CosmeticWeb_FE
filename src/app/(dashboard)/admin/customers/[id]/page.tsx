"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Save, } from "lucide-react";
import StatsCard from "./StatsCard";
import ProfileTab from "./ProfileTab";
import OrderHistoryTab from "./OrderHistoryTab";
import { useParams, useRouter } from "next/navigation";
import { ICustomerDetail } from "@/interfaces/customer.interface";
import dayjs from "dayjs";
import customerApi from "@/lib/api/customer.api";
import AddressesTab from "./AddressList";

const mockCustomers = {
  _id: '1',
  name: "Sarah Johnson",
  phone: "+1 (555) 123-4567",
  points: 5655,
  createdAt: "2025-01-15T09:30:00",
  lastPurchase: "2025-11-26T09:30:00",
  totalPurchases: 6,
  totalSpent: 3290300,
  averagePurchaseValue: 658060,
  purchases: [
    {
      _id: "REC-001",
      date: "2025-11-26T08:00:00",
      total_items: 2,
      final_amount: 565500,
      payment_method: "Cash",
    },
    {
      _id: "REP-015",
      date: "2025-10-11T09:30:00",
      total_items: 3,
      final_amount: 825200,
      payment_method: "Bank Transfer",
    },
    {
      _id: "REP-022",
      date: "2025-07-28T08:00:00",
      total_items: 1,
      final_amount: 374100,
      payment_method: "Bank Transfer",
    },
    {
      _id: "REP-031",
      date: "2025-06-12T09:30:00",
      total_items: 4,
      final_amount: 1100000,
      payment_method: "Cash",
    },
    {
      _id: "REP-045",
      date: "2025-05-03T09:30:00",
      total_items: 2,
      final_amount: 425500,
      payment_method: "Bank Transfer",
    }
  ],
};

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<ICustomerDetail>();
  const [loading, setLoading] = useState(false);

  const fetchCustomer = async () => {
    setLoading(true)
    try {
      const res = await customerApi.fetchCustomerById(id);
      setData(res);
    } catch (error) {
      console.error("Fetch customer failed:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleUserIsActiveChange = async (is_active: boolean) => {
    try {
      
    } catch (error) {
      console.error("Change user is_active failed:", error);
    } finally {
      fetchCustomer()
    }
  };

  if (loading) return (
    <div className="h-full flex justify-center items-center">
      <Spinner className="size-12" />
    </div>
  )
  if (data) return (
    <div className="px-8 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 mr-10">
          <h1 className="text-2xl font-semibold">{data.full_name}</h1>
          <p className="text-muted-foreground">
            Customer since {dayjs(data.createdAt).format("MMM D, YYYY")}
          </p>
        </div>

        <Button
          variant={data.user.is_active ? "destructive" : "outline"}
          onClick={() => {
            data.user.is_active
              ? handleUserIsActiveChange(false)
              : handleUserIsActiveChange(true)
          }}
        >
          {data.user.is_active ? 'Inactivate' : 'Activate'} User
        </Button>
      </div>

      <StatsCard data={data} />

      <Tabs defaultValue="details" className="w-full space-y-1">
        <TabsList className="space-x-2">
          <TabsTrigger value="details">Profile</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <ProfileTab data={data} setData={setData} />
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <OrderHistoryTab data={data} />
        </TabsContent>

        <TabsContent value="addresses" className="space-y-6">
          <AddressesTab data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}