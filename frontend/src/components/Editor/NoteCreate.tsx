import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Toolbar from "./Toolbar";

//tiptap
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";

import { common, createLowlight } from "lowlight";

interface NoteProprs {
  content: string;
}

const NoteCreate = ({ content }: NoteProprs) => {
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
  });

  useEffect(() => {
    if (content) {
      editor?.commands.setContent(content);
    }
  }, [content]);

  return (
    <div className="h-full w-full">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default NoteCreate;
