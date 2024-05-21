import { useState } from "react";

const ErrorSwitch = ({ onClick }: any) => {
  const [enabled, setEnabled] = useState(false);

  const handleClick = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    onClick(newEnabled ? "ERROR" : "");
  };

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <div className="flex h-fit w-fit justify-end">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={enabled}
            readOnly
          />
          <span className="mr-3 box-border flex w-full justify-end pl-2 text-lg font-medium text-main-100 text-opacity-20">
            ERROR
          </span>
          <div
            onClick={handleClick}
            className="peer relative h-6 w-[58px] rounded-full bg-gray-200 shadow-md peer-checked:bg-[rgba(255,119,119,0.50)] peer-focus:ring-green-300"
          >
            <span
              className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ease-in-out ${
                enabled ? "translate-x-3" : ""
              }`}
            ></span>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ErrorSwitch;
