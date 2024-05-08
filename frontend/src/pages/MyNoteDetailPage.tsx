import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

import useEditorStore from "../store/useEditorStore";
import { useDanger, useWarnning2 } from "../hooks/useComfirm";

interface ErrorInfo {
  errorId: number;
  errorType: string;
  summary: string;
  solved: boolean;
}

interface NoteDetail {
  noteId: number;
  title: string;
  content: string;
  type: "ERROR" | "NORMAL";
  backlinkCount: number;
  createdAt: string;
  error: ErrorInfo;
}

const MyNoteDetailPage = () => {
  const noteId = parseInt(useParams().noteId || "-1");
  const { showNote, noteType, isWriting, setShowNote, setNoteType } =
    useEditorStore();
  const [note, setNote] = useState<NoteDetail | null>({
    noteId: 1,
    title: "여기는 My..Note..Detail이다.. ",
    content: "<pre><code>ㅋㅋㅋㅋㅋㅋㅋㅋㅋ</code></pre>",
    type: "ERROR",
    backlinkCount: 3,
    createdAt: "2024-05-05",
    error: {
      errorId: 2,
      errorType: "NullPointException",
      summary: "에러 요약",
      solved: true,
    },
  });

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
        return;
      } else {
        if (!showNote) setShowNote();
        setNoteType("edit");
      }
    }
  };

  const handleNoteDelete = async () => {
    const result = await useDanger({
      title: "노트를 삭제하시겠습니까?",
      fireText: "영구적으로 삭제됩니다.",
    });

    if (result) noteDelete(noteId);
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

  useEffect(() => {
    if (noteId === -1) return;
    localStorage.setItem("noteId", `${noteId}`);

    const getNoteDetail = async () => {
      try {
        const noteDetailData = await getNoteData(noteId);
        setNote(noteDetailData);
      } catch (error) {
        console.error(
          "노트 상세 정보를 불러오는 중 오류가 발생했습니다:",
          error,
        );
      }
    };
    //getNoteDetail();
  }, [noteId]);

  return (
    <div className="bg-default">
      <div className="box-border flex h-full w-full flex-col rounded-xl p-10 text-black">
        <div className="flex h-[15%] w-full flex-col  border-b-2 ">
          <div className="ml-2 mt-10 flex items-center justify-start text-3xl font-bold">
            <h2>note.title </h2>
          </div>
          <div className="text-md mr-5 box-border flex justify-end p-2 ">
            <p className="mx-2">{note?.createdAt}</p>
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
        <hr />
        <div className="box-border flex h-auto w-full flex-col border-b p-7">
          <EditorContent
            className="pointer-events-none box-border w-full flex-1 overflow-y-scroll px-8 py-4 scrollbar-webkit"
            editor={editor}
          />
          <br />
          <div>
            {note && note.type === "ERROR" ? (
              <>
                <p>에러 요약: {note.error.summary}</p>
                <p>
                  해결 여부: {note.error.solved ? "해결됨" : "해결되지 않음"}
                </p>
              </>
            ) : (
              <p>에러가 없습니다.</p>
            )}
          </div>
        </div>
        <hr />
        <div className="box-border flex h-auto w-full p-3">
          <img
            src="/public/icons/BacklinkIcon.png"
            alt="백링크"
            className="h-5 w-5"
          />
          <p className="ml-1 text-base">{note?.backlinkCount}개</p>
        </div>
        <div className="box-border flex h-auto w-full bg-gray-500 p-5">
          댓글
        </div>
      </div>
    </div>
  );
};

export default MyNoteDetailPage;
