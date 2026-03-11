import { Input } from "@/components/ui/input";
import { Image, Trash, UploadCloud, } from "lucide-react";
import { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export type ImageState = "keep" | "remove" | "new";

export default function ImageUploader({
  value,
  onChange,
  className = "w-full h-80 rounded-lg border object-contain",
  label = "Upload Image",
  description = "Upload a cover image for this item.",
}: {
  value?: string;
  onChange: (file: File | null, imageState: ImageState) => void;
  className?: string;
  label?: string;
  description?: string;
}) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSelect = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(file, "new");
  };

  const handleRemoveImage = () => {
    setPreview("");
    onChange?.(null, "remove");
  };

  return (
    <>
      {!preview ? (
        <div onClick={handleSelect} className="flex flex-col justify-center items-center w-full h-80 bg-input rounded-lg border text-muted-foreground/70 cursor-pointer">
          <Image className="w-14 h-14 mb-6 text-primary" />
          <div className="flex gap-3 mb-3 font-medium text-primary/80">
            <UploadCloud />
            <span>Upload Image</span>
          </div>
          <p className="text-sm mb-1">{description}</p>
          <div className="text-xs">
            <span>File Format</span>
            <span className="font-semibold"> jpeg, png </span>
            <span>Recommened Size</span>
            <span className="font-semibold"> 600x600 (1:1)</span>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className={className}
          />
          <div className="absolute top-3 right-3 flex gap-1">
            <Button
              onClick={handleSelect}
              className="w-8 h-8"
            >
              <UploadCloud size={14} />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="w-8 h-8"
            >
              <Trash size={14} />
            </Button>
          </div>
        </div>
      )}

      <Input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileRef}
        onChange={handleFileChange}
      />

      {label && <Label className="text-muted-foreground text-md">{label}</Label>}
    </>
  );
}