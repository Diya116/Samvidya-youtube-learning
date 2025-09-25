import type { Lesson } from "@/types/lesson"
function LessonDescription({lessons,currentLessonId}:{lessons:Lesson[],currentLessonId:string}) {
  return (
      <div className="p-4 space-y-4 overflow-y-scroll h-screen">
      {lessons
        .filter((lesson) => lesson.id === currentLessonId)
        .map((lesson) => (
          <div key={lesson.id}>
            {lesson.description}
          </div>
        ))}
    </div>
  )
}

export default LessonDescription