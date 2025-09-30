import { useParams } from 'react-router-dom'
import NoteTaking from '@/components/Learning/Note/NoteTaking'
import { api } from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';

function Note() {
    const { id } = useParams();
    const [note, setNote] = useState({
        title: "",
        content: "",
    });
    const [noteId, setNoteId] = useState<string | null>(null);

    useEffect(() => {
        const fetchNote = async () => {
            if (id) {
                try {
                    const response = await api.get(`/note/${id}`);
                    if (response.status === 200) {
                        setNote(response.data.note);
                        setNoteId(response.data.note.id);
                    }
                } catch (error) {
                    console.error("Error fetching note:", error);
                }
            }
        }

        fetchNote();
    }, [id]);

    return (
        <div className="h-screen"> {/* Full screen height for standalone mode */}
            <NoteTaking 
                note={note} 
                setNote={setNote} 
                noteId={noteId} 
                setNoteId={setNoteId}
                isStandalone={true} // Mark as standalone mode
                isFullScreen={true} // Always fullscreen in standalone
            />
        </div>
    )
}

export default Note;