interface FormItem {
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
    },
    validation: Record<string, any>;
    errorMsg: string
}

type Result = Record<string, string[]>;

function mapItemsToLabelledValues(items: FormItem[]): Result[] {
  return items.map(item => {
    const name = item.config.name;
    const options = item.config.options;

    // گزینه‌هایی که id شون در value هست رو نگه می‌داریم
    interface Option {
        id: string;
        title: string;
    }

    const matched: string[] = (item.value as string[])
        .map((valId: string): string | null => {
            const opt: Option | undefined = options && options.find((o: Option) => o.id === valId);
            return opt ? `${valId}/${opt.title}` : null;
        })
        .filter((x: string | null): x is string => x !== null);

    return { [name]: matched };
  });
}


export default mapItemsToLabelledValues;