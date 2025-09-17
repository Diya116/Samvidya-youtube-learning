import { Notebook } from "lucide-react"
function ContinueReacding() {
    const continueNotes=[
        {
            name:"Note 1",
            timestamp:"10:00 AM",
        },
        {
            name:"Note 2",
            timestamp:"11:00 AM",
        },
        {
            name:"Note 3",
            timestamp:"12:00 PM",
        }
    ]
  return (
    <div className="display flex gap-7">
       {
        continueNotes.map((note:any)=>(
            <div className=" w-35 h-30 border rounded-md cursor-pointer"> 
            <div className="border-b-2 h-14 p-3 "> 
                <Notebook height={30} width={30} className="text-gray-500"/>
            </div>
            <div className=" text-black p-2">
                 <div>{note.name}</div>
              <div>{note.timestamp}</div>
            </div>
            </div>
        ))
       }
    </div>
  )
}

export default ContinueReacding