// hooks/useLearning.ts
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getCourseByIdApi } from "@/services/courseService";
import { api } from "@/utils/axiosInstance";
import type { Course } from "@/types/course";

type CourseResponse = Course & {
  activeLessonId: string;
};

type TabType = "details" | "lessons" | "notes";

export const useLearning = () => {
  const [course, setCourse] = useState<CourseResponse | null>(null);
  const [currentLessonId, setCurrentLessonId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<TabType>("lessons");
  const [searchParams, setSearchParams] = useSearchParams();
  const [noteId, setNoteId] = useState<string | null>(null);
  const [note, setNote] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  
  const { id } = useParams();
  const navigate = useNavigate();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get course data
  useEffect(() => {
    const getCourseDetail = async (courseId: string) => {
      try {
        const response: CourseResponse = await getCourseByIdApi(courseId);
        setCourse(response);
        setCurrentLessonId(
          searchParams.get("lesson") || response.activeLessonId
        );
        localStorage.setItem("lastLearningUrl", window.location.href);
      } catch (error) {
        console.error("Error fetching course details:", error);
        navigate("/workspace/courses");
      }
    };
    if (id) getCourseDetail(id);
  }, [id]);

  // Set UI according to URL
  useEffect(() => {
    setCurrentLessonId(searchParams.get("lesson") || "");
    const tab = searchParams.get("tab") as TabType;
    if (tab) setActiveTab(tab);
    const noteParam = searchParams.get("note");
    if (noteParam) {
      setNoteId(noteParam);
      setShowNoteEditor(true);
    }
  }, []);

  // Course progress backend sync
  useEffect(() => {
    const saveLessonProgress = async () => {
      if (course?.id && currentLessonId) {
        await api.post("/course/progress", {
          id: course?.id,
          activeLessonId: currentLessonId,
        });
        searchParams.set("lesson", currentLessonId);
        setSearchParams(searchParams);
      }
    };
    saveLessonProgress();
    window.addEventListener("beforeunload", saveLessonProgress);
    window.addEventListener("pagehide", saveLessonProgress);
    return () => {
      window.removeEventListener("beforeunload", saveLessonProgress);
      window.removeEventListener("pagehide", saveLessonProgress);
    };
  }, [course?.id, currentLessonId]);

  const CurrentLesson = (videoId: string) => {
    setCurrentLessonId(videoId);
  };

  const onReorderLessons = async (lessons: any) => {
    try {
      const data = lessons.map((lesson: any) => ({
        id: lesson.id,
        order: lesson.order,
      }));
      await api.put(`/course/${course?.id}/reorder`, { data });
    } catch (error) {
      console.error("Error reordering lessons:", error);
    }
  };

  const onUpdateStatusOfLesson = async (lessonId: string, status: string) => {
    try {
      await api.put(`/course/${course?.id}/lesson/status`, {
        lessonId,
        status,
      });
    } catch (error) {
      console.error("Error updating lesson status:", error);
    }
  };

  const handleTabChange = (tab: TabType) => {
    if (!isMobile) {
      if (activeTab === tab && isLeftPanelOpen) {
        setIsLeftPanelOpen(false);
      } else {
        setActiveTab(tab);
        setIsLeftPanelOpen(true);
        searchParams.set("tab", tab);
        setSearchParams(searchParams);
      }
    } else {
      setActiveTab(tab);
      searchParams.set("tab", tab);
      setSearchParams(searchParams);
    }
  };

  const handleNoteSelect = (selectedNoteId: string) => {
    setNoteId(selectedNoteId);
    setShowNoteEditor(true);
    searchParams.set("note", selectedNoteId);
    setSearchParams(searchParams);
    
    if (isMobile) {
      setActiveTab("notes");
    } else {
      setIsLeftPanelOpen(false);
    }
  };

  const handleNewNote = () => {
    setNoteId(null);
    setNote({ title: "", content: "" });
    setShowNoteEditor(true);
    searchParams.delete("note");
    setSearchParams(searchParams);
    
    if (isMobile) {
      setActiveTab("notes");
    } else {
      setIsLeftPanelOpen(false);
    }
  };

  const handleCloseNoteEditor = () => {
    setShowNoteEditor(false);
    searchParams.delete("note");
    setSearchParams(searchParams);
  };

  const toggleFullScreen = () => {
    console.log("clicked")
    setIsFullScreen(!isFullScreen);
  };

  return {
    // State
    course,
    currentLessonId,
    activeTab,
    noteId,
    note,
    showNoteEditor,
    isFullScreen,
    isMobile,
    isLeftPanelOpen,
    
    // Setters
    setNote,
    setNoteId,
    
    // Handlers
    CurrentLesson,
    onReorderLessons,
    onUpdateStatusOfLesson,
    handleTabChange,
    handleNoteSelect,
    handleNewNote,
    handleCloseNoteEditor,
    toggleFullScreen,
    
    // Navigation
    navigate,
  };
};