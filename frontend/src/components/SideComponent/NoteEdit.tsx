import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Title from "../Editor/Title";
import Tag from "../Editor/Tag";
import Toolbar from "../Editor/Toolbar";

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

// import { common, createLowlight } from "lowlight";
import { useQuestion, useWarnning } from "../../hooks/useComfirm";
import { useError } from "../../hooks/useAlert";
import { Note, getNoteData, noteEdit } from "../../api/myNoteAxios";
import useEditorStore from "../../store/useEditorStore";
import { useNavigate } from "react-router-dom";

const NoteEdit = () => {
  const { setNoteType, setShowNote } = useEditorStore();
  const navigate = useNavigate();
  const noteId = parseInt(localStorage.getItem("noteId") || "-1");
  const [noteCategory, setNoteCategory] = useState<string>(""); //ERROR
  const [noteVisibility, setNoteVisibility] = useState<string>(""); //PUBLIC

  const [noteData, setNoteData] = useState<Note>({
    title: "",
    tags: [],
    content: "",
    type: "",
    visibility: "",
    imageUrl: "string",
  });

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
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl w-full h-full focus:outline-none",
      },
    },
  });

  useEffect(() => {
    const getData = async () => {
      const iniNoteData = await getNoteData(noteId);
      setNoteData({
        ...noteData,
        title: iniNoteData.response.title,
        tags: [...iniNoteData.response.tags],
        content: iniNoteData.response.content,
        type: iniNoteData.response.type,
        visibility: iniNoteData.response.visibility,
      });
      setNoteCategory(iniNoteData.response.type);
      setNoteVisibility(iniNoteData.response.visibility);
    };
    getData();
  }, []);

  useEffect(() => {
    editor?.commands.setContent(noteData.content);
  }, [noteData]);

  const handleChangeData = (data: string | string[]): void => {
    if (typeof data === "string") {
      setNoteData({ ...noteData, title: data });
    } else if (typeof data === "object") {
      setNoteData({ ...noteData, tags: [...data] });
    }
  };

  const handleNoteUpdate = async () => {
    if (noteData.title === "") {
      useError({
        title: "Create Error",
        text: "제목을 입력해주세요.",
      });
      return;
    }
    console.log(noteData);
    const result = await useQuestion({
      title: "Note Update",
      fireText: "변경사항을 저장하시겠습니까?",
      resultText: "Note가 수정되었습니다.",
    });

    if (result) {
      await noteEdit(noteId, noteData);
      setShowNote();
      navigate("/omegi/myNote");
      setTimeout(() => {
        setNoteType("create");
      }, 500);
    }
  };

  const handleNoteLeave = async () => {
    const result = await useWarnning({
      title: "NoteEdit Leave",
      fireText: "Note를 저장하시겠습니까?",
      resultText: "Note가 저장되었습니다.",
    });

    if (result) {
      await noteEdit(noteId, noteData);
      setShowNote();
      setTimeout(() => {
        setNoteType("create");
      }, 500);
    } else {
      setShowNote();
      setTimeout(() => {
        setNoteType("create");
      }, 500);
    }
  };

  const handleNoteType = () => {
    if (noteCategory == "NORMAL") {
      setNoteCategory("ERROR");
      setNoteData({ ...noteData, type: "ERROR" });
    } else if (noteCategory == "ERROR") {
      setNoteCategory("NORMAL");
      setNoteData({ ...noteData, type: "NORMAL" });
    }
  };

  const handleVisibility = () => {
    if (noteVisibility == "PUBLIC") {
      setNoteVisibility("PRIVATE");
      setNoteData({ ...noteData, visibility: "PRIVATE" });
    } else if (noteVisibility == "PRIVATE") {
      setNoteVisibility("PUBLIC");
      setNoteData({ ...noteData, visibility: "PUBLIC" });
    }
  };

  return (
    <div className="box-border flex h-full w-full flex-col items-center pb-4 pt-5">
      <div className="flex w-full items-center justify-end px-5">
        <img
          src="/icons/Close.png"
          alt="닫기버튼"
          className="h-6 w-6 hover:cursor-pointer"
          onClick={handleNoteLeave}
        />
      </div>
      <Title iniTitle={noteData.title} handleChangeData={handleChangeData} />
      <Tag iniTag={noteData.tags || []} handleChangeData={handleChangeData} />
      <Toolbar editor={editor} />
      <EditorContent
        className="my-4 box-border w-full flex-1 overflow-y-scroll px-8 scrollbar-webkit"
        editor={editor}
        onBlur={() => {
          console.log("성공!!");
          setNoteData({ ...noteData, content: editor?.getHTML() || "" });
        }}
      />

      <div className="flex h-12 w-full">
        <div className="box-border flex h-12 w-1/2 items-center justify-start pl-6 font-extrabold text-gray-500">
          <div className="mlx-2 flex h-12 w-24 items-center justify-center text-sm">
            <div>공개여부</div>
            <img
              src={
                noteVisibility == "PRIVATE"
                  ? "/icons/UncheckIcon.png"
                  : "/icons/CheckIcon.png"
              }
              className="ml-2 h-5 w-5  hover:cursor-pointer"
              onClick={handleVisibility}
            />
          </div>
          <div className="flex h-12 w-24 items-center justify-center text-sm">
            <div>에러노트</div>
            <img
              src={
                noteCategory == "NORMAL"
                  ? "/icons/UncheckIcon.png"
                  : "/icons/CheckIcon.png"
              }
              className="ml-2 h-5 w-5 hover:cursor-pointer"
              onClick={handleNoteType}
            />
          </div>
        </div>
        <div className="flex h-12 w-1/2 items-center justify-end pr-4">
          <div className="flex h-12 w-24 items-center justify-center">
            <div
              className="flex h-10 w-20 select-none items-center justify-center rounded-2xl border-[2px] border-[#77af9c] bg-main-200 text-sm font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:h-12 hover:w-24 hover:cursor-pointer hover:bg-[#77af9c] hover:text-base hover:text-main-200 hover:duration-200"
              onClick={handleNoteUpdate}
            >
              <div>노트 수정</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEdit;
