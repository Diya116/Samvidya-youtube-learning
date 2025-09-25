
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
export const SortableLessonCard = ({
  lesson,
  handleCurrentLesson,
  currentLessonId,
  refCallback,
  handleUpdateStatusOfLesson,
}: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    lessonId: string
  ) => {
    const isChecked = e.target.checked;
    setStatus(isChecked);
    handleUpdateStatusOfLesson(lessonId, isChecked ? "COMPLETED" : "PENDING");
  };
  const [status, setStatus] = useState(
    lesson.status === "COMPLETED" ? true : false
  );
  return (
    <Card
      ref={(el) => {
        setNodeRef(el);
        if (refCallback) refCallback(lesson.id, el);
      }}
      style={style}
      key={lesson.id}
      onClick={() => handleCurrentLesson(lesson.id)}
      className={`cursor-pointer hover:shadow-sm transition-shadow rounded-md border ${
        currentLessonId === lesson.id
          ? "border-primary bg-blue-100 dark:bg-gray-900"
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
      } `}
    >
      <CardContent className="px-2">
        <div className="flex items-center gap-2">
          <GripVertical
            className="text-gray-400 cursor-grab"
            {...attributes}
            {...listeners}
          />
          <input
            type="checkbox"
            className="w-5 h-5 rounded-md border-gray-300"
            checked={status}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              handleStatus(e, lesson.id);
            }}
          />
          <div className="flex-shrink-0 w-16 h-12 overflow-hidden rounded bg-gray-100 dark:bg-gray-700">
            <img
              src={lesson.thumbnail}
              alt="Lesson Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="default">Lesson {lesson.order}</Badge>
              {lesson.duration && (
                <Badge variant="outline">{lesson.duration}</Badge>
              )}
            </div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {lesson.title}
            </h4>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};