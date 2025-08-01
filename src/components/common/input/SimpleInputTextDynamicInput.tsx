interface Config {
  classes: string;
  label: string;
  type?: string;
  name: string;
  placeholder: string;
}

interface InputNumberProps {
  config: Config;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  errorMsg: string;
}

const SimpleInputTextDynamicInput: React.FC<InputNumberProps> = (props) => {
  let {config , change  , value , errorMsg } = props;

  return (
    <div className={` ${config.classes} h-full flex flex-col items-center gap-x-2 `}>
      <div className="w-full flex items-center gap-x-2">
        {
          config.label !== '' ?
          (
            <label className="min-w-[100px] text-[0.8rem] min-[500px]:text-[1rem] md:min-w-[120px] min-[1200px]:w-[130px] text-center">
            {config.label}
            </label>  
          )
          :
          (
            null
          )
        }
        <input
          type={config.type ?? 'text'}
          name={config.name}
          value={value}
          placeholder={config.placeholder}
          className={`grow p-3 rounded-lg outline-hidden focus:border-primary-100 bg-white-100 dark:bg-cardDark-100 border dark:border-cardDark-100 ${errorMsg ? 'border-red-500' : 'border-gray-300'}`}
          onChange={change}
        />
      </div>
      {
        errorMsg !== '' ?
        (
          <div className={`w-full flex gap-x-2 ${config.label !== '' ? '' : 'justify-start'}`}>
            {
              config.label !=='' ?
              (
                <div className="min-w-[100px] text-[0.8rem] min-[500px]:text-[1rem] md:min-w-[120px] min-[1200px]:w-[130px] text-center"></div>
              )
              :
              (
                null
              )
            }
            
            <div>
              <span className="text-sm text-red-500">
              { errorMsg }
              </span>
            </div>
          </div>
        )
        :
        (
          null
        )
      }
    </div>
  );
};

export default SimpleInputTextDynamicInput;