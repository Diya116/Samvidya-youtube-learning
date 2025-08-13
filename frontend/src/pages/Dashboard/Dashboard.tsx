import { useState, useEffect } from "react";

import Navbar from "@/components/layout/Navbar";
import CourseList from "@/components/Course/CoursList";
import Loader from "@/components/Loader";
import { getCoursesApi, deleteCourseApi } from "@/services/courseService";

import type { CourseListType } from "@/types/course";

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
import { CourseForm } from "@/components/Course/CourseForm";
import { addCourseApi } from "@/services/courseService";
import { toast } from "sonner";
const Dashboard: React.FC = () => {
  const [courses, setCourses] = useState<CourseListType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const startTime = Date.now();
        const courseData = await getCoursesApi();
        console.log(courseData);
        const endTime = Date.now() - startTime;
        console.log(endTime / 1000);
        if (isMounted) {
          setCourses(courseData);
        }
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        if (isMounted) {
          setError("Unable to load courses. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCourseSubmit = async (newCourse: Course) => {
    try {
      const response = await addCourseApi(newCourse);
      console.log("Course submitted:", response);
      toast.success("course created successfully");
      setIsOpen(false);
      const updateCourse: CourseListType = {
        ...response.course,
        duration: response.course.totalDuration,
        numberOfLesson: response.course.lessons.length,
        completedLesson: 0,
      };

      setCourses((prevCourses) => [...prevCourses, updateCourse]);
      // window.location.reload();
    } catch (error) {
      console.error("Error submitting course:", error);
    }
  };
  const handleCourseDelete = async (courseId: string): Promise<void> => {
    try {
      if (window.confirm("Are you sure you want to delete this course?")) {
        const response = await deleteCourseApi(courseId);
        console.log(response);
        if (response.status === 200) {
          setCourses((prevCourses) =>
            prevCourses.filter((course) => course.id !== courseId)
          );
          toast.success("Course deleted successfully.");
        }
      }
    } catch (err) {
      toast.error("failed to delete course");
      console.error("Failed to delete course:", err);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-background p-6 pt-10">
        <div className="flex justify-end">
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
        </div>

        <div className="flex flex-col justify-center mt-6">
          {loading && <Loader />}

          {error && (
            <p className="text-red-500 text-center mt-4" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && courses.length > 0 ? (
            <CourseList
              courses={courses}
              handleCourseDelete={handleCourseDelete}
            />
          ) : (
            !loading &&
            !error && (
              <div className="text-center text-gray-500 mt-6">
                <h2 className="text-lg font-semibold">
                  No courses created yet.
                </h2>
                <p>Start by creating your first course.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard