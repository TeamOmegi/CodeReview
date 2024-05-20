import { useEffect, useState } from "react";
import MyNoteContainer from "../MyNote/NoteList/MyNoteContainer";
import { getAllMyNoteData } from "../../api/myNoteAxios";
interface MyNote {
  noteId: number;
  title: string;
  content: string;
  tags: string[];
  visibility: boolean;
  createdAt: string;
}
const NoteLink = () => {
  const [noteList, setNoteList] = useState<MyNote[]>([]);

  useEffect(() => {
    const getData = async () => {
      const allMyNoteData = await getAllMyNoteData("");
      setNoteList(allMyNoteData.response.notes);
    };

    getData();
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-[5%] w-full items-center justify-center whitespace-nowrap">
        <div className="h-full overflow-visible text-2xl font-bold">
          연결할 노트를 선택하세요.
        </div>
      </div>
      <div className="scrollBar h-[80%] w-[90%] overflow-hidden whitespace-nowrap">
        <MyNoteContainer notes={noteList} type="link" />
      </div>
    </div>
  );
};

export default NoteLink;
