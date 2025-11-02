import { useState, useEffect } from "react";
import { useCourses, useAddCourse, useUpdateCourse, useDeleteCourse } from "@/hooks/useCourses";
import type { Course, CourseListType } from "@/types/course";
import { CourseCard } from "@/components/Course/CourseCard";
import Loader from "@/components/Loader";
import Searchbar from "@/components/Searchbar/Searchbar";
import { CourseDialog } from "@/components/Course/CourseDialog";
import { EmptyState } from "@/components/Course/EmptyState";
function Courses() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredCourses, setFilteredCourses] = useState<CourseListType[]>([]);
  const [editingCourseId, setEditingCourseId] = useState<string | undefined>();
  const [isEdit, setIsEdit] = useState(false);

  const { data: courses, isLoading, isError, error } = useCourses();
  const addCourse = useAddCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();

  useEffect(() => {
    if (!courses) return;
    if (!searchQuery.trim()) setFilteredCourses(courses);
    else {
      const query = searchQuery.toLowerCase();
      setFilteredCourses(courses.filter((c) => c.title.toLowerCase().includes(query)));
    }
  }, [courses, searchQuery]);

  const handleCourseSubmit = async (course: Course) => {
    if (isEdit) {
      updateCourse.mutate(course, {
        onSuccess: () => setIsOpen(false)
      });
    } else {
      addCourse.mutate(course, {
        onSuccess: () => setIsOpen(false)
      });
    }
  };

  const handleCourseDelete = (id: string) => {
     deleteCourse.mutate(id);
  };

  return (
    <div className="w-full">
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search courses..." />
      <div className="flex justify-end">
        <CourseDialog
          isOpen={isOpen}
          isEdit={isEdit}
          editingCourseId={editingCourseId}
          onOpenChange={setIsOpen}
          onSubmit={handleCourseSubmit}
          onCreate={() => { setEditingCourseId(undefined); setIsEdit(false); setIsOpen(true); }}
        />
      </div>

      {isLoading && <Loader />}
      {isError && <p className="text-red-500">{(error as Error)?.message || "Unable to load courses."}</p>}

      {!isLoading && courses?.length === 0 && <EmptyState />}

      {filteredCourses?.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center w-full gap-x-12 gap-y-4 lg:justify-start">
          {filteredCourses.map((course, index) => (
            <CourseCard key={index} course={course} onDelete={handleCourseDelete} onEdit={(id) => { setEditingCourseId(id); setIsEdit(true); setIsOpen(true); }} />
          ))}
        </div>
      ) : (
        !isLoading && courses && courses.length > 0 && (
          <p className="text-foreground text-center">No courses found.</p>
        )
      )}
    </div>
  );
}

export default Courses;

