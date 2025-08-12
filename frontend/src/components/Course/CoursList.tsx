import { CourseCard } from "./CourseCard";
import Loader from "@/components/Loader";
import type { CourseListType } from "@/types/course";
function CourseList({courses}:{courses:CourseListType[]}) {
  return (
    <div>
      {courses ? (
        <div className="px-10 py-5 flex flex-col gap-2 lg:px-56">
          {courses.map((course:CourseListType, index:number) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default CourseList;
