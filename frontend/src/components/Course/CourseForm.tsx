import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { Lesson } from '@/types/types';
import type { Course } from '@/types/types';
import { LessonForm } from '../LessonForm/LessonForm';
import {LessonList} from "../LessonForm/LessonList"


// Main Course Form Component
export const CourseForm: React.FC<{ onSubmit: (course: Course) => void }> = ({ onSubmit }) => {
  const [courseData, setCourseData] = useState<Course>({
    title: '',
    description: '',
    coverImg: '',
    image: null,
    imagePreview: '',
    lessons: []
  });
  
  const [showLessonForm, setShowLessonForm] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | undefined>(undefined);



  const handleAddLesson = (lessonData: Omit<Lesson, 'id'>) => {
    const newLesson: Lesson = {
      ...lessonData,
      id: Date.now().toString()
    };
    setCourseData(prev => ({
      ...prev,
      lessons: [...prev.lessons, newLesson]
    }));
    setShowLessonForm(false);
  };

  const handleUpdateLesson = (updatedLesson: Lesson) => {
    setCourseData(prev => ({
      ...prev,
      lessons: prev.lessons.map(lesson => 
        lesson.id === updatedLesson.id ? updatedLesson : lesson
      )
    }));
    setEditingLesson(undefined);
    setShowLessonForm(false);
  };

  const handleDeleteLesson = (id: string) => {
    setCourseData(prev => ({
      ...prev,
      lessons: prev.lessons.filter(lesson => lesson.id !== id)
    }));
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setShowLessonForm(true);
  };

  const handleSubmit = () => {
    if (!courseData.title || courseData.lessons.length === 0) return;
    onSubmit(courseData);
  };

  return (
    <div className="space-y-6">
      {/* Course Basic Info */}
      <div>
        <div className="space-y-4">
          {/* Course Title */}
          <div className="space-y-2">
            <Label htmlFor="courseTitle">Course Title
              <span className='text-red-500'>*</span></Label>
            <Input
              id="courseTitle"
              placeholder="Enter course title"
              value={courseData.title}
              onChange={(e) => setCourseData(prev => ({ ...prev, title: e.target.value }))}
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
              onChange={(e) => setCourseData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              maxLength={1000}
            />
          </div>
           <div className="space-y-2">
             <Label htmlFor="courseTitle">Cover image link
               <span className='text-red-500'>*</span></Label>
            <Input
              id="coverImg"
              placeholder="cover image "
              value={courseData.coverImg}
              onChange={(e) => setCourseData(prev => ({ ...prev, coverImg: e.target.value }))}
              minLength={3}
              maxLength={300}
              required
            />
          </div>

          {/* Course Image Upload */}
          
        </div>
      </div>

      {/* Lessons Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Course Content</h3>
          <Button
            type="button"
            onClick={() => setShowLessonForm(true)}
            disabled={showLessonForm}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lesson
          </Button>
        </div>

        {/* Lesson Form */}
        {showLessonForm && (
          <LessonForm
            onAddLesson={handleAddLesson}
            onCancel={() => {
              setShowLessonForm(false);
              setEditingLesson(undefined);
            }}
            editingLesson={editingLesson}
            onUpdateLesson={handleUpdateLesson}
          />
        )}

        {/* Lessons List */}
        <LessonList
          lessons={courseData.lessons}
          onEditLesson={handleEditLesson}
          onDeleteLesson={handleDeleteLesson}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4 border-t">
        <Button
          onClick={handleSubmit}
          disabled={!courseData.title || courseData.lessons.length === 0}
          className="min-w-32"
        >
          Create Course
        </Button>
      </div>
    </div>
  );
};


