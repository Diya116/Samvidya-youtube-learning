import Navbar from '../../components/layout/Navbar'
import AddCourseModal from "@/components/Course/AddCourseModal"
import CoursesList from '@/components/Course/CoursesList'
import CourseCardDemo from '@/components/Course/CourseCard'
function Dashboard() {
  return (
    <div>
        <Navbar/>
        <CoursesList/>
        <div className='my-5 mx-8 flex justify-end'>
        <AddCourseModal/>
        </div>
        <CourseCardDemo/>
    </div>
  )
}

export default Dashboard