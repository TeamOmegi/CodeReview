import { Editor } from "@tiptap/react";
import { Icon } from "./Icons";

interface ToolBarProps {
  editor: Editor | null;
}

function ToolBar({ editor }: ToolBarProps) {
  if (!editor) return null;

  return (
    <div className="flex w-full items-center border-b-2 px-8 py-2 sm:gap-10">
      <div className="flex items-center justify-center gap-3">
        <Icon.H1 editor={editor} />
        <Icon.H2 editor={editor} />
        <Icon.H3 editor={editor} />
        <Icon.H4 editor={editor} />
      </div>
      <div className="flex items-center justify-center gap-3">
        <Icon.Bold editor={editor} />
        <Icon.Italic editor={editor} />
        <Icon.Strikethrough editor={editor} />
      </div>
      <div className="flex items-center justify-center gap-3">
        <Icon.Code editor={editor} />
        <Icon.CodeBlock editor={editor} />
        <Icon.Quote editor={editor} />
        {/* <Icon.AddPhoto editor={editor} /> */}
      </div>
    </div>
  );
}

export default ToolBar;
