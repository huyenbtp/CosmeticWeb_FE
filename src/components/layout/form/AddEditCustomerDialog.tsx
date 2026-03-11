import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { IAddEditCustomer } from "@/interfaces/customer.interface";
import customerApi from "@/lib/api/customer.api";

const NullCustomer: IAddEditCustomer = {
  _id: "",
  name: "",
  phone: "",
};

export default function AddEditCustomerDialog({
  mode,
  initialData,
  setData,
  open,
  setOpen,
}: {
  mode: "create" | "edit";
  initialData?: any;
  setData?: (data: any) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [formData, setFormData] = useState<IAddEditCustomer>(NullCustomer);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData(NullCustomer);
  }, [initialData]);

  const handleSubmit = async () => {
    if (loading) return;
    const phoneno = /^0\d{9}$/;
    if (!formData.phone.match(phoneno)) {
      alert("Wrong phone number format");
      return;
    }
    setLoading(true);

    try {
      const { _id, ...payload } = formData;

      let res;
      if (mode === "create")
        res = await customerApi.createCustomer(payload)
      else {
        if (!_id) return;
        res = await customerApi.updateCustomer(_id, payload)
      }
      if (setData) setData(res);
      setOpen(false);
    } catch (err) {
      console.error("Submit failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit" : "Add New"} Customer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-1">
            <Label
              htmlFor="customer-name"
              className="text-muted-foreground"
            >
              Full Name
            </Label>
            <Input
              id="customer-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter customer's full name"
              className="h-12"
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="customer-phone"
              className="text-muted-foreground"
            >
              Phone Number
            </Label>
            <Input
              id="customer-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter customer's phone number"
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
              handleSubmit();
            }}
            disabled={loading || !formData.name.trim() || !formData.phone.trim()}
          >
            {loading
              ? <Spinner className="size-4 text-white" />
              : mode === "edit" ? "Save" : "Add"
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}