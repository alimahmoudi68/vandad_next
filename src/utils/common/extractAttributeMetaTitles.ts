import {IProductVariantsApi} from "@/types/products";


// تابع استخراج رشته
function extractAttributeMetaTitles(variant: IProductVariantsApi): {
    label: string ,
    attributes : any
} {

    const label =  (variant.attributes || [])
      .map((attr) => attr.attributeMeta.title) // استخراج title از attributeMeta
      .join(','); // اتصال همه عنوان‌ها با ","


    const attributes: Record<string, string> = {};

    (variant.attributes || []).forEach(attr => {
        attributes[attr.attribute.slug] = String(attr.attributeMeta.id);
    });

    
    return {
        label,
        attributes
    }

  }


export default extractAttributeMetaTitles;


// const input: ProductVariant = {
//     _id: "68666a5e9b94ee791ed6efc3",
//     price: 1,
//     stock: 1,
//     attributes: [
//       {
//         attribute: {
//           _id: "6807643ff871df0ce2c3a6a1",
//           title: "مشخصات تاچ پد",
//           slug: "touchPad",
//           isDynamic: false,
//           createdAt: "2025-04-22T09:41:19.183Z",
//           updatedAt: "2025-05-13T07:59:56.421Z"
//         },
//         attributeMeta: {
//           _id: "6822f38d437c593be04b2e1a",
//           title: "دارد",
//           slug: "yes",
//           attribute: "6807643ff871df0ce2c3a6a1",
//           createdAt: "2025-05-13T07:23:57.478Z",
//           updatedAt: "2025-06-18T11:54:38.888Z"
//         }
//       },
//       {
//         attribute: {
//           _id: "67d7fde38a3a8fb90e6fc60d",
//           title: "رنگ",
//           slug: "color",
//           isDynamic: false,
//           createdAt: "2025-03-17T10:48:03.301Z",
//           updatedAt: "2025-04-20T13:59:56.275Z"
//         },
//         attributeMeta: {
//           _id: "6822e5cf437c593be04b2ddc",
//           title: "آبی",
//           slug: "blue",
//           attribute: "67d7fde38a3a8fb90e6fc60d",
//           createdAt: "2025-05-13T06:25:19.848Z",
//           updatedAt: "2025-05-13T06:25:19.848Z"
//         }
//       }
//     ]
//   };
  
//   // اجرای تابع
//   const result = extractAttributeMetaTitles(input);
//   console.log(result); // خروجی: "دارد,آبی"
  