import { useParams } from 'react-router-dom'
import NoteTaking from '@/components/Learning/Note/NoteTaking'
import { api } from '@/utils/axiosInstance';
import { useEffect, useState } from 'react';
function Note() {
    const {id}=useParams();
const[note,setNote]=useState({
    title:"",
    content:"",
});
const [noteId,setNoteId]=useState<string|null>(null);
    useEffect(()=>{
       const fetchnote=async()=>{
         if(id)
        {
            const response=await api.get(`/note/${id}`);
            if(response.status==200)
            {
              setNote(response.data.note);
              setNoteId(response.data.note.id)
            }
        }
       }

       fetchnote();
    },[])
    // console.log("id",id)
  return (
    <div>
    <NoteTaking note={note} setNote={setNote} noteId={noteId} setNoteId={setNoteId} />
    </div>
  )
}

export default Note
//noteId, setNoteId, note, setNote