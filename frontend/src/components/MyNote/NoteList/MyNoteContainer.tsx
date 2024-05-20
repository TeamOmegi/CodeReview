import { useNavigate } from "react-router-dom";
import { noteDelete } from "../../../api/myNoteAxios";
import { useDanger, useQuestion, useWarnning } from "../../../hooks/useComfirm";
import { linkCheck, linkCreate, linkDelete } from "../../../api/noteGraphAxios";
import useLinkStore from "../../../store/useLinkStore";
import { useError } from "../../../hooks/useAlert";
import useEditorStore from "../../../store/useEditorStore";
import useMyNoteStore from "../../../store/useMyNoteStore";

interface Props {
  selectedTag?: string;
  showErrorOnly: boolean;
  type?: string;
}

interface MyNote {
  noteId: number;
  title: string;
  content: string;
  type: string;
  tags: string[];
  visibility: string;
  createdAt: string;
  imageUrl: string;
}

const MyNoteContainer = ({ selectedTag, showErrorOnly, type }: Props) => {
  const { setShowNote, setNoteType } = useEditorStore();
  const { linkTarget } = useLinkStore();
  const { noteList, setNoteDelete } = useMyNoteStore();
  const navigate = useNavigate();

  const handleNoteClick = (note: MyNote) => {
    navigate(`/omegi/myNote/${note.noteId}`);
  };

  const handleNoteDelete = async (
    e: React.MouseEvent,
    noteId: number,
    index: number,
  ) => {
    e.stopPropagation();
    const result = await useDanger({
      title: "노트를 삭제하시겠습니까?",
      fireText: "영구적으로 삭제됩니다.",
    });

    if (result) {
      noteDelete(noteId);
      setNoteDelete(index);
    }
  };

  const handleNoteLink = async (linkeSource: number) => {
    if (linkTarget === linkeSource) {
      useError({
        title: "Link Error",
        text: "같은 노트는 연결할 수 없습니다.",
      });
      return;
    }
    //노트체크
    const checked1 = await linkCheck(linkeSource, linkTarget);
    const checked2 = await linkCheck(linkTarget, linkeSource);
    if (checked1 || checked2) {
      // 이미 연결된 노트입니다.
      const result = await useWarnning({
        title: "Link Delete",
        fireText: "Note 연결을 끊겠습니까?",
        resultText: "Note가 연결을 끊었습니다.",
      });
      if (result) {
        if (checked1) {
          linkDelete(linkeSource, linkTarget);
        }
        if (checked2) {
          linkDelete(linkTarget, linkeSource);
        }
      } else return;
    } else {
      const result = await useQuestion({
        title: "Link Create",
        fireText: "Note를 연결하시겠습니까?",
        resultText: "Note가 연결되었습니다.",
      });
      if (result) {
        linkCreate(linkeSource, linkTarget);
      } else return;
    }
    setShowNote();
    setTimeout(() => {
      setNoteType("create");
    }, 1000);
  };

  return (
    <div className="mt-2 flex h-full w-full flex-wrap overflow-y-scroll scrollbar-webkit">
      <div
        className="box-border flex flex-wrap"
        style={{ maxWidth: "calc(100% - 16px)" }}
      >
        {noteList.map((note, index) => {
          if (showErrorOnly && note.type !== "ERROR") return null;
          if (
            selectedTag &&
            selectedTag !== "" &&
            !note.tags.includes(selectedTag)
          )
            return null;

          return (
            <div
              key={index}
              className="m-2 box-border flex h-[350px] w-[200px] flex-col justify-between rounded-xl border-[1px] bg-white p-2 shadow-lg hover:cursor-pointer"
              onClick={
                type === "link"
                  ? () => {
                      handleNoteLink(note.noteId);
                    }
                  : () => {
                      handleNoteClick(note);
                    }
              }
            >
              <div className="box-border flex h-[320px] w-full flex-col justify-between rounded-lg border-gray-300">
                <div className="h-2/3">
                  <img
                    src={note.imageUrl}
                    alt="임시 이미지"
                    className="h-full w-full rounded-lg"
                  />
                </div>
                <div className="ml-1 mt-2 box-border flex h-1/3 w-full flex-col justify-between">
                  <h3 className="mx-1 line-clamp-1 text-ellipsis whitespace-normal text-lg font-semibold">
                    {note.title}
                  </h3>
                  <p className="box-border line-clamp-2 text-ellipsis whitespace-normal pl-1 text-sm">
                    {note.content}
                  </p>
                  <div className="flex flex-wrap">
                    {note.tags.length > 0 ? (
                      note.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="m-1 flex w-auto bg-green-100 text-xs font-light text-green-600"
                        >
                          {tag.length > 7 ? `${tag.slice(0, 7)}..` : tag}
                        </span>
                      ))
                    ) : (
                      <span className="m-1 flex w-auto bg-transparent text-xs font-light text-transparent"></span>
                    )}
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <p className="text-xs text-gray-500">
                    {note.createdAt.split("T")[0]}
                  </p>
                  <img
                    src="/icons/DeleteIcon1.png"
                    alt="삭제 아이콘"
                    className="mx-3 h-4 w-4"
                    onClick={(e) => handleNoteDelete(e, note.noteId, index)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyNoteContainer;
