export interface IFormItems{
  inputType: string;
  value: any;
  value2?: any;
  valid: boolean;
  used: boolean;
  config: {
    options?: { id: string; title: string }[];
    showAttributes?: boolean;
    isDynamic?: boolean;
    isDepend?: boolean;
    isDependField?: string;
    isDependValue?: any[];
    name: string;
    label: string;
    classes?: string;
    justShow?: boolean;
    isAttribute?: boolean;
    isAttributeSelect?: boolean;
    isAttributeVariant?: boolean;
    isSingle?: boolean;
    inSidebar?: boolean;
    isOutString?: boolean
    // optional layout metadata
    area?: "main" | "sidebar";
    tabId?: string;
    tabTitle?: string;
    sectionId?: string;
    sectionTitle?: string;
    cardId?: string;
    cardTitle?: string;
    collapsible?: boolean;
    defaultOpen?: boolean;
    colSpan?: number;
    order?: number;
  };
  validation: Record<string, any>;
  errorMsg?: string;
  errs?: {
    price?: string;
    stock?: string;
    sku?: string;
    images?: string
  };
}
  
export interface IForm {
    formItems: IFormItems[];
}
  