//this screen include course detail->include
//name,description,url,option for lesson add,lessons list
import React, { useState } from "react";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import type { Course } from "@/types/course";
import type { Lesson } from "@/types/lesson";

import LessonForm from "../Lesson/LessonForm";
import { LessonList } from "../Lesson/LessonList";

export const CourseForm: React.FC<{ onSubmit: (course: Course) => void }> = ({
  onSubmit,
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
  const handleSubmit =async () => {
    if (!courseData.title || courseData.lessons.length === 0) return;
    try {
      setLoading(true);
      if (!courseData.coverImg || courseData.coverImg === "") {
        console.log(courseData.lessons.findIndex((l) => l.order === 1));
        const updatedCourseData = {
          ...courseData,
          coverImg:
            courseData.lessons[
              courseData.lessons.findIndex((l) => l.order === 1)
            ].thumbnail || "",
        };
        await onSubmit(updatedCourseData);
        return;
      }
      await onSubmit(courseData);
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

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t">
        <Button
          onClick={handleSubmit}
          disabled={
            !courseData.title || courseData.lessons.length === 0 || loading
          }
          className="min-w-32 cursor-pointer"
        >
          {loading ? "Creating..." : "Create Course"}
        </Button>
      </div>
    </div>
  );

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
