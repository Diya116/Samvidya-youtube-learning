import { useState } from "react";
import { useEditor } from "@tiptap/react";
import type{ Note, SaveStatus } from "@/types/Note";
import { getEditorExtensions } from "../config/editor-config";
import { deleteSlashCommand, findSlashCommand } from "@/utils/noteeditor/slash-command-utils";

export const useNoteEditor = (
  note: Note,
  setNote: React.Dispatch<React.SetStateAction<Note>>,
  setSaveStatus: (status: SaveStatus) => void,
  slashMenuHandlers: any
) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const editor = useEditor({
    extensions: getEditorExtensions(),
    content: note.content,
    editorProps: {
      handleKeyDown: (view, event) => {
        const { showMenu, closeMenu, navigateUp, navigateDown, filteredCommands, selectedIndex } = slashMenuHandlers;

        // Handle slash command menu navigation
        if (showMenu) {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            navigateDown();
            return true;
          }

          if (event.key === "ArrowUp") {
            event.preventDefault();
            navigateUp();
            return true;
          }

          if (event.key === "Enter") {
            event.preventDefault();
            if (filteredCommands.length > 0) {
              executeCommand(filteredCommands[selectedIndex]);
            }
            return true;
          }

          if (event.key === "Escape") {
            event.preventDefault();
            closeMenu();
            return true;
          }
        }

        // Show slash command menu
        if (event.key === "/" && !showMenu) {
          setTimeout(() => {
            const { selection } = view.state;
            const { from } = selection;

            try {
              const coords = view.coordsAtPos(from);
              const editorElement = view.dom.closest(".editor-container");
              const editorRect = editorElement?.getBoundingClientRect() || view.dom.getBoundingClientRect();
              
              slashMenuHandlers.openMenu(coords, editorRect);
            } catch (error) {
              console.error("Error positioning menu:", error);
            }
          }, 0);
        }

        // Undo/Redo
        if ((event.ctrlKey || event.metaKey) && event.key === "z" && !event.shiftKey) {
          event.preventDefault();
          editor?.chain().focus().undo().run();
          return true;
        }

        if (
          (event.ctrlKey || event.metaKey) &&
          (event.key === "y" || (event.key === "z" && event.shiftKey))
        ) {
          event.preventDefault();
          editor?.chain().focus().redo().run();
          return true;
        }

        return false;
      },
    },
    onUpdate: ({ editor }) => {
      setSaveStatus('unsaved');
      setNote((prev: Note) => ({ ...prev, content: editor.getHTML() }));
      setShowPlaceholder(editor.isEmpty);

      const { selection } = editor.state;
      const { from } = selection;
      const textBefore = editor.state.doc.textBetween(Math.max(0, from - 10), from, " ");

      if (slashMenuHandlers.showMenu) {
        const slashMatch = findSlashCommand(textBefore);
        if (slashMatch) {
          slashMenuHandlers.updateQuery(slashMatch[1]);
        } else if (!textBefore.includes("/")) {
          slashMenuHandlers.closeMenu();
        }
      }
    },
    onFocus: () => {
      setShowPlaceholder(editor?.isEmpty ?? true);
    },
    onBlur: () => {
      setShowPlaceholder(editor?.isEmpty ?? true);
    },
  });

  const executeCommand = (command: any) => {
    if (!editor) {
      console.error("Editor not available");
      return;
    }

    const { selection } = editor.state;
    const { from } = selection;

    deleteSlashCommand(editor, from);
    slashMenuHandlers.closeMenu();

    setTimeout(() => {
      try {
        command.action(editor);
        editor.commands.focus();
      } catch (error) {
        console.error("Error executing command:", error);
      }
    }, 10);
  };

  return { editor, showPlaceholder, executeCommand };
};
