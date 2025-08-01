import React, { useState } from "react";
import { ToWords } from "to-words";

interface InputPriceProps {
  config: Record<string, any>; // config یک آبجکت با مقادیر دلخواه است
  change: (params: {
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
    data: {
      type: string;
      unitPrice: number | string;
    };
  }) => void;
  value: string;
  value2: string;
  errorMsg: string;
  classes: string;
}

const InputPrice: React.FC<InputPriceProps> = (props) => {
  let { config, change, value, value2, errorMsg, classes } = props;

  const [unitPrice, setUnittPrice] = useState<number | string>(1000 * 1000);

  const toWords = new ToWords({
    localeCode: "fa-IR",
  });

  return (
    <div className={`${classes} w-full lg:w-[49%] 2xl:w-[32%] flex flex-wrap`}>
      <div className={`w-full flex items-center gap-x-2`}>
        {config.label !== "" ? (
          <label className="min-w-[100px] text-[0.8rem] min-[500px]:text-[1rem] md:min-w-[120px] min-[1200px]:w-[130px] text-center">
            {config.label}
          </label>
        ) : null}
        <div
          className={`grow flex justify-between rounded-lg bg-white-100 dark:bg-cardDark-100 focus-within:border-primary-100 border dark:border-cardDark-100 ${
            errorMsg?.length > 0 ? "border-red-500" : "border-gray-300"
          }`}
        >
          <input
            type="text"
            name={config.name}
            value={value2 ? value2 : ""}
            onChange={(e) =>
              change({
                event: e,
                data: {
                  type: "change_input",
                  unitPrice,
                },
              })
            }
            className={`w-full rounded-lg outline-hidden p-3 text-textPrimary-100 dark:text-white-100`}
          />
          <select
            id="selectInput"
            name="unitPrice"
            value={unitPrice}
            className="rounded-lg outline-hidden bg-white-100 dark:bg-cardDark-100 border border-gray-200 dark:border-cardDark-100"
            onChange={(e) => {
              setUnittPrice(e.target.value);
              change({
                event: e,
                data: {
                  type: "change_unit",
                  unitPrice: e.target.value,
                },
              });
            }}
          >
            <option value={1000}>هزار</option>
            <option value={1000000}>میلیون</option>
            <option value={1000000000}>میلیارد</option>
          </select>
        </div>
      </div>
      <div className="flex gap-x-2">
        <div className="min-w-[100px] text-[0.8rem] min-[500px]:text-[1rem] md:min-w-[120px] min-[1200px]:w-[130px] text-center"></div>
        <div>
          {value && value !== "0" ? (
            <span className="text-sm text-primary-100">
              {toWords.convert(Number(value))}
            </span>
          ) : null}
          {errorMsg?.length > 0 ? (
            <span className="text-sm text-red-500 block">{errorMsg}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default InputPrice;
