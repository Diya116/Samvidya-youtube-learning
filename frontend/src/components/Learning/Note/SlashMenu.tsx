import React from "react";
import type { Command, MenuPosition } from "@/types/Note";

interface SlashMenuProps {
  isVisible: boolean;
  position: MenuPosition;
  commands: Command[];
  selectedIndex: number;
  query: string;
  onCommandSelect: (command: Command) => void;
}

const SlashMenu: React.FC<SlashMenuProps> = ({
  isVisible,
  position,
  commands,
  selectedIndex,
  query,
  onCommandSelect
}) => {
  if (!isVisible) return null;

  return (
    <div
      className="slash-menu absolute bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden z-50 w-64"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="max-h-64 overflow-y-auto">
        {commands.length > 0 ? (
          commands.map((command, index) => (
            <div
              key={index}
              className={`px-3 py-2 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors ${
                index === selectedIndex 
                  ? 'bg-blue-50 dark:bg-gray-700 text-primary' 
                  : 'hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-primary'
              }`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onCommandSelect(command);
              }}
            >
              <div className="flex justify-start items-center gap-4">
                <command.icon className="bg-blue-100 dark:bg-gray-600 px-2 py-1 flex items-center justify-center text-primary font-semibold h-8 w-8 border rounded-sm dark:text-white" />
                <div className="font-medium">{command.name}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-3 py-2 text-gray-400 text-sm">
            No commands found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SlashMenu;
