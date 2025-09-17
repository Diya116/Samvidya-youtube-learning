import React from "react";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  Clock,
  BookOpen,
  ArrowRight,
  MoreVertical,
  Edit,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DeleteCourseButton } from "./DeleteCourseButton";
// Types
type courseList = {
  id: string;
  title: string;
  description: string;
  coverImg: string;
  duration: string;
  activeLessonId: string;
  numberOfLesson: number;
  completedLesson: number;
};

// Course Card Component
interface CourseCardProps {
  course: courseList;
  onDelete: (courseId: string) => void;
  onEdit: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onDelete,
  onEdit,
}) => {
  const progressPercentage = Math.round(
    (course.completedLesson / course.numberOfLesson) * 100
  );
  const isStarted = course.completedLesson > 0;
  const defaultImage =
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=240&fit=crop&crop=center";
  const navigate = useNavigate();

  return (
    <Card
      className="group overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer border border-gray-200 bg-white w-full max-w-72 dark:bg-gray-950 dark:border-gray-800"
      onClick={() =>
        navigate(`/learn/${course.id}?lesson=${course.activeLessonId}`)
      }
    >
      {/* Image Section - Top */}
      <div
        className="relative h-32 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${course.coverImg || defaultImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Status Badge */}
        <div className="absolute top-2 left-2">
          <span
            className={`text-xs px-1.5 py-0.5 rounded font-medium ${
              isStarted
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {isStarted ? "Progress" : "New"}
          </span>
        </div>

        {/* More Options Dropdown */}
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-3 w-3 text-gray-700" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(course.id);
                }}
                className="cursor-pointer text-xs"
              >
                <Edit className="mr-2 h-3 w-3" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Delete Confirmation */}
              <div
                onClick={(e) => e.stopPropagation()} // prevent parent click
                className="px-2"
              >
                <DeleteCourseButton onConfirm={() => onDelete(course.id)} />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content Section - Bottom */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <h3 className="text-base font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors dark:text-white dark:group-hover:text-blue-400">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed dark:text-gray-300">
          {course.description}
        </p>

        {/* Course Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <BookOpen className="w-3 h-3" />
            <span>{course.numberOfLesson} lessons</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Progress Bar - Only if started */}
        {isStarted && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 dark:text-gray-400">Progress</span>
              <span className="text-gray-600 font-mono dark:text-gray-300">
                {progressPercentage}%
              </span>
            </div>
            <div className="relative w-full bg-gray-200 rounded-full h-1.5 overflow-hidden dark:bg-gray-700">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/learn/${course.id}`);
          }}
          className="w-full inline-flex items-center justify-center space-x-1 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-all duration-200 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          <span>{isStarted ? "Continue" : "Start"}</span>
          <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
    </Card>
  );
};
