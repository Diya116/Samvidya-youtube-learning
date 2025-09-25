import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

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

import { SortableLessonCard } from "./SortableLessonCard";

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
    <div className="space-y-3 h-full max-h-[calc(100vh-100px]]])] overflow-hidden flex flex-col">
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
