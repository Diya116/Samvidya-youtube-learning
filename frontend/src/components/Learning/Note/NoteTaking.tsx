import React, { useState, useEffect } from "react";
import { EditorContent } from "@tiptap/react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "@/utils/axiosInstance";
import type { NoteTakingProps, SaveStatus } from "@/types/Note";
import { COMMANDS } from "@/constant/editor-commands";
import { EDITOR_STYLES } from "@/config/editor-config";
import NoteHeader from "./NoteHeader";
import SlashMenu from "./SlashMenu";
import EditorPlaceholder from "./EditorPlaceholder";
import { useSlashMenu } from "@/hooks/useSlashMenu";
import { useAutoSave } from "@/hooks/useAutoSave";
import { useNoteEditor } from "@/hooks/useNoteEditor";

function NoteTaking({ 
  courseId, 
  noteId, 
  setNoteId, 
  note, 
  setNote,
  setIsNotesOpen,
  isMobile,
  isFullScreen,
  onToggleFullScreen,
  isStandalone = false // New prop to determine if it's standalone page
}: NoteTakingProps & { isStandalone?: boolean }) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on a standalone note page
  const isStandaloneMode = isStandalone || location.pathname.includes('/note/');

  // Custom hooks
  const slashMenuHandlers = useSlashMenu(COMMANDS);
  const { editor, showPlaceholder, executeCommand } = useNoteEditor(
    note,
    setNote,
    setSaveStatus,
    slashMenuHandlers
  );

  useAutoSave(note, noteId, courseId, setNoteId, setSaveStatus);

  // Fetch note by ID
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

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (slashMenuHandlers.showMenu && !target.closest(".slash-menu")) {
        slashMenuHandlers.closeMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [slashMenuHandlers.showMenu]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSaveStatus('unsaved');
    setNote((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleClose = () => {
    if (isStandaloneMode) {
      // Go back to previous page or notes list
      navigate(-1);
    } else {
      // Close notes panel in learning page
      if (setIsNotesOpen) setIsNotesOpen(false);
    }
  };

  const handleCommandSelect = (command: any) => {
    executeCommand(command);
  };

  // Determine container height based on mode
  const containerClass = isStandaloneMode 
    ? "h-screen flex flex-col dark:bg-gray-800" 
    : "h-full flex flex-col dark:bg-gray-800";

  // Determine editor container height based on mode
  const editorContainerClass = isStandaloneMode
    ? "flex-1 relative editor-container bg-white dark:bg-gray-900 overflow-hidden"
    : "flex-1 relative editor-container bg-white dark:bg-gray-900 overflow-hidden";

  return (
    <div className={containerClass}>
      <NoteHeader
        title={note.title}
        onTitleChange={handleTitleChange}
        saveStatus={saveStatus}
        onClose={handleClose}
        isMobile={isMobile ?? false}
        isFullScreen={isFullScreen ?? true}
        onToggleFullScreen={onToggleFullScreen}
        isStandalone={isStandaloneMode}
        showClose={!isStandaloneMode} // Only show close button in learning page mode
      />

      <div className={editorContainerClass}>
        <div className="h-full overflow-y-auto">
          <div className="relative">
            <EditorPlaceholder 
              isVisible={showPlaceholder && editor?.isEmpty}
            />
            
            <EditorContent
              editor={editor}
              className={EDITOR_STYLES}
            />
          </div>
        </div>

        <SlashMenu
          isVisible={slashMenuHandlers.showMenu}
          position={slashMenuHandlers.menuPosition}
          commands={slashMenuHandlers.filteredCommands}
          selectedIndex={slashMenuHandlers.selectedIndex}
          query={slashMenuHandlers.query}
          onCommandSelect={handleCommandSelect}
        />
      </div>
    </div>
  );
}

export default NoteTaking;