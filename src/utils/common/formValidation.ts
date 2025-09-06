import {convertPersianToEnglishNumbers} from '@/utils/common/convertNumber2English';


type FormElement = {
    inputType: string;
    value: any;
    value2?: any;
    valid: boolean;
    used: boolean;
    config: {
        options?: {id: string , title : string}[],
        showAttributes?: boolean,
        isDynamic?: boolean,
        isDepend?: boolean,
        isDependField?: string,
        isDependValue?: any[],
        name: string;
        label: string,
        classes?: string,
        justShow?: boolean;
        isAttribute?: boolean;
        isAttributeSelect?: boolean;
        isAttributeVariant?: boolean
    },
    validation: Record<string, any>;
    errorMsg?: string
    errs?: {
        price: string,
        stock: string;
        sku: string
    };
}

type uploadInfo = {
    id: string | number;
    fileUrl?: { bucketName: string; fileName: string } | null;
    uploadedId?: string | null;
    errorMsg?: string;
}

type EventData = {
    addRole?: boolean;
    removeRole?: boolean;
    removeIndex?: number;
    fieldName?: string;
    data?: {
        type?: string;
        unitPrice?: number;
        id?: string;
      };
    uploadInfo?: uploadInfo;
    value?: any;
    indexRole?: number;
    event: {
        target: {
          value: string;
        };
    };
    addCustomer?: boolean;
    customer?: {
        fullname: string;
        mobile: string;
        landline: string;
    };
    customerIndex?: number;
    target?: {
        value: string;
    };
    key?: string;

};

type checkValidationT = {
    valid: boolean;
    msg: string ;
}


type IFAQ = {
    type?: string;
    indexItem?: number;
    fieldName?: string;
    event?: React.ChangeEvent<HTMLInputElement>;
}

export const inputChange = (
    e: EventData | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>  | IFAQ,
    element: number,
    formItems: FormElement[]
  ): { formItems: FormElement[] } => {


    let updatedForm = [...formItems];
    let updetedElement = { ...updatedForm[element] };

    if(updetedElement.inputType == 'attribute-variant'){
        let { key, value : valueInit } = e as EventData;
        
        // console.log('key', key);
        // console.log('value', valueInit);

        if (key === 'price') {

            let val = valueInit ; 
            let value = convertPersianToEnglishNumbers(val).replaceAll(',', ''); 
            let re = new RegExp(/^\d+$/gi);
            let regexResult = re.test(value);
    
    
            if(regexResult || value == ''){
                updetedElement.value.price = value ;
                updetedElement.value2.price = value !== '' ? Number(value).toLocaleString() : value;

                if(updetedElement.errs) {
                    updetedElement.errs.price = checkValidation(updetedElement.value.price,  {required : true} ).msg;
                }
            }
            
            
        } else if (key === 'sku') {
          
            updetedElement.value.sku = valueInit ;
            if(updetedElement.errs) {
            updetedElement.errs.sku = checkValidation(updetedElement.value.sku,  {required : true} ).msg;
            }
            
        } else if (key === 'stock') {

            let val = valueInit ; 
            let value = convertPersianToEnglishNumbers(val).replaceAll(',', ''); 
            let re = new RegExp(/^\d+$/gi);
            let regexResult = re.test(value);
    
    
            if(regexResult || value == ''){
                updetedElement.value.stock = value ;
                updetedElement.value2.stock = value !== '' ? Number(value).toLocaleString() : value;

                if(updetedElement.errs) {
                    updetedElement.errs.stock = checkValidation(updetedElement.value.stock,  {required : true} ).msg;
                }
            }
        }


        // check validation
        let validationPrice = checkValidation(updetedElement.value.price , {required : true} ).valid;
        let validationStock = checkValidation(updetedElement.value.stock , {required : true} ).valid;
        let validationSku = checkValidation(updetedElement.value.sku , {required : true} ).valid;


        updetedElement.valid = validationPrice && validationStock && validationSku;
        updetedElement.used = true;
        updatedForm[element] = updetedElement;


    }if(updetedElement.inputType == 'input-price'){

        let event, data;
        if ('event' in e && 'data' in e) {
            ({ event, data } = e);
        }
        let type = data?.type;

        if(type == 'change_input' ){

            let value = event?.target?.value || '';
            let unitPrice = Number(data?.unitPrice || 0)
            let re = new RegExp(/^\d+$/gi);
            let regexResult = re.test(value);
    

            if(regexResult || value == ""){
                
                updetedElement.value = Number(Number(value) * unitPrice) ;
                updetedElement.value2 = value ;
                updetedElement.valid = checkValidation(updetedElement.value , updetedElement.validation ).valid;
                const errorMsg = checkValidation(updetedElement.value, updetedElement.validation).msg;
                updetedElement.errorMsg = errorMsg;
                updetedElement.used = true;
                updatedForm[element] = updetedElement;
        
            }
            

        }else if(type == 'change_unit'){

            let unitPrice = data?.unitPrice || 0;
            let oldValue = updetedElement.value2;

            updetedElement.value = oldValue * unitPrice ;
            updetedElement.valid = checkValidation(updetedElement.value , updetedElement.validation ).valid;
            const errorMsg = checkValidation(updetedElement.value, updetedElement.validation).msg;
            updetedElement.errorMsg = errorMsg;
            updetedElement.used = true;
            updatedForm[element] = updetedElement;
        }
      
    }else if(updetedElement.inputType == 'select-multi'){

        let data;
        if ('data' in e) {
            data = e.data;
        }
        let type = data?.type;
        let id = data?.id;

        if(type == 'add'){
            let oldValue = [...updetedElement.value];
            oldValue.push(id);
            updetedElement.value = oldValue ;

        }else if(type == 'remove'){

            let oldValue = [...updetedElement.value];
            let newValue = oldValue.filter(item=>item !==id)
            updetedElement.value = newValue ;

        }

        updetedElement.valid = checkValidation(updetedElement.value , updetedElement.validation ).valid;
        const errorMsg = checkValidation(updetedElement.value, updetedElement.validation).msg;
        updetedElement.errorMsg =  errorMsg ;
        updetedElement.used = true;
        updatedForm[element] = updetedElement;

    }else if(updetedElement.inputType == 'select' || updetedElement.inputType == 'select-with-label'){
        let data;
        if ('data' in e) {
            data = e.data;
        }
        let id = data?.id;

        updetedElement.value = id ;
        updetedElement.valid = checkValidation(updetedElement.value , updetedElement.validation ).valid;
        const errorMsg = checkValidation(updetedElement.value, updetedElement.validation).msg;
        updetedElement.errorMsg =  errorMsg;
        updetedElement.used = true;
        updatedForm[element] = updetedElement;
    
    }else if(updetedElement.inputType == 'radio-button-with-label'){
         
        updetedElement.value = e ;
        
        updetedElement.valid = checkValidation(updetedElement.value , updetedElement.validation ).valid;
        const errorMsg = checkValidation(updetedElement.value, updetedElement.validation).msg;
        updetedElement.errorMsg = errorMsg;
        updetedElement.used = true;
        updatedForm[element] = updetedElement;
    
    }else if(updetedElement.inputType == 'checkbox'){

        let value = updetedElement.value;
        if(value){
            updetedElement.value = false;
        }else{
            updetedElement.value = true ;
        }
        updetedElement.valid = checkValidation(updetedElement.value , updetedElement.validation ).valid;
        const errorMsg = checkValidation(updetedElement.value, updetedElement.validation).msg;
        updetedElement.errorMsg = errorMsg;
        updetedElement.used = true;
        updatedForm[element] = updetedElement;
    
    }else if(updetedElement.inputType == 'group-checkbox'){

        let itemId = e;
        let oldValue = [...updetedElement.value];
        
        if(oldValue.includes(itemId)){
            updetedElement.value = oldValue.filter(item=>item !== itemId);
        }else{
            oldValue.push(itemId);
            updetedElement.value = oldValue;
        }
        updetedElement.valid = checkValidation(updetedElement.value , updetedElement.validation ).valid;
        const errorMsg = checkValidation(updetedElement.value, updetedElement.validation).msg;
        updetedElement.errorMsg = errorMsg;
        updetedElement.used = true;

        updatedForm[element] = updetedElement;

    
    }else if(updetedElement.inputType == 'simple-input-number-float' || updetedElement.inputType == 'simple-input-number-float-with-label'){
        
        if (!('target' in e)) return { formItems: updatedForm };
        let value = e.target?.value || ''; 
        let re = new RegExp(/^\d+(\.\d+)?\.?$/gi);
        let regexResult = re.test(value);

        if(regexResult || value == ''){
            updetedElement.value = e.target?.value || '';
            updetedElement.valid = checkValidation(value , updetedElement.validation ).valid;
            const errorMsg = checkValidation(updetedElement.value, updetedElement.validation).msg;
            updetedElement.errorMsg = errorMsg;
            updetedElement.used = true;
            updatedForm[element] = updetedElement;
        }
    
    }else if(updetedElement.inputType == 'simple-input-date'){   
            const {date} = e as any;
            updetedElement.value = date;
            updetedElement.valid = checkValidation(date, updetedElement.validation).valid;
            const errorMsg = checkValidation(date, updetedElement.validation ).msg;
            updetedElement.errorMsg = typeof errorMsg === 'string' ? errorMsg : errorMsg;
            updetedElement.used = true;
            updatedForm[element] = updetedElement;
    }else if(updetedElement.inputType == 'simple-input-number' || updetedElement.inputType == 'simple-input-number-with-label'){

        if (!('target' in e)) return { formItems: updatedForm };
        let val = e.target?.value || ''; 
        let value = convertPersianToEnglishNumbers(val) ; 
        let re = new RegExp(/^\d+$/gi);
        let regexResult = re.test(value);


        if(regexResult || value == ''){
            // مقدار اصلی را در value ذخیره می‌کنیم (برای حفظ صفرهای ابتدایی)
            updetedElement.value = value;
            // مقدار عددی را در value2 ذخیره می‌کنیم
            updetedElement.value2 = value !== '' ? Number(value) : value;
            updetedElement.valid = checkValidation(updetedElement.value , updetedElement.validation ).valid;
            const errorMsg = checkValidation(updetedElement.value, updetedElement.validation).msg;
            updetedElement.errorMsg = errorMsg;
            updetedElement.used = true;
            updatedForm[element] = updetedElement;
        }else{
           updetedElement.value =  updetedElement.value;
        }

    }else if(updetedElement.inputType == 'editor'){
        let value = e || ''; 
        updetedElement.value = value ;
        updetedElement.valid = checkValidation(updetedElement.value , updetedElement.validation ).valid;
        const errorMsg = checkValidation(updetedElement.value, updetedElement.validation).msg;
        updetedElement.errorMsg = errorMsg;
        updetedElement.used = true;
        updatedForm[element] = updetedElement;

    }else if( updetedElement.inputType == 'simple-input-price-with-label' ){


        if (!('target' in e)) return { formItems: updatedForm };
        let val = e.target?.value || ''; 
        let value = convertPersianToEnglishNumbers(val).replaceAll(',', ''); 
        let re = new RegExp(/^\d+$/gi);
        let regexResult = re.test(value);


        if(regexResult || value == ''){
            updetedElement.value = Number(value) ;
            updetedElement.value2 = value !== '' ? Number(value).toLocaleString() : value;
            updetedElement.valid = checkValidation(updetedElement.value , updetedElement.validation ).valid;
            const errorMsg = checkValidation(updetedElement.value, updetedElement.validation).msg;
            updetedElement.errorMsg = errorMsg;
            updetedElement.used = true;
            updatedForm[element] = updetedElement;
        }else{
            updetedElement.value =  updetedElement.value;
        }

    }else if( updetedElement.inputType == 'file' ){

        if ('type' in e && e.type === 'addFile'){
            const fileEvent = e as unknown as {type: string; uploadInfo:uploadInfo };
            updetedElement.value = [...updetedElement.value , fileEvent.uploadInfo];
            updatedForm[element] = updetedElement;

        } else if ('type' in e && e.type === 'removeFile') {
            const fileEvent = e as unknown as {type: string; uploadInfo: {id: string | number}};
            console.log('fileEvent' , fileEvent)
            if(updetedElement.value.length == 1){
                updetedElement.value = updetedElement.value = [{
                    id: 0,
                    file: null,
                    uploadedId: null,
                    fileUrl: null,
                }];
            }else{
                updetedElement.value = updetedElement.value.filter((item: {id: string | number , uploadedId: string | number}) => item.uploadedId !== fileEvent.uploadInfo.id);
            }
            updatedForm[element] = updetedElement;
        } else if ('type' in e && e.type === 'uploadFile') {
            const fileEvent = e as unknown as {type: string; uploadInfo:uploadInfo};
            updetedElement.value = updetedElement.value.map((item: {id: string | number}) => {
                if(item.id == fileEvent.uploadInfo.id){
                    return{
                        ...item,
                        uploadedId: fileEvent.uploadInfo.uploadedId,
                        fileUrl: {
                            bucketName: fileEvent.uploadInfo.fileUrl?.bucketName ?? '',
                            fileName: fileEvent.uploadInfo.fileUrl?.fileName ?? ''
                        },
                        errorMsg: fileEvent.uploadInfo.errorMsg,
                    }
                }else{
                    return item;
                }
            });
            updatedForm[element] = updetedElement;
        }
    
    }else if (updetedElement.inputType == 'simple-input-text-dynamic-multi'){
        if ('target' in e && e.target) {
            const targetValue = e.target?.value || '';
            updetedElement.value = targetValue;
            updetedElement.valid = checkValidation(updetedElement.value , updetedElement.validation , updetedElement.config.isDepend , updetedElement.config.isDependField , updetedElement.config.isDependValue , formItems ).valid;
            const errorMsg = checkValidation(updetedElement.value, updetedElement.validation , updetedElement.config.isDepend , updetedElement.config.isDependField , updetedElement.config.isDependValue , formItems).msg;
            updetedElement.errorMsg = errorMsg;
            updetedElement.used = true;
            updatedForm[element] = updetedElement;
        }
    }else if(updetedElement.inputType == 'faqs'){

        if('type' in e && e.type == 'addFaq'){
            let oldValue = [...updetedElement.value];
            oldValue.push({
                question: "",
                answer: "",
                errs: {
                    question: "",
                    answer: "",
                },
            });
            updetedElement.value = oldValue;
            updatedForm[element] = updetedElement;
        }else if('type' in e && e.type == 'removeFaq'){
            let oldValue = [...updetedElement.value];
            const removeIndex = ('indexItem' in e && typeof e.indexItem === 'number') ? e.indexItem : -1;
            if (removeIndex > -1) {
                oldValue.splice(removeIndex, 1);
                updetedElement.value = oldValue;
                updatedForm[element] = updetedElement;
            }
      
        }else{
            if ('event' in e && 'indexItem' in e && 'fieldName' in e) {
                const newValue = e.event?.target?.value ?? '';
                const idx = typeof e.indexItem === 'number' ? e.indexItem : -1;
                const field = typeof e.fieldName === 'string' ? e.fieldName : '';
                if (idx > -1 && field) {
                    const oldValue = Array.isArray(updetedElement.value) ? [...updetedElement.value] : [];
                    const currentItem = oldValue[idx] || {};
                    oldValue[idx] = { ...currentItem, [field]: newValue };

                    //let validation = checkValidation(newValue , {required : true} ).valid;
                    let errorMsg = checkValidation(newValue,  {required : true} ).msg;

                    oldValue[idx].errs[field] = errorMsg;


                    updetedElement.value = oldValue;
                    updetedElement.used = true;
                    updatedForm[element] = updetedElement;
                }
            }
        }

    }else{

        if ('target' in e && e.target) {
            updetedElement.value = e.target?.value || '';
            updetedElement.valid = checkValidation(updetedElement.value , updetedElement.validation ).valid;
            const errorMsg = checkValidation(updetedElement.value, updetedElement.validation).msg;
            updetedElement.errorMsg = errorMsg;
            updetedElement.used = true;
            updatedForm[element] = updetedElement;
        }
    }


    // if a depended field is hidden then value of this field is null or empty
    let newFieldArr = updatedForm.map((field , index )=> {


        if(field.config.isDepend){
            if(isHidden(updatedForm , index)){
                if( Array.isArray(field.value) ){
                    field.value=[];
                }else{
                    field.value="";
                }

                return field;
                

            }else{
                return field;
            }
            
        }else{
            return field;
        } 
    })

    console.log(newFieldArr)
    return { formItems: newFieldArr } ;
}



export const isHidden = (formItems: FormElement[], index: number): boolean => {
    let currenField = formItems[index];

    if (!currenField.config.isDepend) {
        return false;
    }

    let dependFieldindex = formItems.findIndex(item => item.config.name === currenField.config.isDependField);

    let targetValues = currenField.config.isDependValue;
    let valueOfField = formItems[dependFieldindex].value;

    if (typeof valueOfField === 'object') {
        let mustHidden = true;
        valueOfField.map((item: any) => {
            if (targetValues && targetValues.includes(item)) {
                mustHidden = false;
            }
        });

        return mustHidden;
    } else {
        return targetValues ? !targetValues.includes(valueOfField) : false;
    }
};



export const validationByClick = (formItems: FormElement[]): { formItems: FormElement[] } => {
    let updatedForm = [...formItems];

    updatedForm.map((item, index) => {

        if(item.inputType == 'attribute-variant'){

            let validationPrice = checkValidation(item.value.price , {required : true} ).valid;
            let validationStock = checkValidation(item.value.stock , {required : true} ).valid;
            let validationSku = checkValidation(item.value.sku , {required : true} ).valid;

            if(item.errs){
                item.errs.price = checkValidation(item.value.price,  { required: true} ).msg;
                item.errs.stock = checkValidation(item.value.stock, {required : true} ).msg;
                item.errs.sku = checkValidation(item.value.sku , {required : true}).msg;
            }

            let mainValid = validationPrice && validationStock && validationSku;
            item.valid = mainValid;
            
        }else if(item.inputType == 'faqs'){
            let mainValid = true;
            item.value.forEach((item: any) => {
                mainValid = mainValid && checkValidation(item.question, {required: true}).valid && checkValidation(item.answer, {required: true}).valid;
            });
            item.valid = mainValid;
        }else{
            item.valid = checkValidation(item.value, item.validation ,  item.config.isDepend , item.config.isDependField , item.config.isDependValue , formItems).valid;
            const errorMsg = checkValidation(item.value, item.validation ,  item.config.isDepend , item.config.isDependField , item.config.isDependValue , formItems).msg;
            item.errorMsg = errorMsg;
        }
       
        item.used = true;
        updatedForm[index] = item;
    });

    //console.log('updatedForm', updatedForm);

    return { formItems: updatedForm };
}


const checkValidation = (
    value : any, 
    rules : {
    required?: boolean;
    isPhoneNumber?: boolean;
    isMobile?: boolean;
    isFileSelected?: boolean;
    selectProductRequired?: boolean;
    requiredFile?: boolean;
    isPhone?: boolean;
    isPhoneNumberOrEmpty?: boolean;
    isPercent?: boolean;
    isExcel?: boolean;
    isImage?: boolean;
    selectRequired?: boolean;
    maxNumber?: number;
    maxLength?: number;
    } = {}, 
    isDepend?:boolean ,
    isDependField?:any , 
    isDependValue?: any, 
    form?: FormElement[] 
): checkValidationT => {
    //console.log( "vlue ", value)

    if(isDepend){
        let indexDependField = form?.findIndex(item => item.config.name === isDependField) ?? -1;
        if(form && form[indexDependField].value !== isDependValue){
            return {
                valid: true,
                msg: ""
            }
        }
    }

    
    let isValid = true;
    if (rules.required) {
        isValid = String(value).trim() !== "" ;
        if (!isValid ) {
            return {
                valid: false,
                msg: 'لطفا این قسمت را خالی نگذارید'
            }
        }
    }


    if(rules.isFileSelected){
        isValid = value.uploadedId ;
        if (!isValid ) {
            return {
                valid: false,
                msg: 'لطفا یک فایل را انتخاب کنید'
            }
        }
    }


    if (rules.selectProductRequired) {

        if(value.select.trim() == "0"){
            return {
                valid: false,
                msg: 'لطفا یک مورد را انتخاب کنید'
            }
        }else if(value.select.trim() == "-1"){

            isValid = value.input.trim() !== "" ;
            if (!isValid ) {
                return {
                    valid: false,
                    msg:  'لطفا این قسمت را خالی نگذارید'
                }
            }
        }
      
    }


    if (rules.requiredFile) {
        isValid = String(value).trim() !== "";
        if (!isValid) {
            return {
                valid: false,
                msg: 'لطفا یک فایل را انتخاب کنید'
            }
        }
    }
  

    if (rules.isPhone) {
        let re = new RegExp(/^09[0-9]{9}$/ig);
        if (!re.test(value)) {
            return {
                valid: false,
                msg: "لطفا یک شماره موبایل معتبر وارد کنید"
            }
        }
    }

    if (rules.isPhoneNumberOrEmpty) {

        if(value !== ''){

            let re = new RegExp(/^\d{11}/ig);
            if (!re.test(value)) {
                return {
                    valid: false,
                    msg: "لطفا یک شماره ثابت معتبر وارد کنید"
                }
            }
        }
    }

    if (rules.isPercent) {
        if(value < 0 || value > 100 ) {
            return {
                valid: false,
                msg: "لطفا یک عدد بین 0 تا 100 وارد کنید"
            }
        }
    }

  
    if (rules.isExcel) {
        
        if (value.type == '') {
            return {
                valid: false,
                msg:  'لطفا فایل اکسل مشتریان را انتخاب کنید'

            }
        }else if (value.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            return {
                valid: false,
                msg:  'فرمت فایل انتخابی باید .xlsx باشد'

            }
        }
    }

    if (rules.isImage) {

        
        if ( !(['image/png' , 'image/jpg' , 'image/jpeg'  ].includes(value.type)) ) {
            
            return {
                valid: false,
                msg:  'فرمت فایل انتخابی باید به فرمت عکس باشد'

            }
           
        }
        
    }

    if (rules.isMobile) {
        console.log('v' , value)
        let re = new RegExp(/^09[0-9]{9}$/ig);
        if (!re.test(value)) {
            return {
                valid: false,
                msg: "لطفا یک شماره موبایل معتبر وارد کنید"
            }
        }
    }

    if (rules.isPhoneNumber) {
        let re = new RegExp(/^\d{11}/ig);
        if (!re.test(value)) {
            return {
                valid: false,
                msg: "لطفا یک شماره ثابت معتبر وارد کنید"
            }
        }
    }


    if(rules.selectRequired){
        if (value?.length === 0 || value === '0') {
            return {
                valid: false,
                msg: 'لطفا انتخاب کنید'
            }
        }
    }

    if(rules.maxNumber){
        if (value > rules.maxNumber) {
            return {
                valid: false,
                msg: `لطفا حداکثر مقدار ${rules.maxNumber} را وارد کنید`
            }
        }
    }

    if(rules.maxLength){
        if (value.length > rules.maxLength) {
            return {
                valid: false,
                msg: `لطفا حداکثر  ${rules.maxLength} کاراکتر را وارد کنید`
            }
        }
    }

    
  
    return {
        valid: true,
        msg: ""
    }
}


interface EmptyFieldFormElement extends FormElement {
    file?: string;
    size?: string;
    filename?: string;
}

export const emptyField = (
    element: number,
    formItems: EmptyFieldFormElement[]
): { formItems: EmptyFieldFormElement[] } => {

    let updatedForm = [...formItems];
    let updetedElement = { ...updatedForm[element] };

    if (updetedElement.inputType === 'input-file') {

        updetedElement.file = '';
        updetedElement.value = '';
        updetedElement.size = '';
        updetedElement.filename = '';
        updetedElement.valid = false;
        updetedElement.errorMsg = '';
        updetedElement.used = false;
        updatedForm[element] = updetedElement;

    } else {
        updetedElement.value = updetedElement.value;
        updetedElement.valid = checkValidation(updetedElement.value, updetedElement.validation).valid;
        const errorMsg = checkValidation(updetedElement.value, updetedElement.validation).msg;
        updetedElement.errorMsg = errorMsg;
        updetedElement.used = true;
        updatedForm[element] = updetedElement;
    }
    return { formItems: updatedForm };
}