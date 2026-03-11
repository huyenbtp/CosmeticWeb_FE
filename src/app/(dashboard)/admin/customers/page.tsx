"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CustomersTable from "./CustomersTable";
import AddEditCustomerDialog from "../../../../components/layout/form/AddEditCustomerDialog";
import { IAddEditCustomer } from "@/interfaces/customer.interface";

export default function CustomersManagement() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<IAddEditCustomer | null>(null);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  const [customerDialogMode, setCustomerDialogMode] = useState<"create" | "edit">("create");

  return (
    <div className="px-8 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Customers Management
        </h1>
        <Button
          onClick={() => {
            setSelectedItem(null)
            setCustomerDialogMode("create")
            setIsAddEditDialogOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Customer
        </Button>
      </div>

      <CustomersTable
        onView={(id) => { router.push(`customers/${id}`) }}
        onEdit={(selected) => {
          setSelectedItem(selected)
          setCustomerDialogMode("edit")
          setIsAddEditDialogOpen(true)
        }}
        onDelete={() => { }}
      />

      <AddEditCustomerDialog
        mode={customerDialogMode}
        initialData={selectedItem}
        open={isAddEditDialogOpen}
        setOpen={setIsAddEditDialogOpen}
      />
    </div>
  );
}