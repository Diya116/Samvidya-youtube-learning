import React, { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types/course";
import { CourseForm } from "./CourseForm";
import { addCourseApi } from "@/services/courseService";
import { toast } from "sonner";
export const AddCourseModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCourseSubmit = async (course: Course) => {
    try {
      const response = await addCourseApi(course);
      console.log("Course submitted:", response);
      toast.success("course created successfully");
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting course:", error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer dark:text-white">
          <Plus className="h-4 mr-2" />
          Create New Learning Path
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-none w-[50vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Learning Path</DialogTitle>
          <DialogDescription>
            Build your personalized course using YouTube videos as lessons
          </DialogDescription>
        </DialogHeader>
        <CourseForm onSubmit={handleCourseSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseModal;
