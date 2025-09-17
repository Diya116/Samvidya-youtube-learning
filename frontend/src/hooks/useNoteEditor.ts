import { useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight, all } from "lowlight";
import { type Note } from "@/types/Note";
import { COMMANDS } from "@/constant/SlashMenu";
const lowlight = createLowlight(all);

export function useNoteEditor(note: Note) {
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const executeCommand = (command: (typeof COMMANDS)[0]) => {
  if (!editor) return;

  const { selection } = editor.state;
  const { from } = selection;

  const textBefore = editor.state.doc.textBetween(
    Math.max(0, from - 20),
    from,
    " "
  );

  // Find and delete the slash command
  const slashMatch = textBefore.match(/\/\w*$/);
  if (slashMatch) {
    const deleteFrom = from - slashMatch[0].length;
    editor
      .chain()
      .focus()
      .deleteRange({ from: deleteFrom, to: from })
      .run();
  }

  // Execute the command
  setTimeout(() => {
    console.log("hello")
    command.action(editor);
  }, 0);

  setShowMenu(false);
  setQuery("");
};


  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false, // you already override codeBlock with Lowlight
      heading: { levels: [1, 2, 3] }, // explicitly enable heading levels
      // blockquote: true,
      // bulletList: true,
      // orderedList: true, 
    }),
      CodeBlockLowlight.configure({ lowlight, defaultLanguage: "javascript" }),
    ],
    content: note.content,
    editorProps: {
      handleKeyDown: (view, event) => {
        if (event.key === "/" && !showMenu) {
          setTimeout(() => {
            try {
              const { selection } = view.state;
              const coords = view.coordsAtPos(selection.from);
              const editorRect = view.dom.getBoundingClientRect();

              setMenuPosition({
                top: coords.bottom - editorRect.top + 5,
                left: coords.left - editorRect.left,
              });
              setShowMenu(true);
              setQuery("");
            } catch (error) {
              console.error("Error positioning menu:", error);
            }
          }, 0);
        }
        return false;
      },
    }
  });

  return { editor, showMenu, setShowMenu, query, setQuery, menuPosition,executeCommand };
}
