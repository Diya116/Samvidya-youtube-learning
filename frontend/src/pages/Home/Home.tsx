import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
function Home() {
  const navigate = useNavigate();
  return (
    <div>
        <Button onClick={()=>navigate("/auth/login")}>Login/Signup</Button>
    </div>
  )
}

export default Home