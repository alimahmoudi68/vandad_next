import React from "react";

interface SimpleInputWithLabelProps {
  config: {
    type?: string; 
    name: string;
    label: string; 
    placeholder?: string;
  };
  change: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  value: string; 
  errorMsg?: string; 
  classes?: string; 
}

const SimpleInputWithLabel: React.FC<SimpleInputWithLabelProps> = (props) => {
  let {
    config, 
    change, 
    value,  
    errorMsg = "",
    classes = ""
  } = props;

  return (
    <div className={`${classes} w-full flex flex-col items-start`}>
      <div className="w-full flex-col flex-col items-center mb-2">
        <label className="w-full text-[0.8rem] min-[500px]:text-[1rem] text-start mb-2 block">{config.label}</label>
        <input
          type={config.type ?? 'text'}
          name={config.name}
          value={value}
          placeholder= {config.placeholder ?? ""}
          className={`w-full p-3 rounded-lg outline-hidden focus:border-primary-100 bg-white-100 dark:bg-bgDark-100 border ${errorMsg ? 'border-red-500' : 'border-gray-300 dark:border-bgDark-100'}`}
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