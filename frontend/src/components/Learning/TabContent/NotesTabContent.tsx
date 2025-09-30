import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import NoteTaking from "@/components/Learning/Note/NoteTaking";
import NotesList from "@/components/Learning/Note/NotesList";
import type { Course } from "@/types/course";

interface NotesTabContentProps {
  course: Course | null;
  isMobile: boolean;
  showNoteEditor: boolean;
  isFullScreen: boolean;
  note: { title: string; content: string };
  noteId: string | null;
  onNoteSelect: (noteId: string) => void;
  onNewNote: () => void;
  onCloseNoteEditor: () => void;
  onToggleFullScreen: () => void;
  setNote: React.Dispatch<React.SetStateAction<{ title: string; content: string }>>;
  setNoteId: React.Dispatch<React.SetStateAction<string | null>>;
}

const NotesTabContent: React.FC<NotesTabContentProps> = ({
  course,
  isMobile,
  showNoteEditor,
  isFullScreen,
  note,
  noteId,
  onNoteSelect,
  onNewNote,
  onCloseNoteEditor,
  onToggleFullScreen,
  setNote,
  setNoteId,
}) => {
  return (
    <div className="h-full flex flex-col">
      {isMobile && showNoteEditor ? (
        // Mobile note editor
        <div className=" flex flex-col">
          <div className="flex items-center justify-end  bg-card">
            {/* <h3 className="font-semibold">Note Editor</h3> */}
            <div className="flex items-center gap-2">
              {/* <Button
                variant="ghost"
                size="icon"
                onClick={onToggleFullScreen}
                className="cursor-pointer"
              >
                {isFullScreen ? (
                  <Minimize2 className="h-2 w-2" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button> */}
              {/* <Button
                variant="ghost"
                size="icon"
                onClick={onCloseNoteEditor}
                className="cursor-pointer"
              >
                <X className="h-4 w-4" />
              </Button> */}
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <NoteTaking
              note={note}
              setNote={setNote}
              courseId={course?.id || ""}
              noteId={noteId}
              setNoteId={setNoteId}
              setIsNotesOpen={onCloseNoteEditor}
              isMobile={isMobile}
              isFullScreen={isFullScreen}
              onToggleFullScreen={onToggleFullScreen}
            />
          </div>
        </div>
      ) : (
        // Notes list
        <>
          <div className="px-4 py-2 bg-card">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold">Notes</h3>
              <Button
                onClick={onNewNote}
                size="sm"
                className="flex items-center gap-2 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                New Note
              </Button>
            </div>
          </div>
          <div className="flex-1 ">
            {course && (
              <NotesList
                courseId={course.id}
                setNoteId={onNoteSelect}
                setIsOpen={() => {}}
                setIsNotesOpen={() => {}}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotesTabContent;