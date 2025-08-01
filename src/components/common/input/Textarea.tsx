
interface TextareaProps {
    config: {
        classes: string;
        label: string;
    };
    change: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    value: string;
    errorMsg: string;
}

const Textarea: React.FC<TextareaProps> = ({ config, change, value, errorMsg }) => {

    return(
        <div className={`${config.classes} flex flex-wrap`}>
            <div className={`w-full flex flex-col items-center gap-x-2`}>
                <label className="w-full text-[0.8rem] min-[500px]:text-[1rem] text-start mb-3">{config.label}</label>               
                <textarea
                rows={5}
                id="exchangeDescription"
                name="exchangeDescription"
                value={value}
                onChange={change}
                className={`w-full p-2 py-4 rounded-lg outline-none bg-white focus:border-primary-100 border ${errorMsg !== '' ? 'border-red-500' : 'border-gray-300'} border-gray-300`}
                />    
            </div>
            {
                errorMsg !== '' ?
                (
                    <span className="text-sm text-red-500">
                    { errorMsg }
                    </span>
                )
                :
                (
                null
                )
            }
        </div>
    )
}

export default Textarea;