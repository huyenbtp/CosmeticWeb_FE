"use client"

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2, } from "lucide-react";
import { useSearchParams } from "next/navigation";
import SearchBar from "@/components/layout/SearchBar";
import { Pagination } from "@/components/layout/Pagination";
import { ICustomer, IAddEditCustomer } from "@/interfaces/customer.interface";
import dayjs from "dayjs";
import { getStatusStyle } from "@/features/staffs/management/StaffsTable";

type CustomerKey = "name" | "phone";

export default function CustomersTable({
  loading,
  data,
  onView,
  onDelete,
}: {
  loading: boolean;
  data: ICustomer[];
  onView: (id: string) => void;
  onDelete: (id: string) => void;
}) {

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Customer</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Join Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total Orders</TableHead>
          <TableHead>Total Spent</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={7} align="center">
              <Spinner className="size-10" />
            </TableCell>
          </TableRow>
        ) : data.length > 0 ? (
          data.map((customer) => {
            const accStatus = customer.is_active ? "active" : "inactive";

            return (
              <TableRow key={customer._id}>
                <TableCell className="w-20/100 max-w-80 pr-8" title={customer.full_name}>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage alt={customer.full_name} />
                      <AvatarFallback className="bg-primary text-white">
                        {customer.full_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="flex-1 font-medium truncate">{customer.full_name}</span>
                  </div>
                </TableCell>

                <TableCell className="w-23/100 text-muted-foreground">
                  {customer.email}
                </TableCell>

                <TableCell className="w-12/100 text-muted-foreground">
                  {dayjs(customer.createdAt).format("DD/MM/YYYY")}
                </TableCell>

                <TableCell className="w-12/100 font-medium">
                  <Select
                    defaultValue={accStatus}
                    value={accStatus}
                    onValueChange={() => { }}
                  >
                    <SelectTrigger size="xs" className={`w-fit text-xs shadow-none ${getStatusStyle(accStatus)}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active" >Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell className="w-12/100 font-medium">
                  {customer.totalOrders}
                </TableCell>

                <TableCell className="w-12/100 font-medium">
                  {customer.totalSpent.toLocaleString()} đ
                </TableCell>

                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { onView(customer._id) }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => { onDelete(customer._id) }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })) : (
          <TableRow>
            <TableCell colSpan={7} align="center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}