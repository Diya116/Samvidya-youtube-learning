export type Note = {
  title: string;
  content: string;
};

export type SaveStatus = 'saved' | 'saving' | 'unsaved';

export type NoteTakingProps = {
  courseId?: string;
  noteId: string | null;
  setNoteId: (id: string) => void;
  note: Note;
  setIsNotesOpen?: (isOpen: boolean) => void;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
  isMobile?:Boolean;
  isFullScreen?:Boolean;
  onToggleFullScreen?:()=>void;
};

export type Command = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  action: (editor: any) => void;
};

export type MenuPosition = {
  top: number;
  left: number;
};