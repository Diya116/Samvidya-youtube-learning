import React from "react";
import { useLearning } from "@/hooks/useLearning";
import MobileLearningLayout from "@/components/Learning/Layout/MobileLearningLayout";
import DesktopLearningLayout from "@/components/Learning/Layout/DesktopLearningLayout";
import Loader from "@/components/Loader";

const Learning: React.FC = () => {
  const {
    course,
    currentLessonId,
    activeTab,
    noteId,
    note,
    showNoteEditor,
    isFullScreen,
    isMobile,
    isLeftPanelOpen,
    setNote,
    setNoteId,
    CurrentLesson,
    onReorderLessons,
    onUpdateStatusOfLesson,
    handleTabChange,
    handleNoteSelect,
    handleNewNote,
    handleCloseNoteEditor,
    toggleFullScreen,
    navigate,
  } = useLearning();

  if (!course) {
    return <Loader />;
  }

  const commonProps = {
    course,
    currentLessonId,
    activeTab,
    showNoteEditor,
    isFullScreen,
    note,
    noteId,
    onNavigateBack: () => navigate("/workspace/courses"),
    onTabChange: handleTabChange,
    onCurrentLesson: CurrentLesson,
    onReorderLessons,
    onUpdateStatusOfLesson,
    onNoteSelect: handleNoteSelect,
    onNewNote: handleNewNote,
    onCloseNoteEditor: handleCloseNoteEditor,
    onToggleFullScreen: toggleFullScreen,
    setNote,
    setNoteId,
  };

  if (isMobile) {
    return <MobileLearningLayout {...commonProps} />;
  }

  return (
    <DesktopLearningLayout
      {...commonProps}
      isLeftPanelOpen={isLeftPanelOpen}
    />
  );
};

export default Learning;