import { api } from "@/utils/axiosInstance"
import { useEffect, useState } from "react"
function NotesList({courseId,setNoteId,setIsOpen,setIsNotesOpen}:{courseId:string|undefined,setNoteId:(noteId:string)=>void,setIsOpen:(val:boolean)=>void,setIsNotesOpen:(val:Boolean)=>void}) {
    const [note,notes]=useState([]);
    useEffect(()=>{
        const fetchNotes=async()=>{
          if(courseId)
          {
            console.log({courseId})
            const response=await api.get(`/note/course/${courseId}`);
            console.log(response.data.notes);
           // console.log(response.data.notes[0].title);
            notes(response.data.notes);
          }
        }
        fetchNotes();
    },[])
  return (
    <div className="pt-2">
      {/* <div className="flex  justify-center">
        <input placeholder="search notes...." className="border border-primary rounded-sm p-2 px-4  outline-primary ml-2"/>
      </div> */}
      <div className="overflow-y-scroll max-h-135 ">
      { 
      note.length>0?(note.map((note:any) => (
        <div className=" p-2 cursor-pointer border-l-4 border-primary m-2 bg-blue-100 rounded-sm" key={note.id} onClick={()=>{ console.log(note.id);setNoteId(note.id);setIsOpen(false);setIsNotesOpen(true)}}>
         <div>{note.title}</div>
         {note.updatedAt?<div>{note.updatedAt}</div>:<div>{note.createdAt}</div>}
          </div>
      ))):(
        <div>No notes available</div>
      )}
      </div>
    </div>
  )
}

export default NotesList