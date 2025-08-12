export interface Lesson {
    id: string;
    title: string;
    description: string;
    videoId: string;
    duration?: string;
    thumbnail?:string;
    order?:number;
  }