import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IAddEditBrand, IBrand } from "@/interfaces/brand.interface";
import { getBrandStatusBadge } from "./BrandsFilter";
import ImageUploader, { ImageState } from "@/components/layout/ImageUploader";
import { BrandStatus } from "@/lib/api/brand.api";

const NullBrand: IAddEditBrand = {
  name: "",
  logo: "",
  status: "active"
};

interface AddEditBrandDialogProps {
  loading: boolean;
  initialData?: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  onCreate: (data: IAddEditBrand, file: File | null) => void;
  onUpdate: (data: IAddEditBrand, file: File | null, imageState: ImageState) => void;
}

export default function AddEditBrandDialog({ loading, initialData, open, setOpen, onCreate, onUpdate }: AddEditBrandDialogProps) {
  const [formData, setFormData] = useState<IAddEditBrand>(NullBrand);
  const [file, setFile] = useState<File | null>(null);
  const [imageState, setImageState] = useState<ImageState>("keep");

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData(NullBrand);
  }, [initialData]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit" : "Add New"} Brand
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-1">
            <Label
              htmlFor="brand-name"
              className="text-muted-foreground"
            >
              Name
            </Label>
            <Input
              id="brand-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter brand's name"
              className="h-12"
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="brand-status"
              className="text-muted-foreground"
            >
              Status
            </Label>
            <Select
              value={formData.status}
              onValueChange={(value: BrandStatus) => setFormData({ ...formData, status: value })}
              disabled={loading}
            >
              <SelectTrigger size="default" className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                {["active", "archived"].map(value => (
                  <SelectItem key={value} value={value}>{getBrandStatusBadge(value)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ImageUploader
            value={formData.logo}
            onChange={(value, state) => {
              setFile(value);
              setImageState(state);
            }}
            className="w-full h-60 rounded-lg border object-contain"
            label="Brand Logo"
            description="Upload a logo image for this brand."
          />
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
              initialData
                ? onUpdate(formData, file, imageState)
                : onCreate(formData, file);
            }}
            disabled={!formData.name || loading}
          >
            {initialData ? "Save" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}