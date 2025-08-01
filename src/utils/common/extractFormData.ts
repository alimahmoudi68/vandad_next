type FormItem = {
    config: {
        name: string;
    };
    value: string;
    [key: string]: any; // بقیه کلیدهای اضافی که ممکنه وجود داشته باشه
};

type DealTypeSaleForm = {
    formItems: FormItem[];
};


const extractFormData = (dealTypeSaleForm: DealTypeSaleForm): Record<string, string> => {
    let objOut: Record<string, string> = {};

    dealTypeSaleForm.formItems.map(item => {
        objOut[item.config.name] = item.value;
    });

    return objOut;
};

export default extractFormData;
