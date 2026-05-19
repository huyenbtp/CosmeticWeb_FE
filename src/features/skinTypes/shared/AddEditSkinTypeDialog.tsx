import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IAddEditSkinType } from "@/interfaces/skinType.interface";
import { Textarea } from "@/components/ui/textarea";

const NullSkinType: IAddEditSkinType = {
  name: "",
  description: "",
};

interface AddEditSkinTypeDialogProps {
  loading: boolean;
  initialData?: any;
  open: boolean;
  setOpen: (open: boolean) => void;
  onCreate: (payload: IAddEditSkinType) => void;
  onUpdate: (payload: IAddEditSkinType) => void;
}

export default function AddEditSkinTypeDialog({ loading, initialData, open, setOpen, onCreate, onUpdate }: AddEditSkinTypeDialogProps) {
  const [formData, setFormData] = useState<IAddEditSkinType>(NullSkinType);

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData(NullSkinType);
  }, [initialData]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit" : "Add New"} Skin Type
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-1">
            <Label
              htmlFor="skin-type-name"
              className="text-muted-foreground"
            >
              Name
            </Label>
            <Input
              id="skin-type-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter skin type"
              className="h-12"
              disabled={loading}
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="skin-type-description"
              className="text-muted-foreground"
            >
              Description
            </Label>
            <Textarea
              id="skin-type-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
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