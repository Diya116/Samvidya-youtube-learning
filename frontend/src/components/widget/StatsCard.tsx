import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "primary" | "success" | "progress" | "focus";
}

const colorMap = {
  primary: "text-primary bg-primary/10",
  success: "text-success bg-success/10", 
  progress: "text-progress bg-progress/10",
  focus: "text-focus bg-focus/10"
};

export const StatsCard = ({ title, value, icon: Icon, color }: StatsCardProps) => {
  return (
    <Card className="shadow-card hover:shadow-soft transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground group-hover:scale-105 transition-transform duration-200">
              {value}
            </p>
          </div>
          <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${colorMap[color]} group-hover:scale-110 transition-transform duration-200`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};