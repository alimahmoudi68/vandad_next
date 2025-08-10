export interface IFormItems {
    inputType: string;
    config: {
      name: string;
      label: string;
      classes?: string;
      [key: string]: any;
    };
    value: any;
    value2?: any;
    validation: Record<string, any>;
    valid: boolean;
    errorMsg: string;
    used: boolean;
}
  
export interface IForm {
    formItems: IFormItems[];
}
  