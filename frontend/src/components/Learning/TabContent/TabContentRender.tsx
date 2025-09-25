import React from "react";
import LessonDescription from "@/components/Learning/Description/LessonDescription";
import LessonList from "@/components/Learning/lessons/LessonList";
import NotesTabContent from "./NotesTabContent";
import type { Course } from "@/types/course";

type TabType = "details" | "lessons" | "notes";

interface TabContentRendererProps {
  activeTab: TabType;
  course: Course | null;
  currentLessonId: string;
  isMobile: boolean;
  showNoteEditor: boolean;
  isFullScreen: boolean;
  note: { title: string; content: string };
  noteId: string | null;
  onCurrentLesson: (videoId: string) => void;
  onReorderLessons: (lessons: any) => void;
  onUpdateStatusOfLesson: (lessonId: string, status: string) => void;
  onNoteSelect: (noteId: string) => void;
  onNewNote: () => void;
  onCloseNoteEditor: () => void;
  onToggleFullScreen: () => void;
  setNote: React.Dispatch<React.SetStateAction<{ title: string; content: string }>>;
  setNoteId: React.Dispatch<React.SetStateAction<string | null>>;
}

const TabContentRenderer: React.FC<TabContentRendererProps> = ({
  activeTab,
  course,
  currentLessonId,
  isMobile,
  showNoteEditor,
  isFullScreen,
  note,
  noteId,
  onCurrentLesson,
  onReorderLessons,
  onUpdateStatusOfLesson,
  onNoteSelect,
  onNewNote,
  onCloseNoteEditor,
  onToggleFullScreen,
  setNote,
  setNoteId,
}) => {
  switch (activeTab) {
    case "details":
      return (
        <div className="h-full overflow-auto">
          {course ? (
            <LessonDescription
              lessons={course.lessons}
              currentLessonId={currentLessonId}
            />
          ) : null}
        </div>
      );

    case "lessons":
      return course ? (
        <div className="h-full overflow-auto">
          <LessonList
            lessons={course.lessons}
            handleCurrentLesson={onCurrentLesson}
            currentLessonId={currentLessonId}
            handleReorderLessons={onReorderLessons}
            handleUpdateStatusOfLesson={onUpdateStatusOfLesson}
          />
        </div>
      ) : (
        <div className="p-4">No lessons</div>
      );

    case "notes":
      return (
        <NotesTabContent
          course={course}
          isMobile={isMobile}
          showNoteEditor={showNoteEditor}
          isFullScreen={isFullScreen}
          note={note}
          noteId={noteId}
          onNoteSelect={onNoteSelect}
          onNewNote={onNewNote}
          onCloseNoteEditor={onCloseNoteEditor}
          onToggleFullScreen={onToggleFullScreen}
          setNote={setNote}
          setNoteId={setNoteId}
        />
      );

    default:
      return null;
  }
};

export default TabContentRenderer;
