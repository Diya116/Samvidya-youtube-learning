import React from "react";
import LearningHeader from "../LearningHeader";
import VideoPlayer from "@/components/Learning/VideoPlayer/VideoPlayer";
import TabNavigation from "../TabNavigation/TabNavigation";
import TabContentRenderer from "../TabContent/TabContentRender";
import type { Course } from "@/types/course";

type TabType = "details" | "lessons" | "notes";

interface MobileLearningLayoutProps {
  course: Course;
  currentLessonId: string;
  activeTab: TabType;
  showNoteEditor: boolean;
  isFullScreen: boolean;
  note: { title: string; content: string };
  noteId: string | null;
  onNavigateBack: () => void;
  onTabChange: (tab: TabType) => void;
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

const MobileLearningLayout: React.FC<MobileLearningLayoutProps> = ({
  course,
  currentLessonId,
  activeTab,
  showNoteEditor,
  isFullScreen,
  note,
  noteId,
  onNavigateBack,
  onTabChange,
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
  return (
    <div className="h-screen flex flex-col bg-background">
      <LearningHeader title={course.title} onBack={onNavigateBack} />

      {/* Video Section */}
      <div className={`flex-shrink-0 ${isFullScreen && activeTab === "notes" && showNoteEditor ? 'hidden' : 'block'}`}>
        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
          <div className="absolute top-0 left-0 w-full h-full">
            <VideoPlayer
              currentLessonId={currentLessonId}
              videoId={
                course.lessons.filter((l) => l.id === currentLessonId)[0]
                  ?.videoId || ""
              }
            />
          </div>
        </div>
      </div>

      <TabNavigation
        activeTab={activeTab}
        onTabChange={onTabChange}
        variant="mobile"
      />

      {/* Tab Content */}
      <div className={`flex-1 overflow-hidden ${isFullScreen && activeTab === "notes" && showNoteEditor ? 'fixed inset-0 z-50 bg-background' : ''}`}>
        <TabContentRenderer
          activeTab={activeTab}
          course={course}
          currentLessonId={currentLessonId}
          isMobile={true}
          showNoteEditor={showNoteEditor}
          isFullScreen={isFullScreen}
          note={note}
          noteId={noteId}
          onCurrentLesson={onCurrentLesson}
          onReorderLessons={onReorderLessons}
          onUpdateStatusOfLesson={onUpdateStatusOfLesson}
          onNoteSelect={onNoteSelect}
          onNewNote={onNewNote}
          onCloseNoteEditor={onCloseNoteEditor}
          onToggleFullScreen={onToggleFullScreen}
          setNote={setNote}
          setNoteId={setNoteId}
        />
      </div>
    </div>
  );
};

export default MobileLearningLayout;