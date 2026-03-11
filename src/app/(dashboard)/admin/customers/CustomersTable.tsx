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

const mockCustomers: ICustomer[] = [
  {
    _id: '1',
    name: "Sarah Johnson",
    phone: "0123456789",
    points: 15000,
    createdAt: "2024-01-15",
  },
  {
    _id: '2',
    name: "Mike Chen",
    phone: "0123456789",
    points: 32000,
    createdAt: "2024-03-22",
  },
  {
    _id: '3',
    name: "Emma Wilson",
    phone: "0123456789",
    points: 10000,
    createdAt: "2024-02-10",
  },
  {
    _id: '4',
    name: "David Brown",
    phone: "0123456789",
    points: 103000,
    createdAt: "2023-11-05",
  },
  {
    _id: '5',
    name: "Lisa Garcia",
    phone: "0123456789",
    points: 10000,
    createdAt: "2024-06-18",
  },
  {
    _id: '6',
    name: "James Taylor",
    phone: "0123456789",
    points: 40000,
    createdAt: "2024-04-12",
  },
  {
    _id: '7',
    name: "Maria Rodriguez",
    phone: "0123456789",
    points: 20000,
    createdAt: "2024-08-03",
  }
];

type CustomerKey = "name" | "phone";

export default function CustomersTable({
  onView,
  onEdit,
  onDelete,
}: {
  onView: (id: string) => void;
  onEdit: (data: IAddEditCustomer) => void;
  onDelete: (id: string) => void;
}) {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1) || 1;
  const searchQuery = searchParams.get("q") || "";

  const [limit, setLimit] = useState(7);
  const [searchBy, setSearchBy] = useState<CustomerKey>("name");
  const [data, setData] = useState<ICustomer[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    // Mô phỏng loading trong 500ms rồi render giao diện
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);

  };

  useEffect(() => {
    fetchCustomers();
    setData(mockCustomers.slice(0, limit)) //sau khi fetch data thật thì xóa dòng này đi
    setTotal(mockCustomers.length)
  }, [page, limit, searchQuery, searchBy]);


  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar placeholder="Search customers..." willUpdateQuery />

          <Select value={searchBy} onValueChange={(value: CustomerKey) => setSearchBy(value)}>
            <SelectTrigger size="sm" className="w-full sm:w-48">
              <SelectValue placeholder="Search by ..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Customer name</SelectItem>
              <SelectItem value="phone">Phone number</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Customer</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Points</TableHead>
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
              data.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell className="w-2/5 max-w-80 pr-8" title={customer.name}>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage alt={customer.name} />
                        <AvatarFallback className="bg-primary text-white">
                          {customer.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="flex-1 font-medium truncate">{customer.name}</span>
                    </div>
                  </TableCell>

                  <TableCell className="w-1/5 text-muted-foreground">
                    {customer.phone}
                  </TableCell>

                  <TableCell className="w-1/5 text-muted-foreground">
                    {dayjs(customer.createdAt).format("MMMM D, YYYY")}
                  </TableCell>

                  <TableCell className="w-1/5 font-medium">
                    {customer.points.toLocaleString()} đ
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
                      onClick={() => { onEdit(customer) }}
                    >
                      <Edit className="w-4 h-4" />
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
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Pagination total={total} page={page} limit={limit} onLimitChange={setLimit} item="customer" />

      </CardContent>
    </Card>
  );
}