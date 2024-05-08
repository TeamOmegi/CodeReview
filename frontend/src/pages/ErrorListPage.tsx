import ErrorList from "../components/Error/ErrorList/ErrorList";

const ErrorListPage = () => {
  return (
    <div className="bg-default">
      <div className="flex h-1/6 w-full rounded-xl bg-blue-300 ">
        <div className="m-5 flex items-center justify-center text-2xl font-bold">
          에러 리스트
        </div>
      </div>
      <div className="flex h-5/6 w-full flex-col items-center justify-center rounded-xl">
        <div className="box-border flex h-[10%] w-full justify-between px-16 py-1">
          <div className=" flex h-full bg-red-200">
            {/* 프로젝트 선택 dropdown */}
            드롭다운 입니다
          </div>
          <div className="flex h-full bg-yellow-200">
            {/* 검색창 */}
            검색창 입니다
          </div>
        </div>
        <div className="border-1 flex h-[90%] w-11/12 items-center justify-center rounded-lg border-primary-100 text-black">
          <ErrorList />
        </div>
      </div>
    </div>
  );
};

export default ErrorListPage;
