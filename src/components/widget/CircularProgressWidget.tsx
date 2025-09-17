import { Card, CardContent } from "@/components/ui/card";

interface CircularProgressWidgetProps {
  currentHours: number;
  goalHours: number;
  className?: string;
}

export function CircularProgressWidget({ currentHours, goalHours, className }: CircularProgressWidgetProps) {
  const progress = goalHours > 0 ? Math.min((currentHours / goalHours) * 100, 100) : 0;
  const circumference = 2 * Math.PI * 45; // radius is 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <Card className={`shadow-card hover:shadow-soft transition-all duration-300 ${className}`}>
      <CardContent className="p-6 flex flex-col items-center">
        <div className="relative w-30 h-30">
          <svg
            className="transform -rotate-90 w-30 h-30"
            viewBox="0 0 100 100"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#f1efeff6"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#0075de"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-in-out"
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-sm font-medium text-muted-foreground">Daily goal</div>
            <div className="text-2xl font-bold text-foreground">{goalHours}</div>
            <div className="text-sm text-muted-foreground">hours</div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <div className="text-sm text-muted-foreground">
            Completed: {currentHours} hours
          </div>
        </div>
      </CardContent>
    </Card>
  );
}