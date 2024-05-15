import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContentParser } from "../../hooks/useContentParser";

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

interface Props {
  notes: AllNote[];
}

const AllNoteContainer = ({ notes }: Props) => {
  const navigate = useNavigate();
  const [allNotes, setAllNotes] = useState<AllNote[]>([]);

  useEffect(() => {
    if (notes.length === 0) return;
    notes.map((note) => {
      note.content = useContentParser(note.content);
      return note;
    });
    setAllNotes(notes);
  }, [notes]);

  // 노트를 클릭했을 때 상세 페이지로 이동하는 함수
  const handleNoteClick = (note: AllNote) => {
    if (note.isMine) {
      navigate(`/omegi/myNote/${note.noteId}`); // MyNoteDetail 페이지로 이동
    } else {
      navigate(`/omegi/allNote/${note.noteId}`); // AllNoteDetail 페이지로 이동
    }
  };

  return (
    <div className="mt-5 flex h-full w-full flex-shrink-0 flex-col overflow-y-scroll scrollbar-webkit">
      {allNotes.map((note) => (
        <div
          key={note.noteId}
          className="mb-5 ml-5 mr-5 box-border flex items-center justify-between rounded-xl border-[1px] border-gray-300 bg-white py-3 pb-2 pl-3 shadow-lg"
          onClick={() => handleNoteClick(note)}
          style={{ cursor: "pointer" }}
        >
          <div className="box-border flex h-auto w-full flex-col justify-start">
            <div className="box-border flex  flex-col">
              <h3 className="p-1 text-lg font-semibold">{note.title}</h3>
              <p className="mr-5 box-border line-clamp-2 text-ellipsis whitespace-normal px-2 text-sm">
                {note.content}
              </p>
            </div>
            <div className="mb-1 ml-2 mt-2 flex justify-between">
              <div className="flex items-center">
                <img
                  src="../public/icons/ProfileDefault.png"
                  alt="프로필 이미지"
                  className="h-4 w-4 rounded-full"
                />
                <p className="text-xs text-gray-500">{note.user.username}</p>
              </div>
              <div className="mb-1 mr-5 flex">
                <p className="text-xs text-gray-500">
                  {note.createdAt.split("T")[0]}
                </p>
                {note.isMine && (
                  <img
                    src="/icons/DeleteIcon1.png"
                    alt="삭제 아이콘"
                    className="mx-3 h-4 w-4"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllNoteContainer;
