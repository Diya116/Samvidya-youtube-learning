import { Youtube, BookOpen, Timer, TrendingUp, PenTool, Zap } from "lucide-react";
// import starDoodle from "@/assets/star-doodle.png";
// import lightbulbDoodle from "@/assets/lightbulb-doodle.png";

const Features = () => {
  const features = [
    {
      icon: Youtube,
      title: "YouTube Integration",
      description: "Convert any YouTube video or playlist into structured courses with easy import and organization."
    },
    {
      icon: BookOpen,
      title: "Distraction-Free Learning",
      description: "Focus on learning with our clean, minimal interface designed to eliminate distractions."
    },
    {
      icon: PenTool,
      title: "Side-by-Side Notes",
      description: "Take notes while watching videos with our synchronized note-taking system."
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Track your learning progress with detailed analytics and completion metrics."
    },
    {
      icon: Timer,
      title: "Pomodoro Timer",
      description: "Built-in focus timers to help you maintain productive learning sessions."
    },
    {
      icon: Zap,
      title: "Learning Streaks",
      description: "Build consistent learning habits with GitHub-style learning streaks and motivation."
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-20 bg-notion-gray-50 dark:bg-notion-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16 relative">
          {/* <div className="absolute top-0 right-1/4 hidden lg:block">
            <img src={lightbulbDoodle} alt="" className="w-16 h-16 opacity-60" />
          </div> */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Everything you need to
            <span className="text-notion-blue"> learn effectively</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Samvidya provides all the tools you need to transform your YouTube learning into a structured, productive experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 relative">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl border border-notion-gray-200 dark:border-notion-gray-200 bg-background hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 rounded-xl bg-[#0075de]/10 group-hover:bg-[#0075de]/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-[#0075de]" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
          {/* <div className="absolute -bottom-8 -right-8 hidden lg:block">
            <img src={starDoodle} alt="" className="w-20 h-20 opacity-40" />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Features;