"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IAddEditProduct, IFetchedBrand, IFetchedCategory, IFetchedSkinType, IFetchedTag, } from "@/interfaces/product.interface";
import ProductForm from "../shared/ProductForm";
import brandApi from "@/lib/api/brand.api";
import categoryApi from "@/lib/api/category.api";
import productApi from "@/lib/api/product.api";
import { ImageState } from "@/components/layout/ImageUploader";
import skinTypeApi from "@/lib/api/skinType.api";
import tagApi from "@/lib/api/tag.api";

export default function NewProductPage() {
  const router = useRouter();
  const [categoryList, setCategoryList] = useState<IFetchedCategory[]>([]);
  const [brandList, setBrandList] = useState<IFetchedBrand[]>([]);
  const [skinTypeList, setSkinTypeList] = useState<IFetchedSkinType[]>([]);
  const [tagList, setTagList] = useState<IFetchedTag[]>([]);
  const [loading, setLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const fetchAllBrands = async () => {
    try {
      const res = await brandApi.fetchAllBrands();
      setBrandList(res);
    } catch (error) {
      console.error("Fetch brands failed:", error);
    } finally {

    }
  };
  const fetchAllCategories = async () => {
    try {
      const res = await categoryApi.fetchAllCategories();
      setCategoryList(res);
    } catch (error) {
      console.error("Fetch categories failed:", error);
    } finally {

    }
  };
  const fetchAllSkinTypes = async () => {
    try {
      const res = await skinTypeApi.fetchAllSkinTypes();
      setSkinTypeList(res);
    } catch (error) {
      console.error("Fetch skin types failed:", error);
    } finally {

    }
  };
  const fetchAllTags = async () => {
    try {
      const res = await tagApi.fetchAllTags();
      setTagList(res);
    } catch (error) {
      console.error("Fetch tags failed:", error);
    } finally {

    }
  };

  useEffect(() => {
    fetchAllBrands();
    fetchAllCategories();
    fetchAllSkinTypes();
    fetchAllTags();

  }, []);

  const handleSaveAndUnpublish = async (createData: IAddEditProduct, file: File | null, imageState: ImageState) => {
    setLoading(true)

    try {
      const res = await productApi.createProduct({
        ...createData,
        category_id: createData.category._id,
        brand_id: createData.brand._id,
        status: "unpublished",
        image: file,
      })

      router.replace(`./${res._id}`)
    } catch (error) {
      console.error("Save product failed:", error);
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAndPublish = async (createData: IAddEditProduct, file: File | null, imageState: ImageState) => {
    setLoading(true)
    
    try {
      const res = await productApi.createProduct({
        ...createData,
        category_id: createData.category._id,
        brand_id: createData.brand._id,
        status: "published",
        image: file,
      });

      router.replace(`./${res._id}`);
    } catch (error) {
      console.error("Save product failed:", error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <ProductForm
      mode="create"
      loading={loading}
      onSaveAndUnpublish={(data, file, state) => { handleSaveAndUnpublish(data, file, state) }}
      onSaveAndPublish={(data, file, state) => { handleSaveAndPublish(data, file, state) }}
      categoryList={categoryList}
      brandList={brandList}
      skinTypeList={skinTypeList}
      tagList={tagList}
    />
  );
}