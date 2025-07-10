import Navbar from '../../components/layout/Navbar'
import AddCourseModal from "@/components/Course/AddCourseModal"
import CoursesList from '@/components/Course/CoursesList'
function Dashboard() {
  return (
    <div>
        <Navbar/>
        <div className='my-5 mx-8 flex justify-end'>
        <AddCourseModal/>
        </div>
        <CoursesList/>
    </div>
  )
}

export default Dashboard