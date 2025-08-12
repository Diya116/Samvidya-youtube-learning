import type { Lesson } from "./lesson";
  
  export interface Course {
    id?:string;
    title: string;
    description: string;
    coverImg: string;
    lessons: Lesson[];
  }

  export interface YouTubeVideoDetails {
  title: string;
  description: string;
  duration: string; 
}

  export type FormErrors = {
    [key: string]: string;
};
export type CourseListType={
    id:string;
    title:string;
    description:string;
    coverImg:string;
    duration:string;
    numberOfLesson:number;
    completedLesson:number;
    activeLessonId:string;
}