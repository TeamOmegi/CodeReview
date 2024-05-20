import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteData, noteDelete } from "../api/myNoteAxios";
import { EditorContent, useEditor } from "@tiptap/react";

//tiptap
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";

//lowlight
import { lowlight } from "lowlight/lib/core";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";

import { useDanger, useWarnning2 } from "../hooks/useComfirm";
import CommentContainer from "../components/Comment/CommentContainer";
import useEditorStore from "../store/useEditorStore";
import useLinkStore from "../store/useLinkStore";

interface User {
  userId?: number;
  profileImageUrl: string;
  username: string;
}

interface ErrorInfo {
  errorId: number;
  errorType: string;
  summary: string;
  solved: boolean;
}

interface NoteDetail {
  noteId: number;
  title: string;
  tags: string[];
  content: string;
  type: "ERROR" | "NORMAL";
  backlinkCount: number;
  createdAt: string;
  error: ErrorInfo | null;
}

const MyNoteDetailPage = () => {
  const navigate = useNavigate();
  const noteId = parseInt(useParams().noteId || "-1");
  const userId = parseInt(useParams().userId || "-1");
  const { showNote, noteType, isWriting, setShowNote, setNoteType } =
    useEditorStore();
  const { setLinkTarget } = useLinkStore();
  const [note, setNote] = useState<NoteDetail | null>(null);

  useEffect(() => {
    if (noteId === -1) return;
    localStorage.setItem("noteId", `${noteId}`);
    setLinkTarget(noteId);
    getNoteDetail();
  }, [noteId]);

  useEffect(() => {
    if (note?.content == undefined) return;
    editor?.commands.setContent(note?.content);
  }, [note]);

  const getNoteDetail = async () => {
    try {
      const noteDetailData = await getNoteData(noteId);
      setNote({ ...noteDetailData.response });
    } catch (error) {
      console.error("노트 상세 정보를 불러오는 중 오류가 발생했습니다:", error);
    }
  };

  const handleNoteEdit = async () => {
    if (noteType === "create") {
      if (isWriting) {
        const result = await useWarnning2({
          title: "노트를 수정하시겠습니까?",
          fireText: "이전 변경사항은 저장되지 않습니다.",
        });

        if (result) {
          if (!showNote) setShowNote();
          setNoteType("edit");
        }
      } else {
        if (!showNote) setShowNote();
        setNoteType("edit");
      }
    } else if (noteType == "link") {
      if (!showNote) setShowNote();
      setNoteType("edit");
    }
  };

  const handleNoteDelete = async () => {
    const result = await useDanger({
      title: "노트를 삭제하시겠습니까?",
      fireText: "영구적으로 삭제됩니다.",
    });

    if (result) {
      noteDelete(noteId);
      navigate(-1);
    }
  };

  const handleExit = () => {
    navigate(-1);
  };

  const hadleBackLink = async () => {
    if ((noteType === "create" && isWriting) || noteType === "edit") {
      const result = await useWarnning2({
        title: "노트 연결로 이동하시겠습니까?",
        fireText: "작성중인 노트는 저장되지 않습니다.",
      });

      if (result) {
        if (!showNote) setShowNote();
        setNoteType("link");
      }
      return;
    } else if (noteType === "create") {
      if (!showNote) {
        setShowNote();
      }
      setNoteType("link");
    } else {
      if (showNote) {
        setShowNote();
        setTimeout(() => {
          setNoteType("create");
        }, 1000);
      }
    }
  };

  lowlight.registerLanguage("html", html);
  lowlight.registerLanguage("css", css);
  lowlight.registerLanguage("js", js);
  lowlight.registerLanguage("ts", ts);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Image.configure({ inline: true, allowBase64: true }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "language-js",
        },
        languageClassPrefix: "language-",
        defaultLanguage: "plaintext",
      }),
    ],
    content: note?.content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl w-full h-full focus:outline-none",
      },
    },
  });

  return (
    <div className="bg-default">
      <div className="box-border flex h-full w-full flex-col rounded-xl  p-10 text-black">
        <div className="flex h-auto w-full flex-col  border-b-2 ">
          <div className="hover:cursor-pointer">
            <img
              src="/icons/PageBackIcon2.png"
              onClick={handleExit}
              className="h-6 w-6"
            />
          </div>
          <div className="ml-3 mt-4 box-border h-fit w-fit rounded-2xl border-2 border-primary-400 bg-primary-100 p-1 text-sm">
            {note && note.type === "ERROR" ? <p>에러노트</p> : <p>일반노트</p>}
          </div>
          <div className="ml-3 mt-2 flex items-center justify-start text-3xl font-bold">
            <h2>{note?.title}</h2>
          </div>
          <div className="text-md ml-3 mr-5 mt-1 box-border flex justify-between p-2 ">
            <div className="flex items-center">
              {note?.tags.map((tag, index) => (
                <div
                  key={index}
                  className="mr-3 rounded-3xl bg-green-100 px-4 py-1 font-light text-green-600 "
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="flex items-end">
              <p className="mx-2">{note?.createdAt.split("T")[0]}</p>
              <p
                className="mx-2 text-gray-500 hover:cursor-pointer"
                onClick={handleNoteEdit}
              >
                수정
              </p>
              <p
                className="hover:cusor-pointer mx-2 text-red-400"
                onClick={handleNoteDelete}
              >
                삭제
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className=" h-full w-full overflow-y-scroll scrollbar-webkit">
          <div className="box-border flex h-auto w-full flex-col border-b p-5">
            <EditorContent
              className="pointer-events-none box-border w-full flex-1 overflow-y-scroll px-6 py-4 scrollbar-webkit"
              editor={editor}
            />
            <br />

            {/* <div className="box-border">
              {note && note.type === "ERROR" ? (
                <>
                  <hr />
                  <h3 className="m-5">에러 정보</h3>
                  <p>에러 요약: {note.error?.summary}</p>
                  <p>
                    해결 여부: {note.error?.solved ? "해결됨" : "해결되지 않음"}
                  </p>
                </>
              ) : (
                <p></p>
              )}
            </div> */}
          </div>
          <hr />
          <div className="box-border flex h-auto w-full p-3">
            <img
              src="/icons/BacklinkIcon.png"
              alt="백링크"
              className="h-5 w-5 hover:cursor-pointer"
              onClick={hadleBackLink}
            />
            <p className="ml-1 text-base">{note?.backlinkCount}개</p>
          </div>
          <div className="box-border flex h-auto w-full flex-col justify-center p-3">
            <CommentContainer noteId={noteId} currentUserId={userId} />
          </div>
        </div>
        {/* <div className="m-2 flex h-auto w-[95%] justify-end">
          <button
            className="flex h-10 w-20 select-none items-center justify-center rounded-2xl border-[2px] border-[#77af9c] bg-main-200 text-sm font-extrabold text-[#868E96]  hover:bg-[#77af9c] hover:text-main-200 "
            onClick={handleExit}
          >
            나가기
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default MyNoteDetailPage;
