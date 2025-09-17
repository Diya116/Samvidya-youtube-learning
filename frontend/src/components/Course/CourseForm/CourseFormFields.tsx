import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Course } from "@/types/course";

interface CourseFormFieldsProps {
  courseData: Course;
  setCourseData: React.Dispatch<React.SetStateAction<Course>>;
}

export const CourseFormFields: React.FC<CourseFormFieldsProps> = ({ courseData, setCourseData }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="courseTitle">Course Title<span className="text-red-500">*</span></Label>
      <Input
        id="courseTitle"
        placeholder="Enter course title"
        value={courseData.title}
        onChange={(e) => setCourseData((prev) => ({ ...prev, title: e.target.value }))}
        minLength={3}
        maxLength={300}
        required
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="courseDescription">Course Description</Label>
      <Textarea
        id="courseDescription"
        placeholder="Enter course description"
        value={courseData.description}
        onChange={(e) => setCourseData((prev) => ({ ...prev, description: e.target.value }))}
        rows={4}
        maxLength={1000}
      />
    </div>

    <div className="space-y-2">
      <Label htmlFor="coverImg">Cover Image Link</Label>
      <Input
        id="coverImg"
        placeholder="Cover image"
        value={courseData.coverImg}
        onChange={(e) => setCourseData((prev) => ({ ...prev, coverImg: e.target.value }))}
      />
    </div>
  </div>
);
