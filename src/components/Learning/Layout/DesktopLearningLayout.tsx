import React from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import LearningHeader from "../LearningHeader";
import TabNavigation from "../TabNavigation/TabNavigation";
import TabContentRenderer from "../TabContent/TabContentRender";
import VideoPlayer from "@/components/Learning/VideoPlayer/VideoPlayer";
import NoteTaking from "@/components/Learning/Note/NoteTaking";
import type { Course } from "@/types/course";

type TabType = "details" | "lessons" | "notes";

interface DesktopLearningLayoutProps {
  course: Course;
  currentLessonId: string;
  activeTab: TabType;
  isLeftPanelOpen: boolean;
  showNoteEditor: boolean;
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

const DesktopLearningLayout: React.FC<DesktopLearningLayoutProps> = ({
  course,
  currentLessonId,
  activeTab,
  isLeftPanelOpen,
  showNoteEditor,
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

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="flex flex-shrink-0">
          <TabNavigation
            activeTab={activeTab}
            onTabChange={onTabChange}
            variant="desktop"
          />

          {/* Tab Content Panel */}
          {isLeftPanelOpen && (
            <div className="w-80 border-r bg-card flex-shrink-0">
              <div className="h-full flex flex-col">
                <div className="flex-1 overflow-hidden">
                  <TabContentRenderer
                    activeTab={activeTab}
                    course={course}
                    currentLessonId={currentLessonId}
                    isMobile={false}
                    showNoteEditor={showNoteEditor}
                    isFullScreen={false}
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
            </div>
          )}
        </div>

        {/* Main Content Area - Video and Notes */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Video Panel */}
            <ResizablePanel defaultSize={showNoteEditor ? 65 : 100} minSize={30}>
              <div className="h-full">
                <VideoPlayer
                  currentLessonId={currentLessonId}
                  videoId={
                    course.lessons.filter((l) => l.id === currentLessonId)[0]
                      ?.videoId || ""
                  }
                />
              </div>
            </ResizablePanel>

            {/* Notes Editor Panel */}
            {showNoteEditor && (
              <>
                <ResizableHandle withHandle />
                <ResizablePanel minSize={35} maxSize={70}>
                  <div className="h-full border-l bg-card">
                    <NoteTaking
                      note={note}
                      setNote={setNote}
                      courseId={course.id}
                      noteId={noteId}
                      setNoteId={setNoteId}
                      setIsNotesOpen={onCloseNoteEditor}
                    />
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};

export default DesktopLearningLayout;