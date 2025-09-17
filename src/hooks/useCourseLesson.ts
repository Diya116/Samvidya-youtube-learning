import { useState,useEffect } from "react";
import type { Lesson } from "@/types/lesson";

export const useCourseLessons = (initialLessons: Lesson[] = []) => {
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
useEffect(() => {
    setLessons(initialLessons);
  }, [initialLessons]);

  const addLesson = (lessonData: Omit<Lesson, "id">) => {
    const maxOrder = lessons.length;
    const newLesson: Lesson = { ...lessonData, id: lessonData.videoId, order: maxOrder + 1 };
    setLessons((prev) => [...prev, newLesson]);
  };

  const addLessons = (lessonArray: Lesson[]) => {
    let maxOrder = lessons.length;
    const newLessons = lessonArray.map((lesson) => ({ ...lesson, id: lesson.videoId, order: ++maxOrder }));
    setLessons((prev) => [...prev, ...newLessons]);
  };

  const updateLesson = (updatedLesson: Lesson) => {
    setLessons((prev) => prev.map((lesson) => (lesson.id === updatedLesson.id ? updatedLesson : lesson)));
  };

  const deleteLesson = (id: string) => {
    setLessons((prev) => prev.filter((lesson) => lesson.id !== id));
  };

  const reorderLessons = (newOrder: Lesson[]) => {
    setLessons(newOrder);
  };

  return {
    lessons,
    addLesson,
    addLessons,
    updateLesson,
    deleteLesson,
    reorderLessons,
  };
};
