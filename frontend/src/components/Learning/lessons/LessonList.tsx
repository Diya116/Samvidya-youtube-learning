import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Lesson } from "@/types/lesson";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

const SortableLessonCard = ({
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

const LessonList: React.FC<{
  lessons: Lesson[];
  currentLessonId: string;
  handleCurrentLesson: (videoId: string) => void;
  handleReorderLessons: (lessons: Lesson[]) => void;
  handleUpdateStatusOfLesson: (lessonId: string, status: string) => void;
}> = ({
  lessons,
  handleCurrentLesson,
  currentLessonId,
  handleReorderLessons,
  handleUpdateStatusOfLesson,
}) => {
  const [items, setItems] = useState(lessons);
  const lessonRefs = useRef<Record<string, HTMLElement | null>>({});

  const handleRef = (id: string, element: HTMLElement | null) => {
    lessonRefs.current[id] = element;
  };

  useEffect(() => {
    if (currentLessonId && lessonRefs.current[currentLessonId]) {
      lessonRefs.current[currentLessonId]?.scrollIntoView({
        behavior: "smooth",
        block: "center", 
      });
    }
  }, [currentLessonId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over?.id);
      const newItems = arrayMove(items, oldIndex, newIndex).map(
        (item, index) => ({
          ...item,
          order: index + 1,
        })
      );
      setItems(newItems);
      handleReorderLessons(newItems);
    }
  };
  console.log(lessons);
  if (lessons.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-gray-500">
          No lessons added yet. Click "Add Lesson" to get started.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3 h-full max-h-[calc(100vh-100px)] overflow-hidden flex flex-col">
      <div className="overflow-y-auto flex-1">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            {items
              .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
              .map((lesson, index) => (
                <SortableLessonCard
                  key={lesson.id}
                  lesson={lesson}
                  index={index}
                  handleCurrentLesson={handleCurrentLesson}
                  currentLessonId={currentLessonId}
                  refCallback={handleRef}
                  handleUpdateStatusOfLesson={handleUpdateStatusOfLesson}
                />
              ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
export default LessonList;
