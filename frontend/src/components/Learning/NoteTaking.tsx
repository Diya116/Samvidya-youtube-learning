import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea"
import { useState,useEffect } from "react"
import { api } from "@/utils/axiosInstance";
function NoteTaking({lessonId}: {lessonId: string}) {
  const [note, setNote] = useState<{title: string; content: string}>({title: "", content: ""});
  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote({...note, content: e.target.value});
    //localStorage.setItem("note", JSON.stringify({...note, content: e.target.value}));
  };
  const saveNote =async () => {
   // localStorage.setItem("note", JSON.stringify(note));
    try{
    const response=await api.post("/note",{...note,lessonId:lessonId});
    console.log("Note saved successfully", response);
    if(response.status === 201){
      console.log("Note saved successfully");
      alert("Note saved successfully");
    }
    }
    catch(error){
      console.error("Error saving note:", error);
    }
  };
useEffect(()=>{
  // const savedNote = localStorage.getItem("note");
  // if (savedNote) {
  //   setNote(JSON.parse(savedNote));
  // }
  const getNotes=async()=>{
    try{
      const response = await api.get("/note/lesson/"+lessonId);
      console.log("Fetched notes:", response.data);
      if(response.status === 200){
        setNote(response.data);
      }
    }
    catch(error){
      console.error("Error fetching notes:", error);
    }
  }; 
getNotes();
}, [lessonId]);
  // useEffect(() => {
  //   getNotes();
  // }, []);
  return (
    <div>
      <div className="p-2 border-b flex items-center justify-between">
                          {/* <h2 className="font-semibold flex items-center gap-2">
                            <FileText className="h-4 w-4 text-secondary" />{" "}
                            Notes
                          </h2> */}
                          <input placeholder="enter title" className="border-none outline-none flex-1" value={note.title} onChange={(e)=>{setNote({...note, title: e.target.value})}}/>
                          {/* <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setIsNotesOpen(false);
                              searchParams.delete("tab");
                              setSearchParams(searchParams);
                            }}
                          >
                            <ChevronLeft />
                          </Button> */}
                          <Button onClick={saveNote}>Save</Button>
                        </div>
      <Textarea value={note.content} onChange={handleNoteChange} />
    </div>
  )
}

export default NoteTaking