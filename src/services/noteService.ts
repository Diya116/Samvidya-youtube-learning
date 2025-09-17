import { api } from "@/utils/axiosInstance";
import { type Note } from "@/types/Note";

export const noteService = {
  async getNote(noteId: string) {
    return api.get(`/note/${noteId}`);
  },

  async getLessonNotes(lessonId: string) {
    return api.get(`/note/lesson/${lessonId}`);
  },

  async createNote(lessonId: string, note: Note) {
    return api.post("/note", { ...note, lessonId });
  },

  async updateNote(noteId: string, note: Note) {
    return api.put(`/note/${noteId}`, { ...note });
  },
};
