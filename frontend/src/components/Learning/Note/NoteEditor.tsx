import { EditorContent } from "@tiptap/react";
import { SlashMenu } from "./SlashMenu";
import { COMMANDS } from "@/constant/SlashMenu";
type Props = {
  editor: any;
  showMenu: boolean;
  menuPosition: { top: number; left: number };
  query: string;
  executeCommand:((command: (typeof COMMANDS)[0])=>void)
};

export function NoteEditor({ editor, showMenu, menuPosition, query,executeCommand }: Props) {


  return (
    <div className="flex-1 relative editor-container bg-white overflow-hidden dark:bg-gray-900">
      <div className="h-full overflow-y-auto">
        <EditorContent
          editor={editor}
          className="prose prose-lg max-w-none p-6 min-h-full
                     [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-full ..."
        />
      </div>

      {showMenu && (
        <div
          className="slash-menu absolute bg-white shadow-xl border rounded-lg w-64 z-50"
          style={{
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
          }}
        >
          <SlashMenu executeCommand={executeCommand} query={query} />
        </div>
      )}
    </div>
  );
}
