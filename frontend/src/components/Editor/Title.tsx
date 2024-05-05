import { useEffect, useState } from "react";

interface Props {
  handleChangeData(data: string): void;
}
const Title = ({ handleChangeData }: Props) => {
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    console.log("리랜더링");
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    handleChangeData(title);
  };

  return (
    <div className="flex h-20 w-full px-10">
      <input
        type="text"
        className=" h-full w-full bg-main-200 text-4xl font-black tracking-[0.07em] placeholder-[#868E96] focus:outline-none"
        placeholder="제목을 입력하세요."
        onChange={(e) => handleTitleChange(e)}
        onBlur={handleTitleBlur}
      />
    </div>
  );
};

export default Title;
