import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCoursesApi, addCourseApi, updateCourseApi, deleteCourseApi } from "@/services/courseService";
import type { Course, CourseListType } from "@/types/course";
import { toast } from "sonner";

export function useCourses() {
  return useQuery<CourseListType[]>({
    queryKey: ["courses"],
    queryFn: getCoursesApi,
    staleTime: 1000 * 60, // 1 min cache
  });
}

export function useAddCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCourseApi,
    onSuccess: (response) => {
      const course = response.data;
      const updatedCourse: CourseListType = {
        ...course,
        duration: course.totalDuration || "20M 20S",
        numberOfLesson: course.lessons?.length || 0,
        completedLesson: 0,
      };
      queryClient.setQueryData<CourseListType[]>(["courses"], (old) =>
        old ? [...old, updatedCourse] : [updatedCourse]
      );
      toast.success(response.message || "Course created successfully");
    },
    onError: () => toast.error("Failed to create course."),
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (course: Course) => updateCourseApi(course),
    onSuccess: (response) => {
      const updated = response.data;
      const courseWithStats: CourseListType = {
        ...updated,
        duration: updated.totalDuration || "20M 20S",
        numberOfLesson: updated.lessons?.length || 0,
        completedLesson: 0,
      };
      queryClient.setQueryData<CourseListType[]>(["courses"], (old) =>
        old ? old.map((c) => (c.id === updated.id ? courseWithStats : c)) : [courseWithStats]
      );
      toast.success(response.message || "Course updated successfully");
    },
    onError: () => toast.error("Failed to update course."),
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCourseApi(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<CourseListType[]>(["courses"], (old) =>
        old ? old.filter((c) => c.id !== id) : []
      );
      toast.success("Course deleted successfully");
    },
    onError: () => toast.error("Failed to delete course"),
  });
}
