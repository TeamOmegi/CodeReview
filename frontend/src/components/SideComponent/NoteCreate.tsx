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

import { useQuestion, useWarnning } from "../../hooks/useComfirm";
import { useError } from "../../hooks/useAlert";
import { Note, noteCreate } from "../../api/myNoteAxios";
import useEditorStore from "../../store/useEditorStore";
import useMyNoteStore from "../../store/useMyNoteStore";

const NoteCreate = () => {
  const [resetToggle, setResetToggle] = useState<boolean>(false);
  const { setShowNote, setIsWriting } = useEditorStore();
  const { noteList, setNoteList } = useMyNoteStore();
  const [noteCategory, setNoteCategory] = useState<string>("NORMAL"); //ERROR
  const [noteVisibility, setNoteVisibility] = useState<string>("PRIVATE"); //PUBLIC
  const [noteData, setNoteData] = useState<Note>({
    title: "",
    tags: [],
    content: "",
    type: "NORMAL",
    visibility: "PRIVATE",
    links: [],
    imageUrl: "",
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
    if (
      noteData.title === "" &&
      noteData.tags.length === 0 &&
      (noteData.content == "<p></p>" || noteData.content == "")
    ) {
      setIsWriting(false);
    } else {
      setIsWriting(true);
    }
  }, [noteData]);

  const handleChangeData = (data: string | string[]): void => {
    if (typeof data === "string") {
      setNoteData({ ...noteData, title: data });
    } else if (typeof data === "object") {
      setNoteData({ ...noteData, tags: data });
    }
  };

  const noteImageUrls = [
    "/icons/randomImg1.avif",
    "/icons/randomImg2.avif",
    "/icons/randomImg3.avif",
    "/icons/randomImg4.avif",
    "/icons/randomImg5.avif",
    "/icons/randomImg6.jpeg",
    "/icons/randomImg7.jpeg",
    "/icons/randomImg8.jpeg",
    "/icons/tempImg.png",
    "/icons/tempImg2.avif",
  ];

  const getRandomImageUrl = () => {
    return noteImageUrls[Math.floor(Math.random() * noteImageUrls.length)];
  };

  const handleNoteCreate = async () => {
    if (noteData.title === "") {
      useError({
        title: "Create Error",
        text: "제목을 입력해주세요.",
      });
      return;
    }

    const result = await useQuestion({
      title: "Note Create",
      fireText: "Note를 생성하시겠습니까?",
      resultText: "Note가 생성되었습니다.",
    });

    if (result) {
      const noteDataWithImage = {
        ...noteData,
        imageUrl: getRandomImageUrl(),
      };

      await noteCreate(noteDataWithImage);

      if (noteData.links) delete noteData.links;
      const notes = {
        noteId: noteList[0].noteId,
        title: noteData.title,
        content: noteData.content,
        tags: noteData.tags,
        type: noteCategory,
        visibility: noteVisibility,
        createdAt: new Date().toISOString().split("T")[0],
        imageUrl: "",
      };

      setNoteList([notes, ...noteList]);
      handleNoteReset();
      setShowNote();
    }
  };

  const handleNoteDelete = async () => {
    const result = await useWarnning({
      title: "Note Initialization",
      fireText: "Note를 초기화하시겠습니까?",
      resultText: "Note가 초기화되었습니다.",
    });

    if (result) {
      handleNoteReset();
    } else console.log("취소");
  };

  const handleNoteReset = () => {
    setResetToggle(!resetToggle);
    editor?.commands.setContent("");
  };

  const handleNoteLeave = async () => {
    if (
      noteData.title === "" &&
      noteData.tags.length === 0 &&
      (noteData.content == "<p></p>" || noteData.content == "")
    ) {
      handleNoteReset();
      setShowNote();
      return;
    }

    const result = await useQuestion({
      title: "NoteCreate Leave",
      fireText: "Note를 저장하시겠습니까?",
      resultText: "Note가 저장되었습니다.",
    });

    if (result) {
      await noteCreate(noteData);
      handleNoteReset();
      setShowNote();
    } else {
      handleNoteReset();
      setShowNote();
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
      <Title
        iniTitle=""
        resetToggle={resetToggle}
        handleChangeData={handleChangeData}
      />
      <Tag
        iniTag={[]}
        resetToggle={resetToggle}
        handleChangeData={handleChangeData}
      />
      <Toolbar editor={editor} />
      <EditorContent
        className="my-4 box-border w-full flex-1 overflow-y-scroll px-8 scrollbar-webkit"
        editor={editor}
        onBlur={() => {
          setNoteData({ ...noteData, content: editor?.getHTML() || "" });
        }}
      />

      <div className="flex h-12 w-full">
        <div className="box-border flex h-12 w-1/2 items-center justify-start pl-6 font-extrabold text-gray-500">
          <div className="mx-2 flex h-12 w-24 items-center justify-center text-sm">
            <div>공개여부</div>
            <img
              src={
                noteVisibility == "PRIVATE"
                  ? "/icons/UncheckIcon.png"
                  : "/icons/CheckIcon.png"
              }
              className="ml-2 h-5 w-5 hover:cursor-pointer"
              onClick={handleVisibility}
            />
          </div>
          <div className="mx-2 flex h-12 w-24 items-center justify-center text-sm">
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
              className="flex h-10 w-20 select-none items-center justify-center rounded-2xl border-[2px] border-[#F2527D] bg-main-200 text-sm font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:h-12 hover:w-24 hover:cursor-pointer hover:bg-[#F2527D] hover:text-base hover:text-main-200 hover:duration-200"
              onClick={handleNoteDelete}
            >
              <div>초기화</div>
            </div>
          </div>
          <div className="flex h-12 w-24 items-center justify-center">
            <div
              className="flex h-10 w-20 select-none items-center justify-center rounded-2xl border-[2px] border-[#77af9c] bg-main-200 text-sm font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:h-12 hover:w-24 hover:cursor-pointer hover:bg-[#77af9c] hover:text-base hover:text-main-200 hover:duration-200"
              onClick={handleNoteCreate}
            >
              <div>노트 작성</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCreate;
