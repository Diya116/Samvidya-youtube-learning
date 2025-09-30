import { useEffect, useState } from "react";
import { api } from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, FileText, Trash } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
interface Note {
  id: string;
  title: string;
  courseId: string;
  createdAt: string;
  updatedAt?: string;
  course?: {
    id: string;
    title?: string;
    name?: string;
  };
}

interface GroupedNotes {
  [courseId: string]: {
    courseTitle: string;
    notes: Note[];
  };
}

function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]); // Fixed: proper state naming
  const [groupedNotes, setGroupedNotes] = useState<GroupedNotes>({});
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await api.get("/note");
        console.log(response.data.notes);
        setNotes(response.data.notes); // Fixed: proper setter function

        // Group notes by courseId
        const grouped = response.data.notes.reduce(
          (acc: GroupedNotes, note: Note) => {
            const courseId = note.courseId || "uncategorized";

            if (!acc[courseId]) {
              acc[courseId] = {
                courseTitle:
                  note.course?.title || note.course?.name || "Uncategorized",
                notes: [],
              };
            }

            acc[courseId].notes.push(note);
            return acc;
          },
          {}
        );

        setGroupedNotes(grouped);
      } catch (error) {
        console.error("Error fetching notes:", error);
        toast.error("Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const deleteNote = async (noteId: string) => {
    console.log("clicking delete");
    try {
      const response = await api.delete(`/note/${noteId}`);
      console.log(response);

      if (response.status === 200) {
        toast.success("Note deleted successfully");

        // Update local state by removing the deleted note
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        setNotes(updatedNotes);

        // Rebuild grouped notes without the deleted note
        const grouped = updatedNotes.reduce((acc: GroupedNotes, note: Note) => {
          const courseId = note.courseId || "uncategorized";

          if (!acc[courseId]) {
            acc[courseId] = {
              courseTitle:
                note.course?.title || note.course?.name || "Uncategorized",
              notes: [],
            };
          }

          acc[courseId].notes.push(note);
          return acc;
        }, {});

        setGroupedNotes(grouped);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  const toggleCourse = (courseId: string) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedCourses(newExpanded);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy 'at' h:mm a");
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full gap-3">
      <div className="flex justify-center">
        {/* <input 
          placeholder="search notes...." 
          className="border border-primary rounded-lg p-2 px-4 w-3xl outline-1 outline-primary ml-2"
        /> */}
      </div>

      <div className="flex-1 overflow-y-auto">
        {Object.keys(groupedNotes).length > 0 ? (
          <div className="space-y-2">
            {Object.entries(groupedNotes).map(([courseId, courseData]) => (
              <div
                key={courseId}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                {/* Course Header */}
                <div
                  className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer border-l-4 border-primary"
                  onClick={() => toggleCourse(courseId)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {expandedCourses.has(courseId) ? (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      )}
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {courseData.courseTitle}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {courseData.notes.length} note
                        {courseData.notes.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Course Notes */}
                {expandedCourses.has(courseId) && (
                  <div className="bg-white">
                    {courseData.notes.map((note) => (
                      <div
                        key={note.id}
                        className="p-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-colors"
                        onClick={() => navigate(`/note/${note.id}`)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-base font-medium text-gray-800 mb-1">
                              {note.title}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {note.updatedAt
                                ? `Updated: ${formatDate(note.updatedAt)}`
                                : `Created: ${formatDate(note.createdAt)}`}
                            </p>
                          </div>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button
                                className="p-1 rounded-full hover:bg-red-100 transition-colors"
                                title="Delete note"
                                onClick={(e)=>{e.stopPropagation()}}
                              >
                                <Trash className="w-4 h-4 text-red-600" />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the Note and. You won’t be able to undo
                                  this action.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={(e)=>{e.stopPropagation();}}>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNote(note.id);
                                  }}
                                >
                                  Yes, delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <FileText className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No notes available
            </h3>
            <p className="text-sm text-gray-500">
              Start creating notes while watching your lesson
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
