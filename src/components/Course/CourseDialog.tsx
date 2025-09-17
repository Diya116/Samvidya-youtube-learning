import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogTrigger, DialogDescription
} from "@/components/ui/dialog";
import { CourseForm } from "@/components/Course/CourseForm/CourseForm";
import { Plus } from "lucide-react";

interface Props {
  isOpen: boolean;
  isEdit: boolean;
  editingCourseId?: string;
  onOpenChange: (open: boolean) => void;
  onSubmit: (course: any) => void;
  onCreate: () => void;
}

export function CourseDialog({ isOpen, isEdit, editingCourseId, onOpenChange, onSubmit, onCreate }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button 
          onClick={onCreate}
          className="flex justify-end items-center gap-1.5 mb-2 mr-5 px-5 lg:px-2 py-2 text-black bg-blue-100 border border-blue-600 rounded-md font-semibold cursor-pointer hover:bg-blue-200 transition-colors text-sm lg:text-base lg:mr-32" 
        >
          <span className="hidden sm:inline">Create Course</span>
          <span className="sm:hidden">Create Course</span>
          <span className="flex bg-primary w-6 h-6 lg:w-7 lg:h-7 justify-center items-center text-blue-100 rounded-full">
            <Plus size={16} className="lg:w-5 lg:h-5" />
          </span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="
          !max-w-full !max-h-full w-full h-full
          sm:w-[50vw] sm:max-w-none sm:max-h-[90vh] sm:h-auto
          overflow-y-auto
        "
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Learning Path" : "Create New Learning Path"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Modify your personalized course" : "Build your personalized course"}
          </DialogDescription>
        </DialogHeader>
        <CourseForm onSubmit={onSubmit} editingCourseId={editingCourseId} isEdit={isEdit} />
      </DialogContent>
    </Dialog>
  );
}

