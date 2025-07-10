import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Course } from '@/types/types';
import {CourseForm} from "./CourseForm"
export const AddCourseModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleCourseSubmit = (course: Course) => {
      console.log('Course submitted:', course);
      // Handle course submission here
      setIsOpen(false);
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            {/* <DialogDescription>
              Add course details, upload an image, and create lessons with YouTube videos.
            </DialogDescription> */}
          </DialogHeader>
          <CourseForm onSubmit={handleCourseSubmit} />
        </DialogContent>
      </Dialog>
    );
  };
  
  export default AddCourseModal;