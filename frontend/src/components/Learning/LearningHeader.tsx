import React from "react";
import { ArrowLeft } from "lucide-react";

interface LearningHeaderProps {
  title: string;
  onBack: () => void;
}

const LearningHeader: React.FC<LearningHeaderProps> = ({ title, onBack }) => {
  return (
    <div className="border-b bg-background sticky top-0 z-40 flex-shrink-0">
      <div className="flex items-center justify-between px-4 py-1">
        <ArrowLeft
          className="h-6 w-6 cursor-pointer flex-shrink-0"
          onClick={onBack}
        />
        <h1 className="text-lg font-semibold truncate mx-4 text-center">
          {title}
        </h1>
        <div className="w-6" />
      </div>
    </div>
  );
};

export default LearningHeader;