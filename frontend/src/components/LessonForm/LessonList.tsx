import React from 'react';
import { Edit, Trash2, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Lesson } from '@/types/types';

export const LessonList: React.FC<{
    lessons: Lesson[];
    onEditLesson: (lesson: Lesson) => void;
    onDeleteLesson: (id: string) => void;
  }> = ({ lessons, onEditLesson, onDeleteLesson }) => {
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
        <h3 className="font-semibold text-lg">Course Lessons ({lessons.length})</h3>
        {lessons.map((lesson, index) => (
          <Card key={lesson.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Lesson {index + 1}</Badge>
                    {lesson.duration && (
                      <Badge variant="outline">{lesson.duration}</Badge>
                    )}
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{lesson.title}</h4>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {lesson.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Youtube className="w-3 h-3 text-red-500" />
                    <span className="truncate">{lesson.videoUrl}</span>
                  </div>
                </div>
                <div className="flex gap-1 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditLesson(lesson)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteLesson(lesson.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };