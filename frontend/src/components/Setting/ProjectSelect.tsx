import { useEffect, useState } from "react";

interface Names {
  projectId: number;
  name: string;
}

interface Props {
  options: Names[];
  handleSelectProject(projectId: number): void;
}
const ProjectSelect = ({ options, handleSelectProject }: Props) => {
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

  const handleOptionClick = (option: Names) => {
    setSelectedOption(option.name);
    handleSelectProject(option.projectId);
    setIsOpen(false);
  };

  return (
    <div className="">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            onClick={toggleDropdown}
            onBlur={closeDropdown}
            className="inline-flex w-60 justify-between rounded-lg border-[3px] border-gray-200 bg-white px-5 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 focus:border-secondary-400 focus:outline-none focus:ring focus:ring-secondary-200"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
          >
            {selectedOption ? selectedOption : "프로젝트 선택"}
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
            {options.map((option, index) => (
              <div
                key={option.projectId}
                className="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSelect;
