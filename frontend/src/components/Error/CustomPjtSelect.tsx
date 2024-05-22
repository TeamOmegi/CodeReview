import { useState, useEffect } from "react";

interface ProjectList {
  options: string[];
  selectedOption: string;
  handleSelectProject: (project: string) => void;
}

// [UPDATE] 변경사항 있는 파일
// 아마 CSS 좀 변경한듯?
// 로직은 변경 없음 (복붙 가능할 것으로 예상)

const CustomPjtSelect = ({
  options,
  selectedOption,
  handleSelectProject,
}: ProjectList) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedOption && options.length > 0) {
      handleSelectProject(options[0]);
    }
  }, [selectedOption, options, handleSelectProject]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setTimeout(() => {
      if (isOpen) setIsOpen(false);
    }, 100);
  };

  const handleOptionClick = (option: string) => {
    handleSelectProject(option);
    setIsOpen(false);
  };

  return (
    <div className="flex h-full w-full ">
      <span className="flex h-full w-full items-center">
        <button
          type="button"
          onClick={toggleDropdown}
          onBlur={closeDropdown}
          className="box-border inline-flex w-72 justify-between rounded-xl border-[1px] border-gray-400 border-opacity-50 bg-white p-2 pl-3 text-base font-medium text-gray-700 shadow-md hover:bg-gray-50 focus:border-secondary-400 focus:outline-none focus:ring focus:ring-secondary-200"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
        >
          {selectedOption || (options.length > 0 && options[0])}
          <img
            className="h-6 w-6"
            alt="Dropdown_Icon"
            src={isOpen ? "/icons/SelectUp.png" : "/icons/SelectDown.png"}
          />
        </button>
      </span>

      {isOpen && (
        <div className="absolute mt-3 w-72 origin-top-left rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
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

export default CustomPjtSelect;
