import React from 'react';

import SimpleInputPriceWithLabel from './SimpleInputPriceWithLabel'
import SimpleInputNumberWithLabel from './SimpleInputNumberWithLabel';
import SimpleInputWithLabel from './SimpleInputWithLabel';
import File from './File';

interface Config {
    isSort?: boolean;
    options: { id: string | number; title: string }[];
    classes?: string;
    label?: string;
    noSearch?: boolean
}

interface Uploader {
    id: number ;
    file: File | null;
    fileUrl: { bucketName: string; fileName: string } | null;
    uploadedId: string | null;
    errorMsg: string;
    temp?: boolean;
}

interface AttributeVariantProps {
    config: Config;
    change: ({ key, value }: { key: string, value: string | Uploader[] | any }) => void;
    value: {
        attributes : Record<string, any> ,
        price : number ,
        discountPrice : number ,
        sku : string ,
        stock : number ,
        images?: []
    };
    value2: {
        price : number ,
        discountPrice : number ,
        stock : number ,
        sku : string ,
    };
    errs?: {
        price : string ,
        discountPrice : string ,
        sku: string ,
        stock: string,
    };
}

const AttributeVariant: React.FC<AttributeVariantProps> = ({ value, value2, change, config, errs }) => {

    //console.log('errs?' , errs)
    // console.log('config' , config)

    const changeHanlder = (value: string , key: string)=>{
        change({key , value})
    }

    const fileChangeHandler = (arg: { 
        type: string;
        uploadInfo?: { 
            id: string | number;
            file?: string | null; 
            uploadedId?: string | null; 
            fileUrl?: { bucketName: string; fileName: string } | null;
            errorMsg?: string;
        };
    }) => {
        if (arg.type === 'addFile' && arg.uploadInfo) {

            change({ key: arg.type, value: arg.uploadInfo });
        }

        if(arg.type === 'removeFile' && arg.uploadInfo){
            change({ key: arg.type, value: arg.uploadInfo });
        }

        if(arg.type === 'uploadFile' && arg.uploadInfo){
            change({ key: arg.type, value: arg.uploadInfo });
        }
    }

    return (
        <div className={`${config.classes} flex flex-col justify-start items-center my-5 gap-x-2 border-2 border-dotted p-3 rounded-md`}>

            <span className='text-[0.8rem] min-[500px]:text-[1rem]'>
                <span className='ml-2'>متغیر:</span>
                {config.label} 
            </span>
            <SimpleInputPriceWithLabel
                classes='w-full mb-2' 
                config = {{
                    label : 'قیمت',
                    name : 'price'
                }}
                change = {(e)=>changeHanlder(e.target.value ,  "price")}
                value = {String(value.price)}
                value2 = {String(value2.price)}
                errorMsg = {errs?.price}
            />

            <SimpleInputPriceWithLabel
                classes='w-full mb-2' 
                config = {{
                    label : 'قیمت با تخفیف',
                    name : 'discountPrice'
                }}
                change = {(e)=>changeHanlder(e.target.value ,  "discountPrice")}
                value = {String(value.discountPrice)}
                value2 = {String(value2.discountPrice)}
                errorMsg = {errs?.discountPrice}
            />

            <SimpleInputWithLabel
              classes='w-full mb-2' 
              config = {{
                  label : 'شناسه کالا',
                  name : 'sku'
              }}
              change = {(e)=>changeHanlder(e.target.value ,  "sku")}
              value = {value.sku}
              errorMsg = {errs?.sku}
            />


            <SimpleInputNumberWithLabel
              classes='w-full mb-2' 
              config = {{
                  label : 'موجودی',
                  name : 'stock'
              }}
              change = {(e)=>changeHanlder(e.target.value ,  "stock")}
              value = {String(value.stock)}
              value2 = {String(value2.stock)}
              errorMsg = {errs?.stock}
            /> 

            <File
              config={{
                label: 'تصاویر محصول',
                name: 'files',
                classes: 'w-full',
                isSingle: false,
                removeFromServer: true,
                inSidebar: true,
              }}
              change={fileChangeHandler}
              validation={{}}
              errorMsg=''
              value={value.images || []}
            />
 
        </div>
    
    )
}

export default AttributeVariant;