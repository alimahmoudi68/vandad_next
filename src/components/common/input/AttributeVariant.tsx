import React from 'react';

import SimpleInputPriceWithLabel from './SimpleInputPriceWithLabel'
import SimpleInputNumberWithLabel from './SimpleInputNumberWithLabel';


interface Config {
    isSort?: boolean;
    options: { id: string | number; title: string }[];
    classes?: string;
    label?: string;
    noSearch?: boolean
}

interface AttributeVariantProps {
    config: Config;
    change: ({ key, value }: { key: string, value: string }) => void;
    value: {
        attributes : Record<string, any> ,
        price : number ,
        sku : string ,
        stock : number , 
    };
    value2: {
        price : number ,
        stock : number ,
        sku : string 
    };
    errs?: {
        price : string ,
        sku: string ,
        stock: string
    };
}

const AttributeVariant: React.FC<AttributeVariantProps> = ({ value, value2, change, config, errs }) => {

    console.log('errs?' , errs)
    // console.log('config' , config)

    const changeHanlder = (value: string , key: string)=>{
        change({key , value})
    }

    return (
        <div className={`${config.classes} flex flex-col justify-start items-center my-5 gap-x-2 border-2 border-dotted p-3 rounded-md`}>

            <span className='text-[0.8rem] min-[500px]:text-[1rem]'>
                <span className='ml-2'>متغیر:</span>
                {config.label} 
            </span>
            <SimpleInputPriceWithLabel
                classes='w-full' 
                config = {{
                    label : 'قیمت',
                    name : 'price'
                }}
                change = {(e)=>changeHanlder(e.target.value ,  "price")}
                value = {String(value.price)}
                value2 = {String(value2.price)}
                errorMsg = {errs?.price}
            />

            <SimpleInputNumberWithLabel
              classes='w-full' 
              config = {{
                  label : 'شناسه کالا',
                  name : 'sku'
              }}
              change = {(e)=>changeHanlder(e.target.value ,  "sku")}
              value = {value.sku}
              value2 = {value2.sku}
              errorMsg = {errs?.sku}
            />


            <SimpleInputNumberWithLabel
              classes='w-full' 
              config = {{
                  label : 'موجودی',
                  name : 'stock'
              }}
              change = {(e)=>changeHanlder(e.target.value ,  "stock")}
              value = {String(value.stock)}
              value2 = {String(value2.stock)}
              errorMsg = {errs?.stock}
            /> 
 
        </div>
    
    )
}

export default AttributeVariant;