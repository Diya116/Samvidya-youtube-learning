import { useState, useEffect } from "react";

import Navbar from "@/components/layout/Navbar";
import AddCourseModal from "@/components/Course/AddCourseModal";
import CourseList from "@/components/Course/CoursList";
import Loader from "@/components/Loader";

import { getCoursesApi } from "@/services/courseService";

import type { CourseListType } from "@/types/course";

const Dashboard: React.FC = () => {
  const [courses, setCourses] = useState<CourseListType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; 

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const startTime=Date.now();
        const courseData = await getCoursesApi();
        const endTime=Date.now()-startTime;
        console.log(endTime/1000);
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

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-background p-6 pt-10">
        <div className="flex justify-end">
          <AddCourseModal />
        </div>

        <div className="flex flex-col justify-center mt-6">
          {loading && <Loader />}

          {error && (
            <p className="text-red-500 text-center mt-4" role="alert">
              {error}
            </p>
          )}

          {!loading && !error && courses.length > 0 ? (
            <CourseList courses={courses} />
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

export default Dashboard;

