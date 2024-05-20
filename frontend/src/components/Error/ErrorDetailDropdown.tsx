import { useState } from "react";
import { Span } from "../../api/errorAxios.tsx";

// [NEW] 에러 디테일 페이지 컴포넌트
// 에러 데이터 형식에 trace 부분 표시
// 표시할 데이터가 많이서 드롭다운으로 해둠

const ErrorDropdown = ({ span }: { span: Span }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setTimeout(() => {
      if (isOpen) setIsOpen(false);
    }, 100);
  };

  const formatDateTime = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);
    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    const seconds = String(dateTime.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="relative mb-2 box-border inline-block h-fit w-full">
      <div className="box-border h-fit w-full">
        <button
          type="button"
          onClick={toggleDropdown}
          onBlur={closeDropdown}
          className="
              flex
              w-full
              justify-between
              rounded-md
              border-[1px]
              border-gray-200
              bg-white
              px-4
              py-2
              text-base
              font-medium
              text-gray-700
              shadow-md
              hover:bg-gray-50
            "
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
        >
          <div className="flex w-[98%]">
            <div className="mr-5 flex w-fit items-center justify-center text-gray-500">
              SERVICE
            </div>
            <div className="mr-10 flex w-[10%] min-w-32 items-center justify-start font-bold">
              {span.serviceName}
            </div>
            <div className="mr-5 flex w-fit items-center justify-center text-gray-500">
              MESSAGE
            </div>
            <div className="mr-10 flex w-[40%] items-center justify-start truncate whitespace-nowrap font-bold">
              {span.name}
            </div>
            <div className="mr-5 flex w-fit items-center justify-center text-gray-500">
              TIME
            </div>
            <div className="mr-3 flex w-[20%] items-center justify-center">
              {formatDateTime(span.enterTime)}
            </div>
          </div>
          <img
            className="h-6 w-6"
            alt="Dropdown_Icon"
            src={isOpen ? "/icons/SelectUp.png" : "/icons/SelectDown.png"}
          />
        </button>
      </div>

      {isOpen && (
        <div className="mt-1 h-fit w-full rounded-md bg-gray-200 px-5 py-2 shadow-md">
          {Object.entries(span.attributes).map(([key, value]) => (
            <div className="mb-1 box-border flex">
              <div className="mr-5 box-border w-[15%] min-w-52 text-gray-600">
                {key}
              </div>
              <div className="box-border text-gray-600">{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ErrorDropdown;
