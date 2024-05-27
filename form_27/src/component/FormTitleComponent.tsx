import React from "react";
import { useState } from "react";

interface FormTitleInput{
  title?: string
  description?:string
}


const FormTitle = ():JSX.Element=>{
  const [title, setTitle] = useState("Untitled Form")
  const [description, setDescription] = useState("")
  return(
      <div className="flex flex-col gap-5 justify-start  ml-2 mt-5">
    <input type="text" value={title} name={"name_" + title} id={"id_" + title} className="text-3xl" onChange={(e)=>setTitle(e.target.value) }/>
      <input type="text" name={"name_" + description?.replaceAll(' ', '').slice(0, 5)} id={"id_" + description?.replaceAll(' ', '').slice(0, 5)} placeholder="Form Description" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
      </div>
   
  )
}


export default FormTitle;
