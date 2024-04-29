import { Editor } from '@tiptap/react';
import ToolbarIcon from './ToolbarIcon';

interface IconProps {
  editor: Editor;
}
export namespace Icon {
  export const H1 = ({ editor }: IconProps) => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? ToolbarIcon.isH1 : ToolbarIcon.isNotH1}
      >
      </button>
    );
  };

  export const H2 = ({ editor }: IconProps) => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? ToolbarIcon.isH2 : ToolbarIcon.isNotH2}
      >
      </button>
    );
  };

  export const H3 = ({ editor }: IconProps) => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? ToolbarIcon.isH3 : ToolbarIcon.isNotH3}
      >
      </button>
    );
  };

  export const H4 = ({ editor }: IconProps) => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? ToolbarIcon.isH4 : ToolbarIcon.isNotH4}
      >
      </button>
    );
  };

  export const Bold = ({ editor }: IconProps) => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? ToolbarIcon.isBold : ToolbarIcon.isNotBold}
      >
      </button>
    );
  };

  export const Italic = ({ editor }: IconProps) => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? ToolbarIcon.isItalic : ToolbarIcon.isNotItailic}
      >
      </button>
    );
  };

  export const Strikethrough = ({ editor }: IconProps) => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? ToolbarIcon.isStrike : ToolbarIcon.isNotStrike}
      >
      </button>
    );
  };

  export const Code = ({ editor }: IconProps) => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('strike') ? ToolbarIcon.isCode : ToolbarIcon.isNotCode}
      >
      </button>
    );
  };

  export const CodeBlock = ({ editor }: IconProps) => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? ToolbarIcon.isCodeBlock : ToolbarIcon.isNotCodeBlock}
      >
      </button>
    );
  };

  export const Quote = ({ editor }: IconProps) => {
    return (
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? ToolbarIcon.isQuote : ToolbarIcon.isNotQuote}
      >
      </button>
    );
  };

  // 미정
  export const AddPhoto = ({ editor }: IconProps) => {
    const onClick = () => {

    };

    return <button onClick={onClick}>Add Photo</button>;
  };
}   
export default Icon;