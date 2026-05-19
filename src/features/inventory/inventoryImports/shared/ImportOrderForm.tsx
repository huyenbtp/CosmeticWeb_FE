import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Save } from "lucide-react";
import dayjs from "dayjs";
import { IAddEditImport, IImportDetail } from "@/interfaces/import.interface";
import { IImportItemUI } from "@/interfaces/importItem.interface";
import AddEditImportItemDialog from "./AddImportItemDialog";
import { Textarea } from "@/components/ui/textarea";
import ImportItemsTable from "../create/ImportItemsTable";

const NullImport: IAddEditImport = {
  items: [],
  notes: "",
};

export interface IStaffCreated {
  _id: string;
  staff_code: string;
  full_name: string;
}

const mockStaff: IStaffCreated = {
  _id: "ADM-2025-0001",
  staff_code: "ADM-2025-0001",
  full_name: "Sarah Johnson"
}

interface ImportFormProps {
  mode: "create" | "edit";
  loading?: boolean;
  initialData?: IImportDetail;
  onSubmit: (data: IAddEditImport) => void;
}

export default function ImportOrderForm({
  mode,
  loading = false,
  initialData,
  onSubmit
}: ImportFormProps) {
  const [creator, setCreator] = useState(JSON.parse(localStorage.getItem("auth_profile") || "{}"));
  const [items, setItems] = useState<IImportItemUI[]>([]);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (initialData) {
      setCreator(initialData.createdStaff)
      setItems(initialData.items.map(item => {
        const { _id, import_id, ...rest } = item;
        return (
          {
            product_id: item.product._id,
            ...rest,
          }
        )
      }))
      setNotes(initialData.notes)
    }

  }, [initialData]);

  const handleAddItem = (
    selectedProduct: any,
    batch_code: string,
    quantity: number,
    unitCost: number,
    mfg_date: string,
    exp_date: string
  ) => {
    const existingItem = items.find(item => item.product_id === selectedProduct._id);

    if (existingItem) {
      setItems(items.map(item =>
        item.product._id === selectedProduct._id
          ? {
            ...item,
            quantity: item.quantity + quantity,
            unit_price: unitCost,
          }
          : item
      ));
    } else {
      setItems(prev => [
        ...prev,
        {
          product_id: selectedProduct._id,
          batch_code,
          quantity,
          unit_price: unitCost,
          mfg_date,
          exp_date,
          product: selectedProduct,
        }
      ]);
    }

    setIsAddItemOpen(false);
  };

  const handleUpdateBatchCode = (id: string, code: string) => {
    setItems(items.map(item => {
      if (item.product_id === id) {
        return {
          ...item,
          batch_code: code,
        };
      }
      return item;
    }));
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setItems(items.map(item => {
      if (item.product_id === id) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    }));
  };

  const handleUpdateUnitCost = (id: string, newCost: number) => {
    setItems(items.map(item => {
      if (item.product_id === id) {
        return {
          ...item,
          unit_price: newCost,
        };
      }
      return item;
    }));
  };

  const handleUpdateMfgDate = (id: string, newMfg: string) => {
    setItems(items.map(item => {
      if (item.product_id === id) {
        return {
          ...item,
          mfg_date: newMfg,
        };
      }
      return item;
    }));
  };

  const handleUpdateExpDate = (id: string, newExp: string) => {
    setItems(items.map(item => {
      if (item.product_id === id) {
        return {
          ...item,
          exp_date: newExp,
        };
      }
      return item;
    }));
  };

  const handleRemoveItem = (product_id: string) => {
    setItems(items.filter(item => item.product_id !== product_id));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

  const handleSubmit = () => {
    const payload: IAddEditImport = {
      items,
      notes,
    };

    onSubmit(payload);
  };

  return (
    <div className="h-full flex flex-col px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 mr-10">
          <h1 className="text-2xl font-semibold">
            {mode === "create" ? "New Import Order" : "Edit Import Order"}
          </h1>
          <p className="text-muted-foreground">
            Fill in the details below to {mode === "create" ? "create a new" : "edit"} import order
          </p>
        </div>

        <Button
          disabled={loading || items.length <= 0}
          onClick={handleSubmit}
        >
          <Save className="w-4 h-4 mr-2" />
          Save as Draft
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Import Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Created by:</span>
              <span className="font-medium">{creator.full_name}</span>
            </div>
            <div className="flex justify-between">
              <span>Created date:</span>
              <span className="font-medium">{dayjs(initialData ? initialData.createdAt : new Date()).format("DD/MM/YYYY")}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              id="notes"
              placeholder="Add any additional notes about this import order..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 grid grid-cols-1">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Import Items</CardTitle>

              <AddEditImportItemDialog
                open={isAddItemOpen}
                setOpen={setIsAddItemOpen}
                handleAddItem={handleAddItem}
              />
            </div>
          </CardHeader>

          <CardContent>
            {items.length === 0 ? (
              <div className="text-center pt-12 pb-24">
                <Package className="w-24 h-24 p-5 border bg-accent/30 text-gray-300 mx-auto mb-4 rounded-full" />
                <p className="text-muted-foreground">No items added yet</p>
                <p className="text-sm text-gray-400 mt-1">Click "Add Item" to start building your import order</p>
              </div>
            ) : (
              <>
                <ImportItemsTable
                  data={items}
                  handleUpdateBatchCode={handleUpdateBatchCode}
                  handleUpdateQuantity={handleUpdateQuantity}
                  handleUpdateUnitCost={handleUpdateUnitCost}
                  handleUpdateMfgDate={handleUpdateMfgDate}
                  handleUpdateExpDate={handleUpdateExpDate}
                  handleRemoveItem={handleRemoveItem}
                />

                <div className="space-y-2 mt-2 py-4 border-t">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Products Updated:</span>
                    <span>{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Items Imported:</span>
                    <span>{totalItems}</span>
                  </div>

                  <div className="flex justify-between font-bold text-xl pt-4 border-t">
                    <span>Total Cost</span>
                    <span>{totalAmount.toLocaleString()} đ</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}