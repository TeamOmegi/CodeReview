import { useNavigate } from "react-router-dom";
import { useDanger } from "../../hooks/useComfirm";
import { noteDelete } from "../../api/myNoteAxios";
import useALLNoteStore from "../../store/useAllNoteStore";

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
  imageUrl: string;
}

const AllNoteContainer = () => {
  const navigate = useNavigate();
  const { allNoteList } = useALLNoteStore();

  const handleNoteDelete = async (e: React.MouseEvent, noteId: number) => {
    e.stopPropagation();
    const result = await useDanger({
      title: "노트를 삭제하시겠습니까?",
      fireText: "영구적으로 삭제됩니다.",
    });

    if (result) noteDelete(noteId);
  };

  const handleNoteClick = (note: AllNote) => {
    if (note.isMine) {
      navigate(`/omegi/myNote/${note.noteId}`);
    } else {
      navigate(`/omegi/allNote/${note.noteId}`);
    }
  };

  return (
    <div className="mx-3 mt-5 flex h-full w-full flex-shrink-0 flex-col overflow-y-scroll scrollbar-webkit">
      <div className="flex flex-wrap ">
        {allNoteList.map((note) => (
          <div
            key={note.noteId}
            className="mx-5 mb-3 mr-3 box-border flex w-[500px] items-center rounded-xl border-[1px] border-gray-300 bg-white py-3 pb-2 pl-3 shadow-lg"
            onClick={() => handleNoteClick(note)}
            style={{ cursor: "pointer" }}
          >
            <div className="box-border flex h-full w-full justify-start ">
              <div className="h-fit w-fit">
                <img
                  src={note.imageUrl}
                  alt="민기 이미지"
                  className="h-28 w-40 rounded-lg"
                />
              </div>
              <div className="ml-5 box-border flex w-full flex-col justify-between">
                <div className="box-border flex flex-col">
                  <h3 className="p-1 text-lg font-semibold">{note.title}</h3>
                  <p className="box-border line-clamp-2 text-ellipsis whitespace-normal px-2 text-sm">
                    {note.content}
                  </p>
                </div>
                <div className="mb-1 flex items-end justify-between">
                  <div className="ml-1 flex items-center">
                    <img
                      src={
                        note.user.profileImageUrl || "/icons/ProfileDefault.png"
                      }
                      alt="프로필 이미지"
                      className="mr-1 h-4 w-4 rounded-full"
                    />
                    <p className="text-xs text-gray-500">
                      {note.user.username}
                    </p>
                  </div>
                  <div className="mr-4 flex items-center">
                    <p className="mr-3 text-xs text-gray-500">
                      {note.createdAt.split("T")[0]}
                    </p>
                    {note.isMine && (
                      <img
                        src="/icons/DeleteIcon1.png"
                        alt="삭제 아이콘"
                        className="h-4 w-4"
                        onClick={(e) => handleNoteDelete(e, note.noteId)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNoteContainer;
