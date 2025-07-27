import React from 'react';
import { Card } from '@/components/ui/card'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {  Clock, BookOpen, ArrowRight, MoreVertical, Edit, Trash2 } from 'lucide-react';

// Types
interface Course {
  id: string;
  title: string;
  description: string;
  numberOfLessons: number;
  totalHours: number;
  completedLessons: number;
  imageUrl?: string;
  coverImg?: string; // Optional cover image URL
}

// Course Card Component
interface CourseCardProps {
  course: Course;
  onAction: (courseId: string) => void;
  onEdit: (courseId: string) => void;
  onDelete: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onAction, onEdit, onDelete }) => {
  const progressPercentage = Math.round((course.completedLessons / course.numberOfLessons) * 100);
  const isStarted = course.completedLessons > 0;
  const defaultImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=240&fit=crop&crop=center";

  return (
    <Card 
      className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer  border-r-2 border-slate-400 bg-gray-100  w-full dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60 "
    >
      <div className="flex h-32">
        {/* Image Section - Left Side */}
        <div 
          className="relative w-48 flex-shrink-0 bg-cover bg-center overflow-hidden"
          style={{ 
            backgroundImage: `url(${course.coverImg || defaultImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/30"></div>
        </div>

        {/* Content Section - Right Side */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          {/* Top Section - Title and Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1 group-hover transition-colors dark:text-amber-50">
                {course.title}
              </h3>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-md font-mono font-medium border ${
                  isStarted 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  {isStarted ? 'IN_PROGRESS' : 'READY_TO_START'}
                </span>
                
                {/* More Options Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(course.id);
                      }}
                      className="cursor-pointer"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Course
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(course.id);
                      }}
                      className="cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Course
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed dark:text-gray-300">
              {course.description}
            </p>
          </div>

          {/* Bottom Section - Stats, Progress, and Action */}
          <div className="space-y-2">
            {/* Course Stats and Action */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="font-mono">{course.numberOfLessons}</span>
                  <span>lessons</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{course.totalHours}h</span>
                  <span>total</span>
                </div>
              </div>
              
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onAction(course.id);
                }}
                className="inline-flex items-center space-x-1 px-3 py-1.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all duration-200 hover:scale-105 active:scale-95 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
              >
                <span>{isStarted ? 'Continue' : 'Start'}</span>
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>

            {/* Progress Bar - Only if started */}
            {isStarted && (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500 font-medium dark:text-gray-400">
                  Progress:
                </span>
                <div className="flex items-center space-x-2 flex-1">
                  <div className="relative flex-1 max-w-24 bg-gray-300 rounded-sm h-1 overflow-hidden dark:bg-gray-700">
                    <div 
                      className="h-full bg-gray-900 transition-all duration-300 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                  </div>
                  <span className="text-xs text-gray-600 font-mono tabular-nums dark:text-gray-300">
                    {course.completedLessons}/{course.numberOfLessons}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

