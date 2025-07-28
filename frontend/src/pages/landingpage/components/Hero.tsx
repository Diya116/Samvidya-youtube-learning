import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import learningWorkspaceDoodle from "@/assets/hero1.png";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-4 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Structure your
                <span className="text-[#0075de]"> YouTube </span>
                learning journey
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Transform scattered YouTube videos into structured courses.
                Learn distraction-free with progress tracking, note-taking, and
                productivity tools.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-[#0075de] text-white cursor-pointer hover:bg-[#0075de]"
                onClick={() => navigate("/auth/login")}
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#0075de] rounded-full"></div>
                <span>Free forever</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#0075de] rounded-full"></div>
                <span>No ads</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#0075de] rounded-full"></div>
                <span>Open source</span>
              </span>
            </div>
          </div>

          <div className="relative">
            {/* Glowing radial background */}
            <div className="absolute inset-0 bg-gradient-radial from-notion-blue/10 to-transparent blur-3xl z-0" />

            <div className="relative z-10">
              <img
                src={learningWorkspaceDoodle}
                alt="Learning workspace illustration"
                className="w-full h-auto max-w-lvw mx-auto opacity-90 mix-blend-lighten"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
