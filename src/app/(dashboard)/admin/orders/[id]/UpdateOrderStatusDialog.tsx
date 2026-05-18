import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IUpdateOrderStatus } from "@/interfaces/orderStatus.interface";
import { getOrderStatusBadge } from "../OrdersFilter";
import { OrderStatus } from "@/lib/api/order.api";
import { Info } from "lucide-react";

const NullOrderStatus: IUpdateOrderStatus = {
  status: "",
  notes: ""
};

interface AddEditOrderStatusDialogProps {
  loading: boolean;
  availableStatusList: string[];
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: IUpdateOrderStatus) => void;
}

export default function UpdateOrderStatusDialog({
  loading,
  availableStatusList,
  open,
  setOpen,
  onSubmit
}: AddEditOrderStatusDialogProps) {
  const [formData, setFormData] = useState<IUpdateOrderStatus>(NullOrderStatus);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update Order Status
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-1">
            <Label
              htmlFor="order-status-status"
              className="text-muted-foreground"
            >
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value: OrderStatus) => setFormData({ ...formData, status: value })}
              disabled={loading}
            >
              <SelectTrigger size="default" className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {availableStatusList.map(value => (
                  <SelectItem key={value} value={value}>{getOrderStatusBadge(value)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.status === "packed" && (
              <div className="flex items-center gap-1 mt-3">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  This action will automatically generate a new inventory export document
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="order-status-notes"
              className="text-muted-foreground"
            >
              Notes
            </Label>
            <Input
              id="order-status-notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Enter notes (optional)"
              className="h-12"
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="lg"
            className="flex-1"
            onClick={() => {
              onSubmit(formData)
            }}
            disabled={!formData.status || loading}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}