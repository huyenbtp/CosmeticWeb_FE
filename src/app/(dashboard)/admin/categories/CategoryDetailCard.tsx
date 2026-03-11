import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Eye, Plus } from "lucide-react"
import Combobox from "@/components/layout/Combobox";
import { ICategory } from "@/interfaces/category.interface";

interface CategoryDetailCardProps {
  data: ICategory;
  categoryList: ICategory[];
  onSaveChanges: (payload: ICategory) => void;
  onAddChild: () => void;
  onViewProducts: () => void;
}

export default function CategoryDetailCard({
  data,
  categoryList,
  onSaveChanges,
  onAddChild,
  onViewProducts,
}: CategoryDetailCardProps) {
  const [selectedChanges, setSelectedChanges] = useState<ICategory>(data);

  useEffect(() => {
    setSelectedChanges(data)
  }, [data]);

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

  const disabledIdsList = data._id ? getAllChildCategoryIds(data._id) : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="category-name">Name</Label>
          <Input
            id="category-name"
            value={selectedChanges.name}
            onChange={(e) => { setSelectedChanges({ ...selectedChanges, name: e.target.value }) }}
            placeholder="Enter category's name"
            className="h-12"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="category-slug">Slug</Label>
          <Input
            id="category-slug"
            value={selectedChanges.slug}
            onChange={(e) => { setSelectedChanges({ ...selectedChanges, slug: e.target.value }) }}
            placeholder="Enter category's slug"
            className="h-12"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="category-parent">Parent Category</Label>
          <Combobox
            items={categoryList}
            selectedValue={selectedChanges.parent_id}
            onChange={(v) => { setSelectedChanges({ ...selectedChanges, parent_id: v }) }}
            getLabel={(c) => c.name}
            getValue={(c) => c._id}
            getDisabled={(c) => disabledIdsList.includes(c._id)}
            placeholder="No parent (root category)"
            emptyText="No category found."
            allowNull
            nullLabel="Root category"
            variant="outline"
          />
        </div>

        <div className="flex gap-3 mt-12">
          <Button
            variant="default"
            disabled={
              data.name === selectedChanges.name &&
              data.slug === selectedChanges.slug &&
              data.parent_id === selectedChanges.parent_id
            }
            onClick={() => onSaveChanges(selectedChanges)}
          >
            <Edit />
            Save Changes
          </Button>
          <Button
            variant="outline"
            onClick={onAddChild}
          >
            <Plus />
            Add Child
          </Button>
          <Button
            variant="outline"
            onClick={onViewProducts}
          >
            <Eye />
            View All Products
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}