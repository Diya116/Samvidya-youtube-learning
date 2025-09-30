import { api } from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { format } from "date-fns";
import noteemptystate from "../../../../public/noteemptystate.png";

function NotesList({
  courseId,
  setNoteId,
  setIsOpen,
  setIsNotesOpen,
}: {
  courseId: string | undefined;
  setNoteId: (noteId: string) => void;
  setIsOpen: (val: boolean) => void;
  setIsNotesOpen: (val: Boolean) => void;
}) {
  const [note, notes] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotes = async () => {
      if (courseId) {
        setLoading(true);
        console.log({ courseId });
        const response = await api.get(`/note/course/${courseId}`);
        console.log(response.data.notes);
        notes(response.data.notes);
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="pt-2 h-full flex flex-col">
      {loading && (
        <div className="flex justify-center py-4">
          <Loader />
        </div>
      )}
      
      {/* Uncomment if you want to add search functionality */}
      {/* <div className="flex justify-center mb-4">
        <input 
          placeholder="search notes...." 
          className="border border-primary rounded-sm p-2 px-4 outline-primary ml-2"
        />
      </div> */}
      
      <div className="flex-1 overflow-y-scroll">
        {note.length > 0 ? (
          <div className="space-y-2 p-2">
            {note.map((note: any) => {
              const formatted = format(
                new Date(note.updatedAt ?? note.createdAt),
                "MMM dd, yyyy p"
              );
              return (
                <div
                  className="p-3 cursor-pointer border-l-4 border-primary bg-blue-100 rounded-sm hover:bg-blue-200 transition-colors"
                  key={note.id}
                  onClick={() => {
                    console.log(note.id);
                    setNoteId(note.id);
                    setIsOpen(false);
                    setIsNotesOpen(true);
                  }}
                >
                  <div className="font-medium text-gray-800">{note.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{formatted}</div>
                </div>
              );
            })}
          </div>
        ) : (
          !loading && (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <img 
                src={noteemptystate} 
                alt="No notes" 
                className="mb-4 max-w-xs"
              />
              <h2 className="text-lg font-medium text-gray-700">
                Start writing Notes By clicking Notes
              </h2>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default NotesList;
