import { useEffect, useState } from "react";
import { getAllMyNoteData, getAllTags } from "../../../api/myNoteAxios";
import MyNoteContainer from "./MyNoteContainer";
import Select from "react-select";
import CustomSelect from "./CustomSelect";

interface MyNote {
  noteId: number;
  title: string;
  content: string;
  tags: string[];
  visibility: boolean;
  createdAt: string;
}
const tagDummy = ["# 1", "# 2", "# 3", "# 4", "# 5"];
const noteDummy: MyNote[] = [
  {
    noteId: 1,
    title: "깔깔 유머모음집 1",
    content: "Q) 개발자가 좋아하는 향신료는?   A) 깃 허브~",
    createdAt: "2024-05-05",
    visibility: true,
    tags: ["# 1", "# 2", "# 3"],
  },
  {
    noteId: 2,
    title: "어제 내세상이 무너졌어",
    content:
      "취업시켜줘잉~ 취업시켜줘잉~ 취업시켜줘잉~ 취업시켜줘잉~ 취업시켜줘잉~ 취업시켜줘잉~ 취업시켜줘잉~ 취업시켜줘잉~ ",
    createdAt: "2024-05-06",
    visibility: false,
    tags: ["# 3", "# 4", "# 5"],
  },
  {
    noteId: 3,
    title: "어제 내세상이 '또' 무너졌어",
    content: "..",
    createdAt: "2024-05-06",
    visibility: false,
    tags: ["# 3", "# 4", "# 6"],
  },
];

const NoteList = () => {
  const [noteList, setNoteList] = useState<MyNote[]>([]);
  const [allTag, setAllTag] = useState<string[]>([]);
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const allMyNoteData = await getAllMyNoteData("");
      const allTagData = await getAllTags();
      setNoteList([...allMyNoteData]);
      setAllTag([...allTagData]);
    };

    setNoteList([...noteDummy]);
    setAllTag([...tagDummy]);
    //getData();
  }, []);

  const handleSearch = async () => {
    const allMyNoteData = await getAllMyNoteData(searchKeyWord);
    setNoteList([...allMyNoteData]);
  };

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <div className="box-border flex h-full w-full flex-col items-center justify-center rounded-xl p-5 text-xl text-black">
      <div className="flex h-[10%] w-full items-center justify-between">
        <CustomSelect options={allTag} handleSelectTag={handleSelectTag} />
        <div className=" mr-5 mt-2 flex h-10 w-1/3 rounded-2xl border-[1px] border-gray-400 bg-white pl-2 text-sm focus-within:border-secondary-400 focus-within:ring focus-within:ring-secondary-200">
          <input
            type="text"
            placeholder="내 노트를 검색하세요!"
            value={searchKeyWord}
            onChange={(e) => setSearchKeyWord(e.target.value)}
            className="ml-2 h-full w-full bg-transparent text-sm text-gray-700 outline-none"
          />
          <img
            src="../public/icons/SearchIcon.png"
            alt="검색"
            className="mr-2 mt-2 h-4 w-4 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>
      <div className="h-[90%] w-full">
        <MyNoteContainer notes={noteList} selectedTag={selectedTag} />
      </div>
    </div>
  );
};

export default NoteList;
