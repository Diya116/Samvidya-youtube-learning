import { useEffect } from "react";
import type{ Note, SaveStatus } from "@/types/Note";
import { api } from "@/utils/axiosInstance";

export const useAutoSave = (
  note: Note,
  noteId: string | null,
  courseId: string | undefined,
  setNoteId: (id: string) => void,
  setSaveStatus: (status: SaveStatus) => void
) => {
  useEffect(() => {
    if (!note.title && !note.content) return;
    
    setSaveStatus('saving');
    const timeoutId = setTimeout(async () => {
      try {
        if (noteId) {
          await api.put(`/note/${noteId}`, { ...note });
        } else if (note.title || note.content) {
          const response = await api.post("/note", { ...note, courseId });
          if (response.status === 201) {
            setNoteId(response.data.note.id);
          }
        }
        setSaveStatus('saved');
      } catch (error) {
        console.error("Error auto-saving note:", error);
        setSaveStatus('unsaved');
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [note.title, note.content, noteId, courseId, setNoteId, setSaveStatus]);
};
