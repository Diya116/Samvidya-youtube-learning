import { CourseCard } from "./CourseCard";
import  { useEffect,useState } from 'react';
import { api } from "@/utils/axiosInstance";
const CourseCardDemo = () => {
  interface Course {
  id: string;
  title: string;
  description: string;
  coverImg: string;
  numberOfLessons: number;
  totalHours: number;
  completedLessons: number;
  imageUrl?: string;
}
  // const sampleCourses: Course[] = [
  //   {
  //     id: '1',
  //     title: 'Advanced React Patterns & Performance',
  //     description: 'Master advanced React concepts, hooks, and performance optimization techniques.',
  //     numberOfLessons: 24,
  //     totalHours: 8,
  //     completedLessons: 12,
  //     imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=240&fit=crop&crop=center'
  //   },
  //   {
  //     id: '2',
  //     title: 'JavaScript Fundamentals',
  //     description: 'Learn core JavaScript concepts from basics to advanced topics.',
  //     numberOfLessons: 18,
  //     totalHours: 6,
  //     completedLessons: 0,
  //     imageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=240&fit=crop&crop=center'
  //   },
  //   {
  //     id: '3',
  //     title: 'Node.js Backend Development',
  //     description: 'Build scalable backend applications with Node.js and Express.',
  //     numberOfLessons: 32,
  //     totalHours: 12,
  //     completedLessons: 8
  //     // No imageUrl - will use default
  //   }
  // ];
  const [course, setCourse] = useState<Course[]>([]);

  const handleCourseAction = (courseId: string) => {
    console.log(`Opening course: ${courseId}`);
  };

  const handleEditCourse = (courseId: string) => {
    console.log(`Editing course: ${courseId}`);
    // Here you would typically open an edit modal or navigate to edit page
  };

  const handleDeleteCourse = (courseId: string) => {
    console.log(`Deleting course: ${courseId}`);
    // Here you would typically show a confirmation dialog
    if (window.confirm('Are you sure you want to delete this course?')) {
      // Perform deletion
      console.log(`Course ${courseId} deleted`);
    }
  };
   const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
useEffect(() => {
   const fetchData = async () => {
       const course = await api.get(`${BACKEND_BASE_URL}/course`);
       setCourse(course.data);
       console.log("Response from backend:", course.data);
   };
   fetchData();
},[])
  return (
   // <div className="min-h-screen  bg-gray-50 p-8 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60 */">
      <div>
      <div className="max-w-6xl mx-auto">
        {/* <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">Your courses</h1>
          <p className="text-gray-600 dark:text-white">Continue where you left off or start something new</p>
        </div> */}
        
        <div className="grid grid-cols-1 gap-4">

          {course.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onAction={handleCourseAction}
              onEdit={handleEditCourse}
              onDelete={handleDeleteCourse}
            />
            // <div>
            //   <span>{course.id}</span>
            //   <span>{course.title}</span>
            //   <span>{course.description}</span>
            //   {/* <span>{course.numberOfLessons}</span>
            //   <span>{course.totalHours}</span>
            //   <span>{course.completedLessons}</span>
            //   <span>{course.coverImg}</span> */}
            //    </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCardDemo;