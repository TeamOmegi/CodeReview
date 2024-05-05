import { useRef, useState } from "react";

interface Props {
  handleChangeData(data: string[]): void;
}

const Tag = ({ handleChangeData }: Props) => {
  const [tagName, setTagName] = useState<string>("");
  const [tagData, setTagData] = useState<string[]>([]);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

      setTagData([...tagData, `# ${tagName}`]);
      setTagName("");
    } else if (e.key == "Backspace" && tagName == "") {
      if (tagData.length > 0) {
        setTagData(tagData.slice(0, -1));
      }
    }
  };

  const handleTagDelete = (index: number) => {
    const newTagData = [...tagData];
    newTagData.splice(index, 1);
    setTagData(newTagData);
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
          onKeyUp={handleOnKeyUp}
        />
      </div>
    </div>
  );
};

export default Tag;
