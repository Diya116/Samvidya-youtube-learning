import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import { createLowlight, all } from "lowlight";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/axiosInstance";
import { X } from "lucide-react";
import {
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code,
  Quote,
  Minus,
} from "lucide-react";

export const COMMANDS = [
  {
    name: "Heading 1",
    icon: Heading1,
    action: (editor: any) => {
      console.log("Executing Heading 1");
      const result = editor.chain().focus().toggleHeading({ level: 1 }).run();
      console.log("Heading 1 result:", result);
      return result;
    },
  },
  {
    name: "Heading 2",
    icon: Heading2,
    action: (editor: any) => {
      console.log("Executing Heading 2");
      const result = editor.chain().focus().toggleHeading({ level: 2 }).run();
      console.log("Heading 2 result:", result);
      return result;
    },
  },
  {
    name: "Heading 3",
    icon: Heading3,
    action: (editor: any) => {
      console.log("Executing Heading 3");
      const result = editor.chain().focus().toggleHeading({ level: 3 }).run();
      console.log("Heading 3 result:", result);
      return result;
    },
  },
  {
    name: "Bullet List",
    icon: List,
    action: (editor: any) => {
      console.log("Executing Bullet List");
      console.log("Can toggle bullet list:", editor.can().toggleBulletList());
      const result = editor.chain().focus().toggleBulletList().run();
      console.log("Bullet List result:", result);
      return result;
    },
  },
  {
    name: "Numbered List",
    icon: ListOrdered,
    action: (editor: any) => {
      console.log("Executing Numbered List");
      console.log("Can toggle ordered list:", editor.can().toggleOrderedList());
      const result = editor.chain().focus().toggleOrderedList().run();
      console.log("Numbered List result:", result);
      return result;
    },
  },
  {
    name: "Code Block",
    icon: Code,
    action: (editor: any) => {
      console.log("Executing Code Block");
      console.log("Can toggle code block:", editor.can().toggleCodeBlock());
      const result = editor.chain().focus().toggleCodeBlock({ language: "javascript" }).run();
      console.log("Code Block result:", result);
      return result;
    },
  },
  {
    name: "Divider",
    icon: Minus,
    action: (editor: any) => {
      console.log("Executing Divider");
      const result = editor.chain().focus().setHorizontalRule().run();
      console.log("Divider result:", result);
      return result;
    },
  },
  {
    name: "Quote",
    icon: Quote,
    action: (editor: any) => {
      console.log("Executing Quote");
      console.log("Can toggle blockquote:", editor.can().toggleBlockquote());
      const result = editor.chain().focus().toggleBlockquote().run();
      console.log("Quote result:", result);
      return result;
    },
  },
];

const lowlight = createLowlight(all);

type Note = {
  title: string;
  content: string;
};

type NoteTakingProps = {
  lessonId?: string;
  noteId: string | null;
  setNoteId: (id: string) => void;
  note: Note;
  setIsNotesOpen?:React.Dispatch<React.SetStateAction<Boolean>>;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
};

function NoteTaking({ lessonId, noteId, setNoteId, note, setNote,
  //setIsNotesOpen
  }: NoteTakingProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  
  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  // -----------------------------
  // Editor configuration
  // -----------------------------
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ 
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
        heading: {
          levels: [1, 2, 3],
        },
      }),
      CodeBlockLowlight.configure({ 
        lowlight, 
        defaultLanguage: "javascript" 
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'my-bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'my-ordered-list',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'my-list-item',
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'my-blockquote',
        },
      }),
    ],
    content: note.content,
    editorProps: {
      handleKeyDown: (view, event) => {
        // Show slash command menu
        if (event.key === "/" && !showMenu) {
          setTimeout(() => {
            const { selection } = view.state;
            const { from } = selection;

            try {
              const coords = view.coordsAtPos(from);
              const editorElement = view.dom.closest(".editor-container");
              const editorRect =
                editorElement?.getBoundingClientRect() || view.dom.getBoundingClientRect();

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

        // Undo
        if ((event.ctrlKey || event.metaKey) && event.key === "z" && !event.shiftKey) {
          event.preventDefault();
          editor?.chain().focus().undo().run();
          return true;
        }

        // Redo
        if (
          (event.ctrlKey || event.metaKey) &&
          (event.key === "y" || (event.key === "z" && event.shiftKey))
        ) {
          event.preventDefault();
          editor?.chain().focus().redo().run();
          return true;
        }

        // Close menu with Escape
        if (event.key === "Escape" && showMenu) {
          event.preventDefault();
          setShowMenu(false);
          return true;
        }

        return false;
      },
    },
    onUpdate: ({ editor }) => {
      setNote((prev: Note) => ({ ...prev, content: editor.getHTML() }));

      const { selection } = editor.state;
      const { from } = selection;
      const textBefore = editor.state.doc.textBetween(Math.max(0, from - 10), from, " ");

      if (showMenu) {
        const slashMatch = textBefore.match(/\/(\w*)$/);
        if (slashMatch) {
          setQuery(slashMatch[1]);
        } else if (!textBefore.includes("/")) {
          setShowMenu(false);
        }
      }
    },
  });

  // -----------------------------
  // Save Note
  // -----------------------------
  const saveNote = async () => {
    try {
      if (noteId) {
        const response = await api.put(`/note/${noteId}`, { ...note });
        if (response.status === 200) {
          alert("Note updated successfully");
        } else {
          alert("Note update failed");
        }
        return;
      }

      const response = await api.post("/note", { ...note, lessonId });
      if (response.status === 201) {
        setNoteId(response.data.note.id);
        alert("Note saved successfully");
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  // -----------------------------
  // Fetch note by ID
  // -----------------------------
  useEffect(() => {
    if (noteId && editor) {
      const getNote = async () => {
        try {
          const response = await api.get(`/note/${noteId}`);
          if (response.status === 200) {
            setNote(response.data.note);
            if (editor && response.data.note.content) {
              editor.commands.setContent(response.data.note.content);
            }
          }
        } catch (error) {
          console.error("Error fetching note:", error);
        }
      };

      getNote();

      return () => {
        setNote({ title: "", content: "" });
        editor.commands.setContent("");
      };
    } else {
      setNote({ title: "", content: "" });
    }
  }, [noteId, editor]);

  // -----------------------------
  // Close menu on click outside
  // -----------------------------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showMenu && !target.closest(".slash-menu")) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMenu]);

  // -----------------------------
  // Execute slash command - FIXED VERSION
  // -----------------------------
  const executeCommand = (command: (typeof COMMANDS)[0]) => {
    console.log("Executing command:", command.name);
    if (!editor) {
      console.error("Editor not available");
      return;
    }

    // Get current selection
    const { selection } = editor.state;
    const { from } = selection;

    // Find and remove the slash command text
    const textBefore = editor.state.doc.textBetween(Math.max(0, from - 20), from, " ");
    const slashMatch = textBefore.match(/\/\w*$/);

    if (slashMatch) {
      console.log("Removing slash command text:", slashMatch[0]);
      const deleteFrom = from - slashMatch[0].length;
      
      // Use transaction to ensure proper state management
      editor.view.dispatch(
        editor.state.tr.delete(deleteFrom, from)
      );
    }

    // Close menu first
    setShowMenu(false);
    setQuery("");

    // Execute the command with a slight delay to ensure deletion is processed
    setTimeout(() => {
      try {
        command.action(editor);
        console.log("Command executed successfully");
      } catch (error) {
        console.error("Error executing command:", error);
      }
    }, 10);
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="h-[calc(100vh-40px)] flex flex-col dark:bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-white dark:bg-gray-800">
        <input
          type="text"
          placeholder="Enter note title..."
          className="flex-1 text-xl font-semibold border-none outline-none bg-transparent dark:text-white"
          value={note.title}
          onChange={(e) => setNote((prev) => ({ ...prev, title: e.target.value }))}
        />

        <div className="flex items-center gap-2">
          <button
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:text-white"
            title="Undo (Ctrl/Cmd+Z)"
          >
            ↶
          </button>

          <button
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:text-white"
            title="Redo (Ctrl/Cmd+Y)"
          >
            ↷
          </button>

          <Button onClick={saveNote} className="ml-4">
            Save Note
          </Button>

          <X className="text-gray-700 dark:text-gray-300 cursor-pointer"  onClick={()=>{console.log("hello");}}/>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative editor-container bg-white dark:bg-gray-900 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <EditorContent
            editor={editor}
            className="prose prose-lg max-w-none p-6 min-h-full dark:prose-invert
                       [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-full
                       [&_.ProseMirror_h1]:text-3xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mb-4
                       [&_.ProseMirror_h2]:text-2xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mb-3
                       [&_.ProseMirror_h3]:text-xl [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:mb-2
                       [&_.my-bullet-list]:list-disc [&_.my-bullet-list]:ml-6 [&_.my-bullet-list]:my-2
                       [&_.my-ordered-list]:list-decimal [&_.my-ordered-list]:ml-6 [&_.my-ordered-list]:my-2
                       [&_.my-list-item]:mb-1
                       [&_.my-blockquote]:border-l-4 [&_.my-blockquote]:border-gray-300 [&_.my-blockquote]:pl-4 [&_.my-blockquote]:italic [&_.my-blockquote]:my-4"
          />
        </div>

        {/* Slash Menu */}
        {showMenu && (
          <div
            className="slash-menu absolute bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden z-50 w-64"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
          >
            <div className="max-h-64 overflow-y-auto">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log("Menu item clicked:", command.name);
                      executeCommand(command);
                    }}
                  >
                    <div className="flex justify-start items-center gap-4">
                      <command.icon className="bg-blue-100 dark:bg-gray-600 px-2 py-1 flex items-center justify-center text-primary font-semibold h-8 w-8 border rounded-sm dark:text-white" />
                      <div className="font-medium">{command.name}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-gray-400 text-sm">
                  No commands found for "{query}"
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteTaking;