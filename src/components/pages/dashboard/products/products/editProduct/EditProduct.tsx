"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import Card from "@/components/common/card/Card";
import { editProduct } from "@/services/dashboard/products/productsService";
import Form from "@/components/common/form/Form";
import { handleServerError } from "@/utils/common/handleServerError";
import { INewProduct } from "@/types/products";
import { childCategories } from "@/services/dashboard/products/categoriesService";
import { singleProduct } from "@/services/dashboard/products/productsService";
import { IProductCat } from "@/types/products/index";
import SkeletonLoading from "@/components/common/skeletonLoading/SkeletonLoading";


interface EditProductPageProps {
  id: string
}

interface FormItem {
  inputType: string;
  config: {
    name: string;
    label: string;
    classes?: string;
    [key: string]: any;
    removeFromServer?: boolean;
  };
  value: any;
  value2?: any;
  validation: Record<string, any>;
  valid: boolean;
  errorMsg: string;
  used: boolean;
}

interface IForm {
  formItems: FormItem[];
}

export default function EditProductPage({id}: EditProductPageProps) {

  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [form, setForm] = useState<IForm>({ formItems: [] });


  useEffect(() => {
    const getProduct = async () => {
      const [productData, categoriesData] = await Promise.all([
        singleProduct(id),
        childCategories(),
      ]);

      setLoading(false);

      console.log('productData' , productData)
      console.log('categoriesData' , categoriesData)

      if (
        productData.status === "success" &&
        categoriesData.status === "success"
      ) {
        setForm({
          formItems: [
            {
              inputType: "simple-input-with-label",
              config: {
                label: "عنوان",
                name: "title",
                classes: "w-full",
              },
              value: productData.product.title,
              validation: {
                required: true,
                maxLength: 50,
              },
              valid: false,
              errorMsg: "",
              used: false,
            },
            {
              inputType: "simple-input-price-with-label",
              config: {
                label: "قیمت فروش",
                name: "price",
                type: "text",
                placeholder: "",
                classes: "w-full",
              },
              value: productData.product.price ? productData.product.price : "",
              value2: productData.product.price ? productData.product.price.toLocaleString() : "",
              validation: {
                required: true,
              },
              valid: false,
              errorMsg: "",
              used: false,
            },
            {
              inputType: "checkbox",
              config: {
                label: "تخفیف",
                name: "discount",
                classes: "w-full",
              },
              value: productData.product.discount,
              validation: {},
              valid: false,
              errorMsg: "",
              used: false,
            },
            {
              inputType: "simple-input-price-with-label",
              config: {
                label: "قیمت با تخفیف",
                name: "discountPrice",
                classes: "w-full",
                isDepend: true,
                isDependField: "discount",
                isDependValue: [true],
              },
              value: productData.product.discountPrice,
              value2: productData.product.discountPrice,
              validation: {},
              valid: false,
              errorMsg: "",
              used: false,
            },
            {
              inputType: "select-with-label",
              config: {
                label: "دسته بندی",
                name: "categories",
                classes: "w-full",
                options: categoriesData?.categories?.map((item: IProductCat) => ({
                  id: item.id,
                  title: item.title,
                })) || [],
                showAttributes: true,
              },
              value: [productData.product.categories[0].id],
              validation: {
                required: true,
              },
              valid: false,
              errorMsg: "",
              used: false,
            },
            {
              inputType: "textarea",
              config: {
                label: "توضیحات",
                name: "description",
                classes: "w-full",
              },
              value: productData.product.description,
              validation: {
                required: true,
                maxLength: 2000,
              },
              valid: false,
              errorMsg: "",
              used: false,
            },
            {
              inputType: "simple-input-with-label",
              config: {
                label: "شناسه کالا",
                name: "sku",
                classes: "w-full",
              },
              value: productData.product.sku,
              validation: {},
              valid: false,
              errorMsg: "",
              used: false,
            },
            {
              inputType: "simple-input-number-with-label",
              config: {
                label: "موجودی",
                name: "stock",
                classes: "w-full",
              },
              value: productData.product.stock,
              validation: {
                required: true,
              },
              valid: false,
              errorMsg: "",
              used: false,
            },
            {
              inputType: "file",
              config: {
                label: "عکس شاخص",
                name: "thumbnail",
                classes: "w-full",
                removeFromServer: false,
                isSingle: true,
              },
              value: [
                {
                  id: 0,
                  uploadedId: productData.product.thumbnail ? productData.product.thumbnail.id : null,
                  errorMsg: "",
                  fileUrl: productData.product.thumbnail
                    ? {
                        bucketName: productData.product.thumbnail.bucket,
                        fileName: productData.product.thumbnail.location,
                      }
                    : null,
                },
              ],
              validation: {},
              valid: false,
              errorMsg: "",
              used: false,
            },
            {
              inputType: "file",
              config: {
                label: "گالری عکس",
                name: "images",
                classes: "w-full",
                removeFromServer: false,
              },
              // value: [{
              //   id: 0,
              //   uploadedId: null,
              //   errorMsg: "",
              //   fileUrl: null,
              // }],
              value: productData.product.images.length > 0
                ? productData.product.images.map(
                    (item: {
                      id: number;
                      bucket: string;
                      location: string;
                      thumb: string;
                    }) => ({
                      id: item.id,
                      uploadedId: item.id,
                      errorMsg: "",
                      fileUrl: { bucketName: item.bucket, fileName: item.location },
                    })
                  )
                : [
                    {
                      id: 0,
                      uploadedId: null,
                      errorMsg: "",
                      fileUrl: null,
                    },
                  ],
              validation: {},
              valid: false,
              errorMsg: "",
              used: false,
            },

          ],
        });
      } else {
        // اگر خطا بود، پیام خطا نمایش بده یا هندل کن
      }

      setLoading(false);
    };
    getProduct();
  }, []);



  const submitHandler = async (form: INewProduct) => {
    setLoadingBtn(true);

    try {
      const {
        title,
        slug,
        description,
        isVariant,
        price,
        discount,
        discountPrice,
        thumbnail,
        images,
        stock,
        sku,
        categories,
        variants,
        ...rest
      } = form;

      const payload = {
        title,
        slug,
        description,
        price,
        discount,
        discountPrice,
        thumbnail: thumbnail[0],
        images,
        stock,
        sku,
        categories,
      };

      //console.log(payload);

      const data = await editProduct(id, payload);

      if (data.status === "success") {
        toast.success("محصول با موفقیت ویرایش شد");
        router.push("/admin-dashboard/products");
      } else {
        handleServerError({
          ...data,
          msg: data.msg ?? "خطایی رخ داده است.",
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(
        err instanceof Error
          ? err.message
          : "متاسفانه خطایی پیش آمد لطفا بعدا تلاش کنید"
      );
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div className="container mx-auto p-3">
      <h1 className="text-gray-700 dark:text-white text-2xl font-extrabold mb-10">
        ویرایش محصول
      </h1>
      <Card title="" classes="w-[90%] max-w-[600px] mx-auto">
        {
          loading ? 
            (
              <SkeletonLoading rows={10} cols={1} itemClasses={"h-[60px]"} />
            )
            :
            (
          <Form
            initForm={form}
            submit={submitHandler}
            loading={loadingBtn}
            submitTitle="ثبت"
          />
          )
        }
      </Card>
    </div>
  );
}
