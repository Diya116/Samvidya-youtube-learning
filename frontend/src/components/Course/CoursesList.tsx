import React from 'react';
import {CourseCard} from "../Course/CourseCard"
interface Course {
  id: string;
  title: string;
  description: string;
  numberOfLessons: number;
  totalHours: number;
  completedLessons: number;
  gradient: string;
}
const CourseList: React.FC = () => {
  // Dummy data with your structure
  const courses: Course[] = [
    {
      id: '1',
      title: 'Complete React Development Course',
      description: 'Master React.js from scratch with hands-on projects, hooks, context API, and modern development practices for building scalable applications.',
      numberOfLessons: 45,
      totalHours: 12.5,
      completedLessons: 8,
      gradient: 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600'
    },
    {
      id: '2',
      title: 'JavaScript Fundamentals: ES6+ Modern JavaScript',
      description: 'Learn modern JavaScript features including arrow functions, destructuring, async/await, promises, and advanced programming concepts.',
      numberOfLessons: 28,
      totalHours: 8.2,
      completedLessons: 0,
      gradient: 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600'
    },
    {
      id: '3',
      title: 'Node.js & Express.js Backend Development',
      description: 'Build robust backend applications with Node.js, Express.js, MongoDB, authentication, and RESTful API development.',
      numberOfLessons: 32,
      totalHours: 10.8,
      completedLessons: 15,
      gradient: 'bg-gradient-to-br from-orange-400 via-pink-400 to-red-500'
    },
    {
      id: '4',
      title: 'TypeScript for JavaScript Developers',
      description: 'Add type safety to your JavaScript projects with TypeScript fundamentals, interfaces, generics, and advanced features.',
      numberOfLessons: 24,
      totalHours: 7.1,
      completedLessons: 3,
      gradient: 'bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500'
    },
    {
      id: '5',
      title: 'CSS Grid & Flexbox - Modern Layouts',
      description: 'Master modern CSS layout techniques with Grid and Flexbox for creating responsive, professional web designs.',
      numberOfLessons: 18,
      totalHours: 5.3,
      completedLessons: 18,
      gradient: 'bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600'
    },
    {
      id: '6',
      title: 'MongoDB Database Design & Operations',
      description: 'Learn MongoDB database design, queries, indexing, aggregation pipelines, and performance optimization techniques.',
      numberOfLessons: 22,
      totalHours: 6.5,
      completedLessons: 0,
      gradient: 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-500'
    }
  ];

  const handleCourseAction = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    const isStarted = course && course.completedLessons > 0;
    console.log(`${isStarted ? 'Resuming' : 'Starting'} course: ${course?.title}`);
    // Handle course action logic here
  };

return (
  <div className="max-w-7xl mx-auto min-h-screen flex justify-center items-center">
    {/* Course Centered Grid */}
    <div className="flex justify-center items-center gap-6 flex-wrap">
      {courses.map((course) => (
        <div key={course.id} className="flex-shrink-0 w-80">
          <CourseCard 
            course={course} 
            onAction={handleCourseAction}
          />
        </div>
      ))}
    </div>
  </div>
);

};

export default CourseList
