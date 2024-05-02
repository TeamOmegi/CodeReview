import { Editor } from "@tiptap/react";
import { Icon } from "./Icons";

interface ToolBarProps {
  editor: Editor | null;
}

function ToolBar({ editor }: ToolBarProps) {
  if (!editor) return null;

  return (
    <div className="flex w-full items-center justify-center border-b-2 p-6 py-3 sm:gap-5">
      <div className="flex items-center justify-center gap-2">
        <Icon.H1 editor={editor} />
        <Icon.H2 editor={editor} />
        <Icon.H3 editor={editor} />
        <Icon.H4 editor={editor} />
      </div>
      <div className="flex items-center justify-center gap-2">
        <Icon.Bold editor={editor} />
        <Icon.Italic editor={editor} />
        <Icon.Strikethrough editor={editor} />
      </div>

      <div className="flex items-center justify-center gap-2">
        <Icon.Code editor={editor} />
        <Icon.CodeBlock editor={editor} />
        <Icon.Quote editor={editor} />
        {/* <Icon.AddPhoto editor={editor} /> */}
      </div>
    </div>
  );
}

export default ToolBar;
