import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Combobox from "@/components/layout/Combobox";
import { IAddEditCategory, ICategory } from "@/interfaces/category.interface";

const NullCategory: IAddEditCategory = {
  parent_id: null,
  name: "",
  slug: "",
};

interface AddEditCategoryDialogProps {
  initialData?: any;
  parentId: string | null;
  categoryList: ICategory[];
  open: boolean;
  setOpen: (open: boolean) => void;
  onCreate: (payload: IAddEditCategory) => void;
  onUpdate: (payload: IAddEditCategory) => void;
}

export default function AddEditCategoryDialog({ initialData, parentId, categoryList, open, setOpen, onCreate, onUpdate }: AddEditCategoryDialogProps) {
  const [formData, setFormData] = useState<IAddEditCategory>(NullCategory);

  useEffect(() => {
    if (initialData) setFormData(initialData);
    else if (parentId) setFormData({ ...formData, parent_id: parentId });
    else setFormData(NullCategory);
  }, [initialData, parentId]);

  const getAllChildCategoryIds = (parentId: string) => {
    const result = [];
    const stack = [parentId];

    while (stack.length) {
      const currentId = stack.pop();
      result.push(currentId);

      const children = categoryList.filter((c) => c.parent_id === currentId)

      children.forEach((c) => stack.push(c._id));
    }

    return result;
  };

  const disabledIdsList = formData._id ? getAllChildCategoryIds(formData._id) : [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit" : "Add New"} Category
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-1">
            <Label
              htmlFor="category-name"
              className="text-muted-foreground"
            >
              Name
            </Label>
            <Input
              id="category-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter category's name"
              className="h-12"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="category-slug"
              className="text-muted-foreground"
            >
              Slug
            </Label>
            <Input
              id="category-slug"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="Enter category's slug"
              className="h-12"
            />
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="category-parent"
              className="text-muted-foreground"
            >
              Parent Category
            </Label>
            <Combobox
              items={categoryList}
              selectedValue={formData.parent_id}
              onChange={(v) => setFormData({ ...formData, parent_id: v })}
              getLabel={(c) => c.name}
              getValue={(c) => c._id}
              getDisabled={(c) => disabledIdsList.includes(c._id)}
              placeholder="No parent (root category)"
              emptyText="No category found."
              disabled={parentId !== null}
              allowNull
              nullLabel="Root category"
              variant="outline"
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
            disabled={!formData.name || !formData.slug}
          >
            {initialData ? "Save" : "Add"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}