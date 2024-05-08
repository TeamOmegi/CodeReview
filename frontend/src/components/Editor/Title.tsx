import { useEffect, useState } from "react";

const Title = () => {
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    console.log("리랜더링");
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log(title);
  };

  return (
    <div className="flex h-20 w-full px-10">
      <input
        type="text"
        className=" bg-main-200 h-full w-full text-4xl font-black tracking-[0.07em] placeholder-[#868E96] focus:outline-none"
        placeholder="제목을 입력하세요."
        onChange={(e) => handleTitleChange(e)}
      />
    </div>
  );
};

export default Title;
