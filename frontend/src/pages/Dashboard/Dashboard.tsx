import ContinueLearning from "@/components/continuelearning/ContinueLearning";
import ContinueReacding from "@/components/continuelearning/ContinueReacding";
import { PlayIcon, Timer } from "lucide-react";
import flower from "../../assets/flower.gif";
import { CircularProgressWidget } from "@/components/widget/CircularProgressWidget";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
//import { Navigate } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 pt-6 sm:pt-10">
      <div className="max-w-7xl mx-auto">
        {/* Main layout - two columns on desktop */}
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Left column - Main content */}
          <div className="flex-1">
            {/* Banner section - limited width */}
            <div className="max-w-3xl bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 lg:mb-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    Hi, {user?.name || "learner"}
                  </h1>
                  <p className="text-muted-foreground text-base sm:text-lg mb-3 sm:mb-4">
                    Ready to learn something new today?
                  </p>
                  <Button className="cursor-pointer" onClick={()=>{
                    localStorage.getItem("lastLearningUrl") && (window.location.href=localStorage.getItem("lastLearningUrl")||"")
                  }}>
                    <PlayIcon className="w-4 h-4 mr-2" />
                    Back to Learning
                  </Button>
                </div>
                <div className="flex-shrink-0">
                  <img src={flower} className="w-16 sm:w-20 lg:w-24" alt="Flower decoration" />
                </div>
              </div>
            </div>

            {/* Continue learning section */}
            <div className="mb-8 lg:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                Continue Learning
              </h2>
              <ContinueLearning />
            </div>

            {/* Continue reading section */}
            <div className="mb-8 lg:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                Continue Reading
              </h2>
              <ContinueReacding />
            </div>
          </div>

          {/* Right column - Sidebar (starts from top) */}
          <div className="w-full xl:w-[300px] flex-shrink-0 space-y-4 lg:space-y-6">
            {/* Pomodoro button */}
            <div className="flex justify-center xl:justify-start">
              <Button className="bg-black hover:bg-black/90 w-full sm:w-auto">
                <Timer className="w-5 h-5 mr-2" />
                Set Pomodoro
              </Button>
            </div>

            {/* Progress widget */}
            <div className="flex justify-center xl:justify-start">
              <CircularProgressWidget currentHours={5} goalHours={8} />
            </div>

            {/* Spotify player */}
            <div className="w-full">
              <div className="aspect-[5/6] w-full max-w-[300px] mx-auto xl:mx-0">
                <iframe
                  className="rounded-xl w-full h-full"
                  src="https://open.spotify.com/embed/album/20s8MvS66EURHtY9Ya3ERs?utm_source=generator"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Player"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;