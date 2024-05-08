import { useState } from "react";

interface Props {
  options: string[];
  handleSelectTag(tag: string): void;
}
const CustomSelect = ({ options, handleSelectTag }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setTimeout(() => {
      if (isOpen) setIsOpen(!isOpen);
    }, 100);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    handleSelectTag(option);
    setIsOpen(false);
  };

  return (
    <div className="relative ml-5 inline-block">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            onClick={toggleDropdown}
            onBlur={closeDropdown}
            className="inline-flex w-32 justify-between rounded-2xl border-[1px] border-gray-400 bg-white px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:border-secondary-400 focus:outline-none focus:ring focus:ring-secondary-200"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
          >
            {selectedOption ? selectedOption : "태그 선택"}
            <img
              className="h-6 w-6"
              alt="Dashboard_Icon"
              src={isOpen ? "/icons/SelectUp.png" : "/icons/SelectDown.png"}
            />
          </button>
        </span>
      </div>

      {isOpen && (
        <div className="absolute mt-3 w-56 origin-top-left rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div
              className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={() => handleOptionClick("")}
            >
              전체 선택
            </div>
            {options.map((option) => (
              <div
                key={option}
                className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
