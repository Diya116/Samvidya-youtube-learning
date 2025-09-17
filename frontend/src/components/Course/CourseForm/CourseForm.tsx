import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types/course";
import type { Lesson } from "@/types/lesson";
import LessonForm from "../../Lesson/LessonForm";
import { getCourseByIdApi } from "@/services/courseService";
import { courseSchema } from "@/validation/course-schema";
import { useCourseLessons } from "@/hooks/useCourseLesson";
import { CourseFormFields } from "./CourseFormFields";
import { CourseLessonSection } from "./CourseLessonSection";
import Loader from "@/components/Loader";
interface CourseFormProps {
  onSubmit: (course: Course) => void;
  editingCourseId?: string;
  isEdit?: boolean;
}

export const CourseForm: React.FC<CourseFormProps> = ({ onSubmit, editingCourseId, isEdit = false }) => {
  const [courseData, setCourseData] = useState<Course>({
    title: "",
    description: "",
    coverImg: "",
    lessons: [],
  });
  const [currentView, setCurrentView] = useState<"course" | "lesson">("course");
  const [editingLesson, setEditingLesson] = useState<Lesson | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [loadingCourseData, setLoadingCourseData] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const { lessons, addLesson, addLessons, updateLesson, deleteLesson, reorderLessons } = useCourseLessons(courseData.lessons);

  // Fetch course data if editing
  useEffect(() => {
    async function fetchCourseData(id: string) {
      if (!id) return;
      try {
        setLoadingCourseData(true);
        const editingCourse = await getCourseByIdApi(id);
        console.log(editingCourse)
        if (editingCourse) setCourseData(editingCourse);
      } catch (err) {
        console.error("Error fetching course data:", err);
        setErrors(["Failed to load course data. Please try again."]);
      } finally {
        setLoadingCourseData(false);
      }
    }

    if (isEdit && editingCourseId) fetchCourseData(editingCourseId);
    else setCourseData({ title: "", description: "", coverImg: "", lessons: [] });
  }, [isEdit, editingCourseId]);

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setCurrentView("lesson");
  };

  const handleSubmit = async () => {
    setErrors([]);
    const finalCourseData = { ...courseData, lessons };
 if (!finalCourseData.title || finalCourseData.lessons.length === 0) {
      setErrors(["Course title and at least one lesson are required."]);
      return;
    }
    if (!finalCourseData.coverImg) {
      const firstLesson = finalCourseData.lessons.find((l) => l.order === 1);
      if (firstLesson) finalCourseData.coverImg = firstLesson.thumbnail || "";
    }
    // Validate using Zod
    const validation = courseSchema.safeParse(finalCourseData);
    if (!validation.success) {
      const messages = validation.error.errors.map(e => e.message);
      setErrors(messages);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(finalCourseData);
    } finally {
      setLoading(false);
    }
  };

  if (loadingCourseData) return (
   <Loader/>
  );

  return (
    <div>
      {currentView === "course" ? (
        <>
         
          <CourseFormFields courseData={courseData} setCourseData={setCourseData} />

          <CourseLessonSection
            lessons={lessons}
            onAddClick={() => { setEditingLesson(undefined); setCurrentView("lesson"); }}
            onEditLesson={handleEditLesson}
            onDeleteLesson={deleteLesson}
            onReorderLessons={reorderLessons}
          />
             {/* Display errors on top */}
          {errors.length > 0 && (
            <div className="mx-4 p-3 border border-red-500 rounded bg-red-50 text-red-600">
              {errors.map((err, idx) => <p key={idx}>{err}</p>)}
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <Button onClick={handleSubmit}>
              {loading ? (isEdit ? "Updating..." : "Creating...") : (isEdit ? "Update Course" : "Create Course")}
            </Button>
          </div>
        </>
      ) : (
        <LessonForm
          onAddLesson={(data) => { addLesson(data); setCurrentView("course"); }}
          onAddLessons={(data) => { addLessons(data); setCurrentView("course"); }}
          onUpdateLesson={(data) => { updateLesson(data); setCurrentView("course"); }}
          onCancel={() => { setEditingLesson(undefined); setCurrentView("course"); }}
          editingLesson={editingLesson}
        />
      )}
    </div>
  );
};
