import React from "react";

interface SimpleInputWithLabelProps {
  config: {
    type?: string; 
    name: string; 
    label: string; 
  };
  change: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  value: string; 
  value2: string; 
  errorMsg?: string; 
  classes?: string; 
}

const SimpleInputWithLabel: React.FC<SimpleInputWithLabelProps> = (props) => {
  let {config, change, value, value2,errorMsg = "", classes = ""} = props;

  return (
    <div className={`${classes} w-full flex flex-col`}>
      <div className="w-full flex-col flex-col items-center mb-2">
        <label className="w-full text-[0.8rem] min-[500px]:text-[1rem] text-start mb-3">{config.label}</label>
        <input
          type={config.type ?? 'text'}
          name={config.name}
          value={value2}
          className={`w-full p-3 rounded-lg outline-hidden focus:border-primary-100 bg-white border ${errorMsg ? 'border-red-500' : 'border-gray-300'}`}
          onChange={change}
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
  );
};

export default SimpleInputWithLabel;