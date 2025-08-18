import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  ChevronLeft,
  AlignJustify,
  Notebook,
  Flame,
  AlarmClock,
  Timer,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import LessonList from "@/components/Learning/lessons/LessonList";
import NoteTaking from "@/components/Learning/NoteTaking";
import VideoPlayer from "@/components/Learning/VideoPlayer";
import { getCourseByIdApi } from "@/services/courseService";
import { api } from "@/utils/axiosInstance";
import type { Course } from "@/types/course";
import Loader from "@/components/Loader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type CourseResponse = Course & {
  activeLessonId: string;
};
const Learning: React.FC = () => {
  const [course, setCourse] = useState<CourseResponse | null>(null);
  const [currentLessonId, setCurrentLessonId] = useState<string>("");
  const [isLessonsOpen, setIsLessonsOpen] = useState(true);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getCourseDetail = async (courseId: string) => {
      try {
        const response: CourseResponse = await getCourseByIdApi(courseId);
        setCourse(response);
        setCurrentLessonId(
          searchParams.get("lesson") || response.activeLessonId
        );
      } catch (error) {
        console.error("Error fetching course details:", error);
        navigate("/workspace");
      }
    };
    if (id) getCourseDetail(id);
  }, [id]);
  useEffect(() => {
    setCurrentLessonId(searchParams.get("lesson") || "");
    setIsNotesOpen(searchParams.get("tab") === "notes");
  }, []);
  useEffect(() => {
    const saveLessonProgress = async () => {
      await api.post("/course/progress", {
        id: course?.id,
        activeLessonId: currentLessonId,
      });
      searchParams.set("lesson", currentLessonId);
      setSearchParams(searchParams);
      //console.log("lesson progress saved",course?.id,currentLessonId)
      // You can also use navigator.sendBeacon for better performance
      //navigator.sendBeacon('http://localhost:5000/api/v1/course/progress',JSON.stringify({id:course?.id,currentLessonId}))
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
      console.log("i have sended this", data);
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
      console.log("Lesson status updated successfully");
    } catch (error) {
      console.error("Error updating lesson status:", error);
    }
  };
  return (
    <div>
      {!course ? (
        <Loader />
      ) : (
        <div className="h-screen bg-background overflow-y-hidden">
          {/* Header */}
          <div className="border-b">
            <div className="flex items-center justify-between py-1 px-4">
              <ArrowLeft
                className="h-6 w-6 cursor-pointer"
                onClick={() => navigate("/workspace")}
              />
              <h1 className="text-lg ">{course?.title}</h1>
              <div className="flex items-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      title="take notes"
                      className="flex gap-2 text-gray-600 cursor-pointer"
                      // onClick={() => {
                      //   setIsNotesOpen(!isNotesOpen);
                      //   searchParams.set("tab", "notes");
                      //   setSearchParams(searchParams);
                      // }}
                    >
                      <Notebook className="h-6 w-6 cursor-pointer" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="m-2">
                    <DropdownMenuItem  onClick={() => {
                        setIsNotesOpen(!isNotesOpen);
                        searchParams.set("tab", "notes");
                        setSearchParams(searchParams);
                      }} className="border border-gray-300">
                      New Note
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => alert("Settings clicked")}>
                      Select from existing notes
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onClick={() => alert("Logout clicked")}>
          Logout
        </DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* <div>
                  <button
                    title="take notes"
                    className="flex gap-2 text-gray-600 cursor-pointer"
                    onClick={() => {
                      setIsNotesOpen(!isNotesOpen);
                      searchParams.set("tab", "notes");
                      setSearchParams(searchParams);
                    }}
                  >
                    <Notebook className="h-6 w-6 cursor-pointer" />
                  </button>
                </div> */}
                <div className="flex">
                  <button title="set pomodoro" className="">
                    <Timer className="h-6 w-6 cursor-pointer text-primary" />
                  </button>
                </div>
                <div className="flex">
                  <button title="your current streak">
                    {" "}
                    <Flame className="h-6 w-6 cursor-pointer text-gray-600" />{" "}
                  </button>
                  <span>0 </span>
                </div>
                <div>
                  <button
                    title="profile"
                    className=" text-gray-600 cursor-pointer border border-gray-300 rounded-full p-1"
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    <User className="h-5 w-5 cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-[calc(100vh-48px)]">
            {/* Lesson List Toggle */}
            {isLessonsOpen && (
              <div className="border-r bg-card h-full w-[300px] resize-x ">
                <div className="flex justify-between items-center p-2 border-b">
                  <h2 className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" /> Lessons
                  </h2>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsLessonsOpen(false)}
                  >
                    <ChevronLeft />
                  </Button>
                </div>
                {course ? (
                  <LessonList
                    lessons={course.lessons}
                    handleCurrentLesson={CurrentLesson}
                    currentLessonId={currentLessonId}
                    handleReorderLessons={onReorderLessons}
                    handleUpdateStatusOfLesson={onUpdateStatusOfLesson}
                  />
                ) : (
                  <div className="p-4">No lessons</div>
                )}
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex">
              {/* Toggle Lessons Button */}
              {!isLessonsOpen && (
                <div className="p-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsLessonsOpen(true)}
                  >
                    <AlignJustify />
                  </Button>
                </div>
              )}

              {/* Video & Notes Resizable */}
              <ResizablePanelGroup direction="horizontal" className="flex-1">
                {/* Video Panel */}
                <ResizablePanel defaultSize={isNotesOpen ? 70 : 100}>
                  <VideoPlayer
                    currentLessonId={currentLessonId}
                    videoId={
                      course?.lessons.filter((l) => l.id === currentLessonId)[0]
                        .videoId || ""
                    }
                  />
                </ResizablePanel>

                {/* Notes Panel */}
                {isNotesOpen && (
                  <>
                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={20} maxSize={50}>
                      <div className="h-full border-l bg-card flex flex-col">
                        <NoteTaking lessonId={currentLessonId} />
                      </div>
                    </ResizablePanel>
                  </>
                )}
              </ResizablePanelGroup>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learning;
