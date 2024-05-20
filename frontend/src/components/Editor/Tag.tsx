import { useEffect, useState } from "react";

interface Props {
  iniTag: string[];
  resetToggle?: boolean;
  handleChangeData(data: string[]): void;
}

const Tag = ({ iniTag, resetToggle, handleChangeData }: Props) => {
  const [tagName, setTagName] = useState<string>("");
  const [tagData, setTagData] = useState<string[]>([]);
  const [isClear, setIsClear] = useState<boolean>(false);

  useEffect(() => {
    if (iniTag.length == 0) return;
    setTagData([...iniTag]);
  }, [iniTag]);

  useEffect(() => {
    setTagData([]);
    handleChangeData([]);
  }, [resetToggle]);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length === 1 && tagName.length === 0) setIsClear(false);
    setTagName(e.target.value);
  };

  const handleOnKeyUp = (e: React.KeyboardEvent) => {
    if (e.key == "Enter" && tagName) {
      if (tagData.length >= 3) {
        setTagName("");
        return;
      }

      if (tagData.includes(`# ${tagName}`)) {
        setTagName("");
        return;
      }

      const newTagData = [...tagData, `# ${tagName}`];
      setTagName("");
      setTagData(newTagData);
      handleChangeData(newTagData);
    } else if (e.key == "Backspace" && isClear) {
      if (tagData.length > 0) {
        const newTagData = tagData.slice(0, -1);
        setTagData(newTagData);
        handleChangeData(newTagData);
      }
    }

    if (tagName.length === 0) setIsClear(true);
    else setIsClear(false);
  };

  const handleTagDelete = (index: number) => {
    const newTagData = [...tagData];
    newTagData.splice(index, 1);
    setTagData(newTagData);
    handleChangeData(newTagData);
  };

  return (
    <div className="w-[90%] overflow-x-scroll scrollbar-webkit ">
      <div className="flex h-10 w-full flex-row items-center whitespace-nowrap">
        {tagData.map((tag, index) => (
          <div
            key={index}
            className="mr-3 rounded-3xl bg-green-100 px-4 py-1 font-light text-green-600 hover:cursor-pointer"
            onClick={() => handleTagDelete(index)}
          >
            {tag}
          </div>
        ))}
        <input
          type="text"
          value={tagName}
          className={` ml-2 h-7 w-48 bg-main-200 text-base tracking-[0.07em]  focus:outline-none ${tagData.length === 3 ? "placeholder-red-400" : "placeholder-[#868E96]"}`}
          placeholder={`해시태그 입력. (${tagData.length}/3)`}
          onChange={handleTagChange}
          onKeyUp={(e) => {
            if (tagName.length == 1 && e.key == "Backspace") return;
            handleOnKeyUp(e);
          }}
        />
      </div>
    </div>
  );
};

export default Tag;
