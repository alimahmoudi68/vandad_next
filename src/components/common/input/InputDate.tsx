import React from "react";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/teal.css";


interface InputDateProps {
  config: {
    type?: string;
    name: string;
    label: string;
    classes: string;
  };
  change: (event: { date: string }) => void;
  value: string;
  errorMsg?: string;
  classes?: string;
}

const InputDate: React.FC<InputDateProps> = (props) => {
  let { config, change, value, errorMsg = "", classes = "" } = props;

  return (
    <div className={`${config.classes} flex flex-col justify-center`}>
      <label className="w-full text-[0.8rem] min-[500px]:text-[1rem] text-start mb-3">{config.label}</label>
      <div style={{ width: "100%" }}>
        <DatePicker
          className="teal"
          animations={[]}
          editable={false}
          containerStyle={{
            width: "100%",
          }}
          render={
            <DateInput
              props={{ ...props, errorMsg: errorMsg, valid: true, used: false }}
              openCalendar={function (
                event: React.FocusEvent<HTMLInputElement>
              ): void {
                throw new Error("Function not implemented.");
              }}
              value={""}
              handleValueChange={function (value: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
          format="YYYY/MM/DD"
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          onChange={(date, options) => {
            change({ date: options.validatedValue[0] });
          }}
        />
      </div>
      {errorMsg !== "" ? (
        <span className="text-sm text-red-500 text-start font-light">
          {errorMsg}
        </span>
      ) : null}
    </div>
  );
};

export default InputDate;

function DateInput({
  openCalendar,
  value,
  handleValueChange,
  props,
}: {
  openCalendar: (event: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  handleValueChange: (value: string) => void;
  props: {
    value: string;
    disable?: boolean;
    valid: boolean;
    used: boolean;
    errorMsg: string;
    config: { type?: string; name: string; label: string };
  };
}) {
  return (
    <input
      style={{
        borderRadius: ".5rem",
        direction: "rtl",
        padding: "10px",
        outline: "none",
        fontSize: "0.9rem",
        width: "100%",
        flexGrow: "1",
      }}
      autoComplete="off"
      onFocus={openCalendar}
      defaultValue={props.value}
      readOnly
      disabled={props.disable}
      className={`w-full p-3 rounded-lg outline-hidden focus:border-primary-100 bg-white border ${
        props.errorMsg !== "" ? " border-red-500" : "border-gray-300 "
      }`}
      {...props.config}
    />
  );
}
