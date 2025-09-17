import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { type Note } from "@/types/Note";

type Props = {
  note: Note;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
  editor: any;
  onSave: () => void;
};

export function NoteHeader({ note, setNote, editor, onSave }: Props) {
  return (
    <div className="p-4 border-b flex items-center justify-between bg-white dark:bg-gray-800">
      <input
        type="text"
        placeholder="Enter note title..."
        className="flex-1 text-xl font-semibold border-none outline-none bg-transparent"
        value={note.title}
        onChange={(e) =>
          setNote((prev: Note) => ({ ...prev, title: e.target.value }))
        }
      />

      <div className="flex items-center gap-2 dark:bg-gray-800">
        <button
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().undo()}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          title="Undo (Ctrl/Cmd+Z)"
        >
          ↶
        </button>
        <button
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().redo()}
          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
          title="Redo (Ctrl/Cmd+Y)"
        >
          ↷
        </button>
        <Button onClick={onSave} className="ml-4">Save Note</Button>
        <X className="text-gray-700" />
      </div>
    </div>
  );
}
