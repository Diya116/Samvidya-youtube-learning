import React, { useState, useEffect } from "react";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import type { Course } from "@/types/course";
import type { Lesson } from "@/types/lesson";

import LessonForm from "../Lesson/LessonForm";
import { LessonList } from "../Lesson/LessonList";
import { getCourseByIdApi } from "@/services/courseService";

import { courseSchema } from "@/validation/course-schema";
interface CourseFormProps {
  onSubmit: (course: Course) => void;
  editingCourseId?: string;
  isEdit?: boolean;
}

export const CourseForm: React.FC<CourseFormProps> = ({
  onSubmit,
  editingCourseId,
  isEdit = false,
}) => {
  const [courseData, setCourseData] = useState<Course>({
    title: "",
    description: "",
    coverImg: "",
    lessons: [],
  });

  const [currentView, setCurrentView] = useState<"course" | "lesson">("course");
  const [editingLesson, setEditingLesson] = useState<Lesson | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCourseData, setLoadingCourseData] = useState<boolean>(false);

  // Initialize form data when editing
  useEffect(() => {
    async function fetchCourseData(id: string) {
      if (!id) return;
      
      try {
        setLoadingCourseData(true);
        const response = await getCourseByIdApi(id);
        console.log('Fetched course data:', response);
        const editingCourse = response;
        
        if (editingCourse) {
          setCourseData({
            id: editingCourse.id,
            title: editingCourse.title,
            description: editingCourse.description,
            coverImg: editingCourse.coverImg,
            lessons: editingCourse.lessons || [],
          });
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoadingCourseData(false);
      }
    }

    if (isEdit && editingCourseId) {
      fetchCourseData(editingCourseId);
    } else if (!isEdit) {
      // Reset form for new course
      setCourseData({
        title: "",
        description: "",
        coverImg: "",
        lessons: [],
      });
    }
  }, [isEdit, editingCourseId]);

  const handleAddLesson = (lessonData: Omit<Lesson, "id">) => {
    const maxOrder = courseData.lessons.length;
    const newLesson: Lesson = {
      ...lessonData,
      id: lessonData.videoId,
      order: maxOrder + 1,
    };
    setCourseData((prev) => ({
      ...prev,
      lessons: [...prev.lessons, newLesson],
    }));
  };

  const handleAddLessons = (lessonarray: Lesson[]) => {
    let maxOrder = courseData.lessons.length;
    const newLessons = lessonarray.map((lesson) => {
      maxOrder = maxOrder + 1;
      return { ...lesson, id: lesson.videoId, order: maxOrder };
    });
    setCourseData((prev) => ({
      ...prev,
      lessons: [...prev.lessons, ...newLessons],
    }));
  };

  const handleUpdateLesson = (updatedLesson: Lesson) => {
    setCourseData((prev) => ({
      ...prev,
      lessons: prev.lessons.map((lesson) =>
        lesson.id === updatedLesson.id ? updatedLesson : lesson
      ),
    }));
  };

  const handleDeleteLesson = (id: string) => {
    console.log("delete clicked")
    console.log(id)
    setCourseData((prev) => ({
      ...prev,
      lessons: prev.lessons.filter((lesson) => lesson.id !== id),
    }));
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setCurrentView("lesson");
  };

  const handleReorderLessons = (lessons: Lesson[]) => {
    setCourseData((prev) => ({
      ...prev,
      lessons: lessons,
    }));
  };

  const handleSubmit = async () => {
    if (!courseData.title || courseData.lessons.length === 0) return;
    
    try {
      setLoading(true);
      
      let finalCourseData = { ...courseData };
      
      // Set cover image from first lesson if not provided
      if (!courseData.coverImg || courseData.coverImg === "") {
        const firstLesson = courseData.lessons.find((l) => l.order === 1);
        if (firstLesson) {
          finalCourseData.coverImg = firstLesson.thumbnail || "";
        }
      }
      // Validate data using Zod schema
      const validation = courseSchema.safeParse(finalCourseData);
      if (!validation.success) {
        const errorMessages = validation.error.errors.map((err) => err.message).join(", ");
        alert(`Validation Error: ${errorMessages}`);
        return;
      }
      await onSubmit(finalCourseData);
    } finally {
      setLoading(false);
    }
  };

  const renderCourseForm = () => (
    <div className="space-y-6">
      {/* Course Basic Info */}
      <div className="space-y-4">
        {/* Course Title */}
        <div className="space-y-2">
          <Label htmlFor="courseTitle">
            Course Title<span className="text-red-500">*</span>
          </Label>
          <Input
            id="courseTitle"
            placeholder="Enter course title"
            value={courseData.title}
            onChange={(e) =>
              setCourseData((prev) => ({ ...prev, title: e.target.value }))
            }
            minLength={3}
            maxLength={300}
            required
          />
        </div>

        {/* Course Description */}
        <div className="space-y-2">
          <Label htmlFor="courseDescription">Course Description</Label>
          <Textarea
            id="courseDescription"
            placeholder="Enter course description"
            value={courseData.description}
            onChange={(e) =>
              setCourseData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            rows={4}
            maxLength={1000}
          />
        </div>

        {/* Cover Image */}
        <div className="space-y-2">
          <Label htmlFor="coverImg">Cover Image Link</Label>
          <Input
            id="coverImg"
            placeholder="Cover image"
            value={courseData.coverImg}
            onChange={(e) =>
              setCourseData((prev) => ({ ...prev, coverImg: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Lessons Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Course Content</h3>
          <Button
            type="button"
            onClick={() => {
              setEditingLesson(undefined);
              setCurrentView("lesson");
            }}
            className="cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lesson
          </Button>
        </div>

        {/* Lesson List */}
        <LessonList
          lessons={courseData.lessons}
          onEditLesson={handleEditLesson}
          onDeleteLesson={handleDeleteLesson}
          onReorderLessons={handleReorderLessons}
        />
      </div>
   {/*error info*/}
   
      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t">
        <Button
          onClick={handleSubmit}
          disabled={
            !courseData.title || courseData.lessons.length ===0 || loading
          }
          className="min-w-32 cursor-pointer"
        >
          {loading 
            ? (isEdit ? "Updating..." : "Creating...") 
            : (isEdit ? "Update Course" : "Create Course")
          }
        </Button>
      </div>
    </div>
  );

  // Show loading spinner while fetching course data
  if (loadingCourseData) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading course details...</span>
      </div>
    );
  }

  return (
    <div>
      {currentView === "course" ? (
        renderCourseForm()
      ) : (
        <LessonForm
          onAddLesson={(data) => {
            handleAddLesson(data);
            setCurrentView("course");
          }}
          onAddLessons={(data) => {
            handleAddLessons(data);
            setCurrentView("course");
          }}
          onUpdateLesson={(data) => {
            handleUpdateLesson(data);
            setCurrentView("course");
          }}
          onCancel={() => {
            setEditingLesson(undefined);
            setCurrentView("course");
          }}
          editingLesson={editingLesson}
        />
      )}
    </div>
  );
};