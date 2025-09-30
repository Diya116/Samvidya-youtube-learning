import React from "react";
import { X, ArrowLeft } from "lucide-react";
import { type SaveStatus } from "@/types/Note";
import { Minimize2, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoteHeaderProps {
  title: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saveStatus: SaveStatus;
  onClose: () => void;
  isMobile: Boolean;
  isFullScreen: Boolean;
  onToggleFullScreen?: () => void;
  isStandalone?: boolean; // New prop to determine if it's standalone
  showClose?: boolean; // New prop to control close button visibility
}

const NoteHeader: React.FC<NoteHeaderProps> = ({
  title,
  onTitleChange,
  saveStatus,
  onClose,
  isMobile,
  isFullScreen,
  onToggleFullScreen,
  isStandalone = false,
  showClose = true
}) => {
  const getSaveStatusColor = () => {
    switch (saveStatus) {
      case 'saving': return 'text-yellow-600';
      case 'saved': return 'text-green-600';
      case 'unsaved': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving': return 'Saving...';
      case 'saved': return 'Saved';
      case 'unsaved': return 'Unsaved';
      default: return '';
    }
  };

  return (
    <div className="p-4 border-b flex items-center justify-between bg-white dark:bg-gray-800 shrink-0">
      <div className="flex items-center flex-1">
        {/* Back button for standalone mode */}
        {isStandalone && (
          <button 
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 mr-3"
            title="Go back"
          >
            <ArrowLeft className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </button>
        )}
        
        <input
          type="text"
          placeholder="Enter note title..."
          className="flex-1 text-lg font-semibold border-none outline-none bg-transparent dark:text-white mr-4"
          value={title}
          onChange={onTitleChange}
        />
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm ${getSaveStatusColor()}`}>
          {getSaveStatusText()}
        </span>

        {/* Mobile fullscreen toggle */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFullScreen}
            className="cursor-pointer"
          >
            {isFullScreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        )}

        {/* Close button - only show in learning page mode */}
        {showClose && (
          <button 
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Close note editor"
          >
            <X className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          </button>
        )}
      </div>
    </div>
  );
};

export default NoteHeader;