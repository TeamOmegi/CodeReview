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
    profileImageUrl: string;
    username: string;
  };
}

const allNoteSample: AllNote[] = [
  {
    noteId: 1,
    title: "손민기는 보아라",
    content: "손민기 고해림 화이팅",
    createdAt: "2024-05-04",
    isMine: false,
    user: {
      profileImageUrl: "이미지 url",
      username: "사용자1",
    },
  },
  {
    noteId: 2,
    title: "도하이 오화이팅",
    content:
      "휴우~~ 범죄도시 보고올게~~ㅁㄴ이ㅏ럼인;ㅏ러민ㅇ라ㅓ as;dkfa;ldsfk;alsdkf;lqwkerpoksa;ldkfjpqjfklnlk미ㅏㅇ너림ㅇ나ㅓ림ㄴ아ㅓ림;ㅏㅇ널;ㅣ바젇게ㅓㅇ리마너리마ㅓㄴㅇ리마ㅓㅇㄴ리ㅏ먼ㅇ리ㅏㅓㅂㅈ대ㅓ갠우리ㅏㅟ;ㅁ런ㅁ애ㅣㅏ러먼우치ㅏㅜ티ㅏ;ㅡㅜㅁ니;아ㅓ렙저덱'ㅐ버ㅔㅈ라이너므;ㅣㅓ리먼ㅇ'ㄹ;ㅂ저ㅐㅔ다거;안렁ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ미ㅏㄴㅇㄹ;'ㅣ",
    createdAt: "2024-05-04",
    isMine: true,
    user: {
      profileImageUrl: "이미지 url",
      username: "사용자2",
    },
  },
];

const AllNoteList = () => {
  const [allNoteList, setAllNoteList] = useState<AllNote[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  useEffect(() => {
    const getAllNote = async () => {
      const allNoteList = await getAllNoteList("");
      setAllNoteList([...allNoteList]);
    };

    setAllNoteList([...allNoteSample]);
  }, []);

  const handleSearch = async () => {
    const allNoteList = await getAllNoteList(searchKeyword);
    setAllNoteList([...allNoteList]);
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
            src="../public/icons/SearchIcon.png"
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
