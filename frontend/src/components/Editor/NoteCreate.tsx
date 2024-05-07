import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Title from "./Title";
import Tag from "./Tag";
import Toolbar from "./Toolbar";

//tiptap
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import { common, createLowlight } from "lowlight";
import { useQuestion, useWarnning } from "../../hooks/useComfirm";
import { useError } from "../../hooks/useAlert";
import { noteCreate } from "../../api/myNoteAxios";

export interface NoteData {
  title: string;
  tag: string[];
  content: string;
}

const NoteCreate = () => {
  const [noteData, setNoteDate] = useState<NoteData>({
    title: "",
    tag: [],
    content: "",
  });

  const lowlight = createLowlight(common);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Image.configure({ inline: true, allowBase64: true }),
      CodeBlockLowlight.configure({
        lowlight,
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

  const handleChangeData = (data: string | string[]): void => {
    if (typeof data === "string") {
      console.log({ ...noteData, title: data });
      setNoteDate({ ...noteData, title: data });
    } else if (typeof data === "object") {
      console.log({ ...noteData, tag: data });
      setNoteDate({ ...noteData, tag: data });
    }
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
      await noteCreate(noteData);
    }
  };

  const handleNoteDelete = async () => {
    const result = await useWarnning({
      title: "Note Initialization",
      fireText: "Note를 초기화하시겠습니까?",
      resultText: "Note가 초기화되었습니다.",
    });

    if (result) console.log("성공");
    else console.log("취소");
  };

  return (
    <div className="box-border flex h-full w-full flex-col items-center pb-4 pt-8">
      <Title iniTitle="" handleChangeData={handleChangeData} />
      <Tag iniTag={[]} handleChangeData={handleChangeData} />
      <Toolbar editor={editor} />
      <EditorContent
        className="box-border w-full flex-1 overflow-y-scroll px-8 py-4 scrollbar-webkit"
        editor={editor}
        onBlur={() => {
          console.log("성공!!");
          setNoteDate({ ...noteData, content: editor?.getHTML() || "" });
        }}
      />

      <div className="flex h-12 w-full items-center justify-end pr-4">
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
  );
};

export default NoteCreate;
