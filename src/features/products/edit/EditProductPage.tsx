"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IAddEditProduct, IFetchedBrand, IFetchedCategory, IFetchedSkinType, IFetchedTag, } from "@/interfaces/product.interface";
import ProductForm from "../shared/ProductForm";
import brandApi from "@/lib/api/brand.api";
import categoryApi from "@/lib/api/category.api";
import productApi from "@/lib/api/product.api";
import { Spinner } from "@/components/ui/spinner";
import { ImageState } from "@/components/layout/ImageUploader";
import skinTypeApi from "@/lib/api/skinType.api";
import tagApi from "@/lib/api/tag.api";

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IAddEditProduct>();
  const [categoryList, setCategoryList] = useState<IFetchedCategory[]>([]);
  const [brandList, setBrandList] = useState<IFetchedBrand[]>([]);
    const [skinTypeList, setSkinTypeList] = useState<IFetchedSkinType[]>([]);
    const [tagList, setTagList] = useState<IFetchedTag[]>([]);
  const [loading, setLoading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const res = await productApi.fetchProductById(id);
      setData({
        ...res,
        skinTypeIds: res.skinTypes.map(item => item._id),
        tagIds: res.tags.map(item => item._id),
      });
      console.log(res)
    } catch (error) {
      console.error("Fetch product failed:", error);
    } finally {
      setLoading(false)
    }
  };

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
    fetchProduct();
    fetchAllBrands();
    fetchAllCategories();
    fetchAllSkinTypes();
    fetchAllTags();

  }, []);

  const handleSaveAndUnpublish = async (updateData: IAddEditProduct, file: File | null, imageState: ImageState) => {
    setLoading(true)

    try {
      const payload: any = {
        ...updateData,
        category_id: updateData.category._id,
        brand_id: updateData.brand._id,
        status: "unpublished",
      }

      if (imageState === "new") {
        payload.image = file
      }

      if (imageState === "remove") {
        payload.image = null
      }

      const res = await productApi.updateProduct(id, payload)

      router.replace(`../${res._id}`)
    } catch (error) {
      console.error("Save product failed:", error);
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAndPublish = async (updateData: IAddEditProduct, file: File | null, imageState: ImageState) => {
    setLoading(true)

    try {
      const payload: any = {
        ...updateData,
        category_id: updateData.category._id,
        brand_id: updateData.brand._id,
        status: "published",
      }

      if (imageState === "new") {
        payload.image = file
      }

      if (imageState === "remove") {
        payload.image = null
      }

      const res = await productApi.updateProduct(id, payload)

      router.replace(`../${res._id}`);
    } catch (error) {
      console.error("Save product failed:", error);
    } finally {
      setLoading(false)
    }
  };

  if (loading) return (
    <div className="h-full flex justify-center items-center">
      <Spinner className="size-12" />
    </div>
  )
  return (
    <ProductForm
      mode="edit"
      loading={loading}
      initialData={data}
      onSaveAndUnpublish={(data, file, state) => { handleSaveAndUnpublish(data, file, state) }}
      onSaveAndPublish={(data, file, state) => { handleSaveAndPublish(data, file, state) }}
      categoryList={categoryList}
      brandList={brandList}
      skinTypeList={skinTypeList}
      tagList={tagList}
    />
  );
}