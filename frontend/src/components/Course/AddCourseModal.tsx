import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

const AddCourseModal: React.FC = () => {

    const [isOpen,setIsOpen]=useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className=" text-white hover:bg-primary/80 cursor-pointer">
          <Plus />
          Create Learning Path
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Learning Path</DialogTitle>
          <DialogDescription>
            Build your personalized course using YouTube videos as lessons
          </DialogDescription>
        </DialogHeader>
        <p>add your course form here</p>
      </DialogContent>
    </Dialog>
  );
};

export default AddCourseModal;
