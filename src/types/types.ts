// export interface Lesson {
//     id: string;
//     title: string;
//     description: string;
//     videoUrl: string;
//     duration?: string;
//   }
  
//   export interface Course {
//     title: string;
//     description: string;
//     coverImg: string;
//     imagePreview: string;
//     lessons: Lesson[];
//   }

  export interface YouTubeVideoDetails {
  title: string;
  description: string;
  duration: string; // e.g., "10:30"
  thumbnail:string
}

  export type FormErrors = {
    [key: string]: string;
};