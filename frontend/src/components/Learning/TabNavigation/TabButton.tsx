import React from "react";
import { Button } from "@/components/ui/button";
import { type LucideIcon } from "lucide-react";

interface TabButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  variant?: "mobile" | "desktop";
  title?: string;
}

const TabButton: React.FC<TabButtonProps> = ({
  icon: Icon,
  label,
  isActive,
  onClick,
  variant = "desktop",
  title,
}) => {
  if (variant === "mobile") {
    return (
      <Button
        variant={isActive ? "default" : "ghost"}
        className="flex-1 rounded-none border-r cursor-pointer last:border-r-0"
        onClick={onClick}
      >
        <Icon className="h-4 w-4 mr-2" />
        {label}
      </Button>
    );
  }

  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="icon"
      onClick={onClick}
      title={title || label}
      className={`${isActive?'bg-background text-primary':' text-gray-400'} hover:bg-primary/10 cursor-pointer`}
    >
      <Icon className="h-5 w-5" />
    </Button>
  );
};

export default TabButton;