import { useEffect, useState } from "react";

interface Props {
  iniTitle: string;
  handleChangeData(data: string): void;
}
const Title = ({ iniTitle, handleChangeData }: Props) => {
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (iniTitle === "") return;
    setTitle(iniTitle);
  }, [iniTitle]);

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
        value={title}
        className=" h-full w-full bg-main-200 text-4xl font-black tracking-[0.07em] placeholder-[#868E96] focus:outline-none"
        placeholder="제목을 입력하세요."
        onChange={(e) => handleTitleChange(e)}
        onBlur={handleTitleBlur}
      />
    </div>
  );
};

export default Title;
