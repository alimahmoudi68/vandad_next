

import InputPrice from  './InputPrice';
import SimpleInput from './SimpleInput';
import SimpleInputSearch from './SimpleInputSearch';
import SimpleInputWihtLabel from './SimpleInputWithLabel';
import SimpleInputNumberWithLabel from './SimpleInputNumberWithLabel';
import SimpleInputPriceWithLabel from './SimpleInputPriceWithLabel';
import SimpleInputNumber from './SimpleInputNumber';
import SimpleInputText from './SimpleInputText';
import SelectMulti from './SelectMulti';
import Select from './Select';
import SelectWithLabel from './SelectWithLabel';
import Checkbox from './Checkbox';
import GroupCheckbox from './GroupCheckbox';
import Textarea from './Textarea';
import RadioButtonWithLabel from './RadioButtonWithLabel';
import File from './File';
import SimpleInputTextDynamicInput from './SimpleInputTextDynamicInput';
import AttributeVariant from './AttributeVariant';
import Editor from './editor/EnhancedTipTapEditor';
import InputDate from "./InputDate";


import { FC } from 'react';

interface InputProps {
    hidden?: boolean;
    inputElement: string;
    [key: string]: any;
}

const Input: FC<InputProps> = (props) => {

    let inputElement = null;

    if(props?.hidden){
        return null;
    }

    switch (props.inputElement) {

        case 'simple-input':
            inputElement = <SimpleInput config={props.config} change={props.change} value={props.value} {...props} />
            break;
        case 'simple-input-search':
            inputElement = <SimpleInputSearch config={props.config} change={props.change} value={props.value} {...props} />
            break;
        case 'simple-input-with-label':
            inputElement = <SimpleInputWihtLabel config={props.config} change={props.change} value={props.value} {...props} />
            break;
        case 'simple-input-number-with-label':
            inputElement = <SimpleInputNumberWithLabel config={props.config} change={props.change} value2={props.value2} value={props.value} {...props} />
                break;
        case 'simple-input-price-with-label':
            inputElement = <SimpleInputPriceWithLabel config={props.config} change={props.change} value2={props.value2} value={props.value} {...props} />
                break;                    
        case 'simple-input-number':
            inputElement = <SimpleInputNumber config={props.config} change={props.change} value={props.value} errorMsg={props.errorMsg} {...props} />
                break; 
        case 'simple-input-number-float':
            inputElement = <SimpleInputNumber config={props.config} change={props.change} value={props.value} errorMsg={props.errorMsg} {...props} />
                break;               
        case 'simple-input-text':
            inputElement = <SimpleInputText config={props.config} change={props.change} value={props.value} errorMsg={props.errorMsg} {...props} />
                break;            
        case 'input-price':
            inputElement = <InputPrice config={props.config} change={props.change} value={props.value} value2={props.value2} errorMsg={props.errorMsg} classes={props.classes} {...props} />
            break;       
        case 'select-multi':
            inputElement = <SelectMulti config={props.config} change={props.change} value={props.value} {...props} />
            break;
        case 'select':
            inputElement = <Select config={props.config} change={props.change} value={props.value} {...props} />
            break;
        case 'select-with-label':
            inputElement = <SelectWithLabel config={props.config} change={props.change} value={props.value} {...props} />
            break;                  
        case 'checkbox':
            inputElement = <Checkbox config={props.config} change={props.change} value={props.value} {...props} />
            break;
        case 'group-checkbox':
            inputElement = <GroupCheckbox config={props.config} change={props.change} value={props.value} {...props} />
            break;    
        case 'textarea':
            inputElement = <Textarea config={props.config} change={props.change} value={props.value} errorMsg={props.errorMsg} {...props} />
            break;
        case 'radio-button-with-label':
            inputElement = <RadioButtonWithLabel config={props.config} change={props.change} value={props.value} {...props}/>
            break;
        case 'file':
            inputElement = <File config={props.config} change={props.change} validation={props.validation} errorMsg={props.errorMsg} value={props.value} {...props}/>
            break;
        case 'simple-input-text-dynamic-multi':
            inputElement = <SimpleInputTextDynamicInput config={props.config} change={props.change} value={props.value} errorMsg={props.errorMsg} {...props} />
            break;
        case 'attribute-variant':
            inputElement = <AttributeVariant config={props.config} change={props.change} value2={props.value2} value={props.value} errs={props.errs} {...props} />
            break;
        case "simple-input-date":
            inputElement = (<InputDate config={props.config} change={props.change} value={props.value} errorMsg={props.errorMsg} {...props}/>
      );
      break;  
        case 'editor':
            inputElement = <Editor config={props.config} change={props.change}  value={props.value} errorMsg={props.errs} {...props} />
            break;                                           
        default:
            inputElement =
                (
                    null
                )
    }
    return (
        <>
            {inputElement}
        </>
    )

}

export default Input;


