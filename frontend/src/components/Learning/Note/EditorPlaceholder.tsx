import React from "react";

interface EditorPlaceholderProps {
  isVisible: boolean;
}

const EditorPlaceholder: React.FC<EditorPlaceholderProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="absolute top-4 left-4 text-gray-400 dark:text-gray-500 pointer-events-none z-10"
      style={{ fontSize: '16px', lineHeight: '1.5' }}
    >
      Type '/' for commands
    </div>
  );
};

export default EditorPlaceholder;