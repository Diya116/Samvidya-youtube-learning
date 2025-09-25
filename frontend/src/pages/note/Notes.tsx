import { useEffect,useState } from 'react';
import { api } from '@/utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
function Notes() {
    const navigate=useNavigate();
    const [note,notes]=useState([]);
    useEffect(()=>{
        const fetchNotes=async()=>{
            const response=await api.get('/note');
            console.log(response.data.notes);
           // console.log(response.data.notes[0].title);
            notes(response.data.notes);
        }
        fetchNotes();
    },[])
  return (
     <div className='flex flex-col w-full h-full gap-3' >
        {/* <NavbarNew/> */}
        
      <div className='flex justify-center'>
        {/* <input placeholder="search notes...." className="border border-primary rounded-lg p-2 px-4 w-3xl outline-1 outline-primary ml-2"/> */}
      </div>
      <div className="flex-1 overflow-y-auto ">
      { 
      note.length>0?(note.map((note:any) => (
        <div className=" p-2 cursor-pointer border-l-4 border-primary m-2 bg-blue-100 rounded-sm" key={note.id}
         onClick={()=>{navigate(`/note/${note.id}`)}}
         >
         <div className='text-lg font-semibold'>{note.title}</div>
         {note.updatedAt?<div>{note.updatedAt}</div>:<div>{note.createdAt}</div>}
          </div>
      ))):(
        <div>No notes available</div>
      )}
      </div>
      
    </div>

  )
}

export default Notes