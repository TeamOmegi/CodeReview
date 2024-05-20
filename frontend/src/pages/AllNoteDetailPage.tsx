import { useState, useEffect } from "react";
import CommentContainer from "../components/Comment/CommentContainer";
import { useNavigate, useParams } from "react-router-dom";
import { getAllNoteDetail } from "../api/allNoteAxios";
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
import useEditorStore from "../store/useEditorStore";
import { useWarnning2 } from "../hooks/useComfirm";
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
  user: User;
  noteId: number;
  title: string;
  content: string;
  type: "ERROR" | "NORMAL";
  backlinkCount: number;
  createdAt: string;
  error: ErrorInfo;
}

const AllNoteDetailPage = () => {
  const navigate = useNavigate();
  const noteId = parseInt(useParams().noteId || "-1");
  const userId = parseInt(useParams().userId || "-1");

  const [note, setNote] = useState<NoteDetail | undefined>();
  const { showNote, noteType, isWriting, setShowNote, setNoteType } =
    useEditorStore();
  const { setLinkTarget } = useLinkStore();
  const getNoteDetail = async (noteId: number) => {
    try {
      const response = await getAllNoteDetail(noteId);
      setNote({ ...response });
    } catch (error) {
      console.error("노트 상세 정보를 불러오는 중 오류가 발생했습니다", error);
    }
  };

  useEffect(() => {
    if (noteId === -1) return;
    localStorage.setItem("noteId", `${noteId}`);
    setLinkTarget(noteId);
    getNoteDetail(noteId);
  }, [noteId]);

  useEffect(() => {
    if (note?.content == undefined) return;
    editor?.commands.setContent(note?.content);
  }, [note]);

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

  const handleExit = () => {
    navigate("/omegi/allNote");
  };

  return (
    <div className="bg-default">
      <div className="box-border flex h-full w-full flex-col rounded-xl p-10 text-black">
        <div className="flex h-auto w-full flex-col  border-b-2 ">
          <div className="hover:cursor-pointer">
            <img
              src="/icons/PageBackIcon2.png"
              onClick={handleExit}
              className="h-6 w-6"
            />
          </div>
          <div className="ml-3 mt-7 flex items-center justify-start text-3xl font-bold">
            <h2>{note?.title}</h2>
          </div>
          <div className="text-md mr-5 box-border flex items-center justify-end p-2">
            <img
              src={note?.user.profileImageUrl}
              alt="프로필 이미지"
              className="mr-1 h-5 w-5 rounded-full"
            />
            <p className="mr-5">{note?.user.username}</p>
            <p className="mr-2">{note?.createdAt.split("T")[0]}</p>
          </div>
        </div>
        <hr />
        <div className=" h-full w-full overflow-y-scroll scrollbar-webkit">
          <div className="box-border flex h-auto w-full flex-col border-b p-5">
            {/* <p>{note?.content}</p> */}
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
                  <p>에러 요약: {note.error.summary}</p>
                  <p>
                    해결 여부: {note.error.solved ? "해결됨" : "해결되지 않음"}
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
          <div className="box-border flex h-auto w-full flex-col p-3">
            <CommentContainer noteId={noteId} currentUserId={userId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllNoteDetailPage;
