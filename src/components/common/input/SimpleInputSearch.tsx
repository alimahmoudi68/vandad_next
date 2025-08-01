import React from "react";

interface SimpleInputProps {
  config: {
    type?: string; 
    name: string; 
    placeholder?: string;
  };
  change: (event: React.ChangeEvent<HTMLInputElement>) => void; 
  value: string; 
  classes?: string; 
}


const SimpleInput: React.FC<SimpleInputProps>  = (props) => {
  let {config, change  , value,  classes = ""} = props;

  return (
    <div className={`${classes} w-full flex flex-wrap`}>
        <input
          type={config.type ?? 'text'}
          name={config.name}
          placeholder={config.placeholder}
          value={value}
          className={`w-[70%] p-2 py-4 rounded-lg outline-hidden focus:border-primary-100 bg-white-100 dark:bg-dark-100  md:grow `}
          onChange={change}
        />
    </div>
  );
};

export default SimpleInput;