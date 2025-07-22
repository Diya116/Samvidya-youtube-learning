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
import axios from "axios"
export const AddCourseModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleCourseSubmit = async(course: Course) => {
      try{
         const response= await axios.post(" http://localhost:5000/api/v1/course",
       course,{
        headers:{'Content-Type': 'application/json',
        Authorization:`Bearer ${localStorage.getItem("token")}`
        },
      })
      console.log('Course submitted:', response);
      setIsOpen(false);
      }
      catch(error){
        console.error('Error submitting course:', error);
      }
 
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
          </DialogHeader>
          <CourseForm onSubmit={handleCourseSubmit} />
        </DialogContent>
      </Dialog>
    );
  };
  
  export default AddCourseModal;