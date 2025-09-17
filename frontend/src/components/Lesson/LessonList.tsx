import React, { useState } from "react";
import { Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const SortableLessonCard = ({  lesson, onEdit, onDelete }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      key={lesson.id}
      className="hover:shadow-md transition-shadow cursor-move"
    >
      <CardContent className="px-2">
        <div className="flex items-start justify-between">
          <GripVertical
            className="cursor-grab"
            {...attributes}
            {...listeners}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge>Lesson {lesson.order}</Badge>
              {lesson.duration && (
                <Badge variant="outline">{lesson.duration}</Badge>
              )}
            </div>
            <div className="flex gap-4">
              <div>
                <img src={lesson.thumbnail} className="w-32 h-full" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1 dark:text-white">
                  {lesson.title}
                </h4>
              </div>
            </div>
          </div>
          <div className="flex gap-1 ml-4">
            <Button variant="ghost" size="sm" onClick={() => onEdit(lesson)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(lesson.id)}
              className="text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export const LessonList: React.FC<{
  lessons: Lesson[];
  onEditLesson: (lesson: Lesson) => void;
  onDeleteLesson: (id: string) => void;
  onReorderLessons:(Lesson:Lesson[])=>void;
}> = ({ lessons, onEditLesson, onDeleteLesson,onReorderLessons }) => {

  const [items,setItems]=useState(lessons);

  const sensors=useSensors(
    useSensor(PointerSensor,{
      activationConstraint:{
        distance:5
      }
    })
  )

  const handleDragEnd=(event:DragEndEvent)=>{
    const {active,over}=event;
    if(active.id !== over?.id)
    {
       const oldIndex=items.findIndex((item)=>item.id===active.id);
       const newIndex=items.findIndex((item)=>item.id===over?.id);
       const newItems=arrayMove(items,oldIndex,newIndex).map((item,index)=>({
        ...item,
        order:index+1
       }));
       setItems(newItems);
      onReorderLessons(newItems);
    }
  }
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
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">
        Course Lessons ({lessons.length})
      </h3>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(l=>l.id)} strategy={verticalListSortingStrategy}>
 {lessons.map((lesson, index) => (
        <SortableLessonCard key={lesson.id} lesson={lesson} index={index} onEdit={onEditLesson} onDelete={onDeleteLesson} />
      ))}
        </SortableContext>
      </DndContext>
     
    </div>
  );
};
