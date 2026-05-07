import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader, { ImageState } from "@/components/layout/ImageUploader";
import { IAddEditProduct, IFetchedBrand, IFetchedCategory, IFetchedSkinType, IFetchedTag } from "@/interfaces/product.interface";
import Combobox from "../Combobox";
import MultiSelectCombobox from "../MultiSelectCombobox";
import { ChevronDown, ChevronUp, CircleX } from "lucide-react";

const NullProduct: IAddEditProduct = {
  sku: "",
  name: "",
  category: { _id: "", name: "" },
  brand: { _id: "", name: "" },
  skinTypeIds: [],
  tagIds: [],
  selling_price: 0,
  description: "",
  image: "",
  status: "",
};

export function generateSKU(category: string, brand: string) {
  // Chuẩn hóa: bỏ dấu, chuyển uppercase
  const normalize = (str: string) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]/g, "")
      .toUpperCase();

  // Lấy 3 chữ cái đầu của category và brand
  const cat = normalize(category).slice(0, 3) || "CAT";
  const brd = normalize(brand).slice(0, 3) || "BRD";

  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");

  const timestamp =
    now.getFullYear().toString().slice(2) +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds());

  return `${cat}-${brd}-${timestamp}`;
}

interface ProductFormProps {
  mode: "create" | "edit";
  loading?: boolean;
  initialData?: IAddEditProduct;
  onSaveAndUnpublish: (data: IAddEditProduct, file: File | null, imageState: ImageState) => void;
  onSaveAndPublish: (data: IAddEditProduct, file: File | null, imageState: ImageState) => void;
  categoryList: IFetchedCategory[];
  brandList: IFetchedBrand[];
  skinTypeList: IFetchedSkinType[];
  tagList: IFetchedTag[];
}

export default function ProductForm({
  mode,
  loading = false,
  initialData,
  onSaveAndUnpublish,
  onSaveAndPublish,
  categoryList,
  brandList,
  skinTypeList,
  tagList,
}: ProductFormProps) {
  const [data, setData] = useState(initialData ?? NullProduct);
  const [file, setFile] = useState<File | null>(null);
  const [imageState, setImageState] = useState<ImageState>("keep");

  const [skinTypeShow, setSkinTypeShow] = useState(false);
  const [selectedSkinTypeIds, setSelectedSkinTypeIds] = useState<string[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const selectedTags = tagList.filter(item => selectedTagIds.includes(item._id));

  const handleGenerate = () => {
    if (data.category._id === "" || data.brand._id === "") return;
    setData((prev) => ({ ...prev, sku: generateSKU(data.category.name, data.brand.name) }));
    console.log(file)
  }

  useEffect(() => {
    if (initialData) {
      setData(initialData)
      setSelectedSkinTypeIds(initialData.skinTypeIds)
      setSelectedTagIds(initialData.tagIds)
    }
  }, [initialData])

  useEffect(() => {
    setData({ ...data, skinTypeIds: selectedSkinTypeIds })
  }, [selectedSkinTypeIds])

  useEffect(() => {
    setData({ ...data, tagIds: selectedTagIds })
  }, [selectedTagIds])

  return (
    <div className="h-full flex flex-col px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {mode === "create" ? "New Product Item" : "Edit Product"}
        </h1>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            disabled={loading || !data.name || !data.brand._id || !data.category._id || data.selling_price <= 0}
            onClick={() => onSaveAndUnpublish(data, file, imageState)}
          >
            Save & Unpublish
          </Button>
          <Button
            disabled={loading || !data.name || !data.brand._id || !data.category._id || data.selling_price <= 0}
            onClick={() => onSaveAndPublish(data, file, imageState)}
          >
            Save & Publish
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-2">
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <Label
                  htmlFor="product-name"
                  className={`transition-all text-muted-foreground
                    ${data.name.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Product Name
                </Label>
                <Textarea
                  id="product-name"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Product Name"
                  className="h-12"
                />
              </div>

              <div>
                <Label
                  htmlFor="product-category"
                  className={`transition-all text-muted-foreground
                    ${data.category._id.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Category
                </Label>

                <Combobox
                  items={categoryList}
                  selectedValue={data.category._id}
                  onChange={(value) => {
                    const newCategory = categoryList.find(item => item._id === value);
                    if (newCategory) setData({ ...data, category: newCategory });
                  }}
                  getLabel={(c) => c.name}
                  getValue={(c) => c._id}
                  placeholder="Select Product Category"
                  emptyText="No category found."
                  variant="input"
                />
              </div>

              <div>
                <Label
                  htmlFor="product-brand"
                  className={`transition-all text-muted-foreground
                    ${data.brand._id.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Brand
                </Label>
                <Combobox
                  items={brandList}
                  selectedValue={data.brand._id}
                  onChange={(value) => {
                    const newBrand = brandList.find(item => item._id === value);
                    if (newBrand) setData({ ...data, brand: newBrand });
                  }}
                  getLabel={(c) => c.name}
                  getValue={(c) => c._id}
                  placeholder="Select Brand"
                  emptyText="No brand found."
                  variant="input"
                />
              </div>

              <div>
                <Label
                  htmlFor="product-sku"
                  className={`transition-all text-muted-foreground
                    ${!data.sku ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Product SKU
                </Label>
                <Input
                  id="product-sku"
                  value={data.sku}
                  onChange={(e) => setData({ ...data, sku: e.target.value })}
                  placeholder="Auto-generate Product SKU or Custom"
                  className="h-12"
                />
                <Button
                  className="w-full my-2"
                  onClick={() => handleGenerate()}
                >
                  Generate
                </Button>
                <p className="text-xs text-muted-foreground ml-2">
                  * Select category and brand to generate
                </p>
                <p className="text-xs text-muted-foreground ml-2">
                  * Leave blank to auto-generate on save
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Collapsible open={skinTypeShow} onOpenChange={setSkinTypeShow}>
                <div className="flex flex-row w-full items-center justify-between mb-2">
                  <Label
                    htmlFor="product-skin-types"
                    className="text-muted-foreground"
                  >
                    Skin Types
                  </Label>
                  <CollapsibleTrigger>
                    {skinTypeShow ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent>
                  {skinTypeList.map((item) => {
                    const isChecked = selectedSkinTypeIds.includes(item._id);
                    return (
                      <div key={item._id} className="flex flex-row items-center gap-4 mb-1">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={(value) => {
                            if (value)
                              setSelectedSkinTypeIds((prev) => [...prev, item._id])
                            else
                              setSelectedSkinTypeIds(selectedSkinTypeIds.filter(id => id !== item._id))
                          }}
                        />
                        <p className="text-sm">
                          {item.name}
                        </p>
                      </div>
                    )
                  })}
                </CollapsibleContent>
              </Collapsible>

              <div>
                <div className="flex flex-row w-full items-center justify-between mb-4">
                  <Label
                    htmlFor="product-tags"
                    className={`transition-all text-muted-foreground`}
                  >
                    Tags
                  </Label>
                  <MultiSelectCombobox
                    items={tagList}
                    selectedValueList={selectedTagIds}
                    onSelectValue={(value) => {
                      if (!selectedTagIds.includes(value))
                        setSelectedTagIds((prev) => [...prev, value])
                      else setSelectedTagIds(selectedTagIds.filter(id => id !== value))
                    }}
                    getLabel={(c) => c.name}
                    getValue={(c) => c._id}
                    emptyText="No tag found."
                  />
                </div>
                <div className="flex flex-row flex-wrap gap-2">
                  {selectedTags.map(item => (
                    <div key={item._id} className="relative px-2 py-1 bg-secondary rounded-lg border">
                      <p className="text-xs text-primary">{item.name}</p>
                      <CircleX
                        size={14}
                        className="absolute top-[-4] right-[-4] text-primary"
                        onClick={() => setSelectedTagIds(selectedTagIds.filter(id => id !== item._id))}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label
                  htmlFor="product-description"
                  className={`transition-all text-muted-foreground
                    ${data.description.trim() === "" ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Description
                </Label>
                <Textarea
                  id="product-description"
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  placeholder="Product Description"
                />
              </div>

              <div>
                <Label
                  htmlFor="product-selling-price"
                  className={`transition-all text-muted-foreground
                    ${data.selling_price === 0 ? "opacity-0 h-0 -translate-y-2" : "opacity-100 mb-2"}
                  `}
                >
                  Selling Prices
                </Label>
                <Input
                  id="product-selling-price"
                  type="number"
                  value={data.selling_price}
                  onChange={(e) => setData({ ...data, selling_price: Number(e.target.value) })}
                  placeholder="Selling Price"
                  className="h-12"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-4">
            <ImageUploader
              value={data.image}
              onChange={(value, state) => {
                setFile(value);
                setImageState(state);
              }}
              className="w-full h-80 rounded-lg border object-contain"
              label="Product Image Cover"
              description="Upload a cover image for your product."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
