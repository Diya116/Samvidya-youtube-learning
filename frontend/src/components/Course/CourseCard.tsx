import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Clock, BookOpen } from 'lucide-react';

// Types
interface Course {
  id: string;
  title: string;
  description: string;
  numberOfLessons: number;
  totalHours: number;
  completedLessons: number;
  gradient: string;
}

// Course Card Component
interface CourseCardProps {
  course: Course;
  onAction: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onAction }) => {
  const progressPercentage = Math.round((course.completedLessons / course.numberOfLessons) * 100);
  const isStarted = course.completedLessons > 0;

  return (
    <Card className="group overflow-hidden transition-all duration-300  cursor-pointer border-0 bg-white w-full max-w-sm">
      {/* Clean Image Header */}
      <div 
        className={`relative h-48 bg-cover bg-center ${course.gradient}`}
        style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp5070716.jpg')" }}
        onClick={() => onAction(course.id)}
      >
        {/* Subtle Overlay for Better Visual Appeal */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Progress Badge - Only if started */}
        {isStarted && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-xs font-medium text-gray-800">{progressPercentage}%</span>
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onAction(course.id)}
            className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center hover:bg-white transition-all duration-200"
          >
            <Play className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" />
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-6 left-6 opacity-20">
          <div className="w-8 h-8 rounded-full border-2 border-white"></div>
        </div>
        <div className="absolute bottom-6 left-6 opacity-15">
          <div className="w-12 h-12 rounded-full border border-white"></div>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Course Title and Description */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 leading-tight line-clamp-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-500">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">{course.numberOfLessons} lessons</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">{course.totalHours}h</span>
            </div>
          </div>
          
          {/* Action Button */}
          <button
            onClick={() => onAction(course.id)}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2"
          >
            <Play className="w-3 h-3" fill="currentColor" />
            <span>{isStarted ? 'Continue' : 'Start'}</span>
          </button>
        </div>

        {/* Progress Section */}
        {isStarted && (
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium text-gray-900">
                {course.completedLessons}/{course.numberOfLessons} completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Demo Component
export default function CourseCardDemo() {
  const sampleCourses: Course[] = [
    {
      id: '1',
      title: 'Advanced React Development',
      description: 'Master modern React patterns, hooks, and state management with real-world projects and best practices.',
      numberOfLessons: 24,
      totalHours: 12,
      completedLessons: 8,
      gradient: 'bg-gradient-to-br from-blue-500 to-purple-600'
    },
    {
      id: '2',
      title: 'UI/UX Design Fundamentals',
      description: 'Learn the principles of great design, user research, prototyping, and creating beautiful interfaces.',
      numberOfLessons: 18,
      totalHours: 9,
      completedLessons: 0,
      gradient: 'bg-gradient-to-br from-pink-500 to-orange-500'
    },
    {
      id: '3',
      title: 'Full-Stack JavaScript',
      description: 'Build complete web applications using Node.js, Express, MongoDB, and modern frontend frameworks.',
      numberOfLessons: 32,
      totalHours: 20,
      completedLessons: 15,
      gradient: 'bg-gradient-to-br from-green-500 to-teal-600'
    }
  ];

  const handleAction = (courseId: string) => {
    console.log('Course action:', courseId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Course Library</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onAction={handleAction} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}