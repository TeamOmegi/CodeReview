import { useEffect, useState } from "react";
import { getAllMyNoteData, getAllTags } from "../../../api/myNoteAxios";
import MyNoteContainer from "./MyNoteContainer";
import CustomSelect from "./CustomSelect";

interface MyNote {
  noteId: number;
  title: string;
  content: string;
  tags: string[];
  visibility: boolean;
  createdAt: string;
}

const NoteList = () => {
  const [noteList, setNoteList] = useState<MyNote[]>([]);
  const [allTag, setAllTag] = useState<string[]>([]);
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      const allMyNoteData = await getAllMyNoteData("");
      const allTagData = await getAllTags();
      console.log("성공", allMyNoteData.response);
      console.log("성공", allTagData);

      setNoteList(allMyNoteData.response.notes);
      setAllTag([...allTagData.response.tags]);
    };

    getData();
  }, []);

  const handleSearch = async () => {
    const allMyNoteData = await getAllMyNoteData(searchKeyWord);
    setNoteList([...allMyNoteData.response.notes]);
  };

  const handleSelectTag = (tag: string) => {
    setSelectedTag(tag);
  };

  return (
    <div className="box-border flex h-full w-full flex-col items-center justify-center rounded-xl p-5 text-xl text-black">
      <div className="flex h-[10%] w-full items-center justify-between">
        <CustomSelect options={allTag} handleSelectTag={handleSelectTag} />
        <div className=" mr-10 mt-2 flex h-10 w-1/3 rounded-2xl border-[1px] border-gray-400 bg-white pl-2 text-sm focus-within:border-secondary-400 focus-within:ring focus-within:ring-secondary-200">
          <input
            type="text"
            placeholder="내 노트를 검색하세요!"
            value={searchKeyWord}
            onChange={(e) => setSearchKeyWord(e.target.value)}
            onKeyUp={(e) => {
              if (e.key == "Enter") handleSearch();
            }}
            className="ml-2 h-full w-full bg-transparent text-sm text-gray-700 outline-none"
          />
          <img
            src="/icons/SearchIcon.png"
            alt="검색"
            className="mr-3 mt-2 h-5 w-5 hover:cursor-pointer"
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
