export type Note = {
  title: string;
  content: string;
};

export type NoteTakingProps = {
  lessonId: string;
  noteId: string | null;
  setNoteId: (id: string) => void;
  note: Note;
  setNote: React.Dispatch<React.SetStateAction<Note>>;
};
