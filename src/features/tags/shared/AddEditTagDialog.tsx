import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IAddEditTag } from "@/interfaces/tag.interface";
import { TagStatus } from "@/lib/api/tag.api";
import { getTagStatusBadge } from "../management/TagsFilter";

const NullTag: IAddEditTag = {
  name: "",
  status: "active",
};

interface AddEditTagDialogProps {
  loading: boolean;
  initialData?: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  onCreate: (payload: IAddEditTag) => void;
  onUpdate: (payload: IAddEditTag) => void;
}

export default function AddEditTagDialog({ loading, initialData, open, setOpen, onCreate, onUpdate }: AddEditTagDialogProps) {
  const [formData, setFormData] = useState<IAddEditTag>(NullTag);

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData(NullTag);
  }, [initialData]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit" : "Add New"} Tag
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-1">
            <Label
              htmlFor="tag-name"
              className="text-muted-foreground"
            >
              Name
            </Label>
            <Input
              id="tag-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter tag name"
              className="h-12"
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <div className="space-y-1">
              <Label
                htmlFor="tag-status"
                className="text-muted-foreground"
              >
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: TagStatus) => setFormData({ ...formData, status: value })}
                disabled={loading}
              >
                <SelectTrigger size="default" className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  {["active", "archived"].map(value => (
                    <SelectItem key={value} value={value}>{getTagStatusBadge(value)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            size="lg"
            className="flex-1"
            onClick={() => {
              initialData ? onUpdate(formData) : onCreate(formData);
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