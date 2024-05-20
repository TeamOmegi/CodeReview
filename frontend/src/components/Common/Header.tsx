// 상단에 제목 들어가는거 컴포넌트 하나 새로 만든 파일

const Header = ({ title }: { title: string }) => {
  return (
    <div className="mb-1 box-border flex h-fit w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#8E2DE2b3] via-[#ff000080] to-[#4A00E066] p-0.5 shadow-md">
      <div className="box-border flex h-full w-full rounded-[calc(1rem-2px)] bg-white py-2 pl-5">
        <div className="flex items-center justify-center text-2xl font-bold text-main-100 text-opacity-80">
          {title}
        </div>
      </div>
    </div>
  );
};

export default Header;
