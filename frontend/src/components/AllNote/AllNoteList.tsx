import React, { useEffect, useState } from "react";
import { getAllNoteList } from "../../api/allNoteAxios";
import AllNoteContainer from "./AllNoteContainer";

interface AllNote {
  noteId: number;
  title: string;
  content: string;
  createdAt: string;
  isMine: boolean;
  user: {
    userId: number;
    profileImageUrl: string;
    username: string;
  };
}

const AllNoteList = () => {
  const [allNoteList, setAllNoteList] = useState<AllNote[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const getAllNotes = async () => {
    try {
      const allNotesResponse = await getAllNoteList(searchKeyword);
      console.log("히히 오줌발싸", allNotesResponse.notes);

      setAllNoteList([...allNotesResponse.notes]);
    } catch (error) {
      console.error("Fail getAllNotes ", error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const handleSearch = () => {
    getAllNotes();
  };

  return (
    <div className="box-border flex h-full w-full flex-col items-center justify-center rounded-xl p-5 text-xl text-black">
      <div className="flex h-[10%] w-full items-center justify-end">
        <div className=" mr-10 mt-2 flex h-10 w-1/3 rounded-2xl border-[1px] border-gray-400 bg-white pl-2 text-sm focus-within:border-secondary-400 focus-within:ring focus-within:ring-secondary-200">
          <input
            type="text"
            placeholder="여기에 검색해보세요!"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="ml-2 h-full w-full bg-transparent text-sm text-gray-700 outline-none"
          />
          <img
            src="/icons/SearchIcon.png"
            alt="검색"
            className="mr-3 mt-2 h-5 w-5 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>
      <div className="flex h-[90%] w-full">
        <AllNoteContainer notes={allNoteList} />
      </div>
    </div>
  );
};

export default AllNoteList;
