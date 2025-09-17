import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LessonList } from "../../Lesson/LessonList";
import type { Lesson } from "@/types/lesson";

interface CourseLessonSectionProps {
  lessons: Lesson[];
  onAddClick: () => void;
  onEditLesson: (lesson: Lesson) => void;
  onDeleteLesson: (id: string) => void;
  onReorderLessons: (lessons: Lesson[]) => void;
}

export const CourseLessonSection: React.FC<CourseLessonSectionProps> = ({
  lessons,
  onAddClick,
  onEditLesson,
  onDeleteLesson,
  onReorderLessons,
}) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">Course Content</h3>
      <Button type="button" onClick={onAddClick} className="cursor-pointer mt-1.5">
        <Plus className="w-4 h-4 mr-2" /> Add Lesson
      </Button>
    </div>

    <LessonList
      lessons={lessons}
      onEditLesson={onEditLesson}
      onDeleteLesson={onDeleteLesson}
      onReorderLessons={onReorderLessons}
    />
  </div>
);
