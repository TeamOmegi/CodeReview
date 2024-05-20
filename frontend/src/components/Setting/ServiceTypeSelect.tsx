import { useEffect, useState } from "react";

interface Type {
  serviceTypeId: number;
  serviceTypeName: string;
}

interface Props {
  index: number;
  options: Type[];
  handleSelectType(index: number, typeId: number): void;
}
const ServiceTypeSelect = ({ index, options, handleSelectType }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    if (options.length == 0) return;
    handleOptionClick(options[0]);
  }, [options]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setTimeout(() => {
      if (isOpen) setIsOpen(!isOpen);
    }, 100);
  };

  const handleOptionClick = (option: Type) => {
    setSelectedOption(option.serviceTypeName);
    handleSelectType(index, option.serviceTypeId);
    setIsOpen(false);
  };

  return (
    <div className="relative ml-2 inline-block">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            onClick={toggleDropdown}
            onBlur={closeDropdown}
            className="inline-flex h-10  w-32 justify-between rounded-lg border-[3px] border-gray-200 bg-white px-5 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:border-secondary-400 focus:outline-none focus:ring focus:ring-secondary-200"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
          >
            {selectedOption}
            <img
              className="h-6 w-6"
              alt="Dashboard_Icon"
              src={isOpen ? "/icons/SelectUp.png" : "/icons/SelectDown.png"}
            />
          </button>
        </span>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-3 w-56 origin-top-left rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <div
                key={option.serviceTypeId}
                className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => handleOptionClick(option)}
              >
                {option.serviceTypeName}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTypeSelect;
