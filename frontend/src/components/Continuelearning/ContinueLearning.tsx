// import  { useState } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';

// const CourseList = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isDark, setIsDark] = useState(false);

//   const courses = [
//     {
//       name: "JavaScript Fundamentals",
//       thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/mqdefault.jpg",
//       progress: 75,
//       borderColor: "border-slate-300"
//     },
//     {
//       name: "React Development",
//       thumbnail: "https://img.youtube.com/vi/Ke90Tje7VS0/mqdefault.jpg",
//       progress: 40,
//       borderColor: "border-zinc-300"
//     },
//     {
//       name: "UI/UX Design",
//       thumbnail: "https://img.youtube.com/vi/c9Wg6Cb_YlU/mqdefault.jpg",
//       progress: 60,
//       borderColor: "border-stone-300"
//     },
//     {
//       name: "Database Management",
//       thumbnail: "https://img.youtube.com/vi/HXV3zeQKqGY/mqdefault.jpg",
//       progress: 85,
//       borderColor: "border-gray-300"
//     },
//     {
//       name: "Machine Learning",
//       thumbnail: "https://img.youtube.com/vi/aircAruvnKk/mqdefault.jpg",
//       progress: 25,
//       borderColor: "border-neutral-300"
//     },
//     {
//       name: "Cybersecurity",
//       thumbnail: "https://img.youtube.com/vi/z5nc9MDbvkw/mqdefault.jpg",
//       progress: 90,
//       borderColor: "border-slate-400"
//     }
//   ];

//   const nextCourse = () => {
//     setCurrentIndex((prev) => (prev + 1) % courses.length);
//   };

//   const prevCourse = () => {
//     setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);
//   };

//   const visibleCourses = 5;
//   const displayedCourses = [];
  
//   for (let i = 0; i < visibleCourses; i++) {
//     const index = (currentIndex + i) % courses.length;
//     displayedCourses.push(courses[index]);
//   }

//   return (
//     <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-xl p-4 transition-all duration-300`}>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
//           Continue Learning
//         </h2>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={prevCourse}
//             className={`p-1 rounded-lg transition-colors ${
//               isDark 
//                 ? 'hover:bg-gray-800 text-gray-400' 
//                 : 'hover:bg-gray-100 text-gray-600'
//             }`}
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>
//           <button
//             onClick={nextCourse}
//             className={`p-1 rounded-lg transition-colors ${
//               isDark 
//                 ? 'hover:bg-gray-800 text-gray-400' 
//                 : 'hover:bg-gray-100 text-gray-600'
//             }`}
//           >
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* Course Cards */}
//       <div className="flex gap-3 overflow-hidden justify-center ">
//         {displayedCourses.map((course, index) => (
//           <div
//             key={`${course.name}-${index}`}
//             className={`
//               flex-shrink-0 w-48 h-24 rounded-lg border-2 p-3 cursor-pointer transition-all duration-300 hover:scale-105
//               ${course.borderColor}
//               ${isDark 
//                 ? 'bg-gray-800 hover:bg-gray-700' 
//                 : 'bg-gray-50 hover:bg-gray-100'
//               }
//             `}
//           >
//             <div className="flex items-start gap-3 h-full">
//               {/* Thumbnail */}
//               <img 
//                 src={course.thumbnail} 
//                 alt={course.name}
//                 className="w-12 h-8 object-cover rounded-md flex-shrink-0"
//               />
              
//               {/* Content */}
//               <div className="flex-1 min-w-0">
//                 {/* Title */}
//                 <h3 className={`text-xs font-medium mb-2 line-clamp-2 leading-tight ${
//                   isDark ? 'text-white' : 'text-gray-900'
//                 }`}>
//                   {course.name}
//                 </h3>
                
//                 {/* Progress Bar */}
//                 <div className="space-y-1">
//                   <div className="flex justify-between items-center">
//                     <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
//                       {course.progress}%
//                     </span>
//                     <ChevronRight className={`w-3 h-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
//                   </div>
//                   <div className={`w-full h-1 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
//                     <div
//                       className={`h-1 rounded-full transition-all duration-500 ${
//                         isDark ? 'bg-white' : 'bg-black'
//                       }`}
//                       style={{ width: `${course.progress}%` }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Dots */}
//       <div className="flex justify-center mt-4 gap-1">
//         {courses.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
//               index === currentIndex 
//                 ? (isDark ? 'bg-white' : 'bg-black')
//                 : (isDark ? 'bg-gray-700' : 'bg-gray-300')
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CourseList;
