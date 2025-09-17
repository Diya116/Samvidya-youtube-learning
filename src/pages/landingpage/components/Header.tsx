import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
  <span className="text-2xl font-bold text-foreground">Samvidya</span>
</div>
         

          <div className="flex items-center space-x-4">
            {/* theme changing toggle button */}
            {/* <Button
              variant="ghost"
              size="icon"
              className="rounded-lg"
            >
              <Sun className="h-5 w-5" /> 
            </Button> */}
          <Button onClick={()=>navigate("/auth/signup")} className="bg-[#0075de] text-white cursor-pointer">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header
;