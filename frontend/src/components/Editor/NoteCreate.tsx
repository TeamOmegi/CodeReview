import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Toolbar from "./Toolbar";
import Tag from "./Tag";

//tiptap
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import { common, createLowlight } from "lowlight";
import Title from "./Title";

interface NoteProprs {
  content: string;
}

const NoteCreate = ({ content }: NoteProprs) => {
  const [submitContent, setSubmitContent] = useState<string | undefined>("");
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
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl w-full h-full focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (content) {
      editor?.commands.setContent(content);
    }
  }, [content]);

  useEffect(() => {
    if (submitContent) {
      console.log("적용완료");
      editor?.commands.setContent(submitContent);
    }
  }, [submitContent]);

  const handleNoteCreate = () => {
    setSubmitContent(editor?.getHTML());
  };

  return (
    <div className="box-border flex h-full w-full flex-col items-center pb-4 pt-8">
      <Title />
      <Tag />
      <Toolbar editor={editor} />
      <EditorContent
        className="box-border h-[60%] w-full overflow-y-scroll px-4 py-4 scrollbar-webkit"
        editor={editor}
      />

      <div className="flex h-14 w-full items-center justify-end pr-4">
        <div className="flex h-14 w-28 items-center justify-center">
          <div
            className="bg-main-200 hover:text-main-200 flex h-12 w-24 select-none items-center justify-center rounded-2xl border-[2px] border-[#F2527D] text-base font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:h-14 hover:w-28 hover:cursor-pointer hover:bg-[#F2527D] hover:text-lg hover:duration-200"
            onClick={handleNoteCreate}
          >
            <div>초기화</div>
          </div>
        </div>
        <div className="flex h-14 w-28 items-center justify-center">
          <div
            className="bg-main-200 hover:text-main-200 flex h-12 w-24 select-none items-center justify-center rounded-2xl border-[2px] border-[#77af9c] text-base font-extrabold text-[#868E96] shadow-[0_15px_35px_rgba(0,0,0,0.2)] hover:h-14 hover:w-28 hover:cursor-pointer hover:bg-[#77af9c] hover:text-lg hover:duration-200"
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
