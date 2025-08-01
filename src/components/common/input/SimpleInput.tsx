import React from "react";

interface SimpleInputProps {
  config: {
    label: string;
    name: string;
    type?: string; 
  };
  change: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  value: string; 
  errorMsg?: string; 
  classes?: string; 
}

const SimpleInput: React.FC<SimpleInputProps> = (props) => {
  let {config , change  , value , errorMsg = "", classes = ""} = props;

  return (
    <div className={`${classes} w-full lg:w-[49%] 2xl:w-[32%] flex flex-wrap`}>
      <div className="w-full flex items-center gap-x-2">
        <h3 className="w-[100px] text-[0.8rem] min-[500px]:text-[1rem] md:min-w-[120px] min-[1200px]:w-[130px] text-center">{config.label}</h3>
        <input
          type={config.type ?? 'text'}
          name={config.name}
          value={value}
          className={`w-[70%] p-2 py-4 rounded-lg outline-hidden focus:border-primary-100 bg-white border md:grow ${errorMsg ? 'border-red-500' : 'border-gray-300'}`}
          onChange={change}
        />
      </div>
      {
        errorMsg !== '' ?
        (
          <div className="flex gap-x-2">
            <div className="min-w-[100px] text-[0.8rem] min-[500px]:text-[1rem] md:min-w-[120px] min-[1200px]:w-[130px] text-center"></div>
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

export default SimpleInput;