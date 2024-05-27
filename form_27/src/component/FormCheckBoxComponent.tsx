import React, { useState } from "react";


interface CheckBoxType {
  name: string,
  id: string,
  value:string,
  label:string
}


const FormCheckBoxComponent = () =>{

  const [name,setName] = useState("")
  
  

  const createCheckBox = () =>{
    <input type="text" name={"name_"+name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter"/>
  }

  return(
    <div className="flex gap-2">
      <input type="checkbox" name={name} id={"id_"+name} value={name}  />
      <label htmlFor={"id_"+name} className="text-l">{name}</label>
      <span onClick={createCheckBox}>click</span>
    </div>
  )
}

export default FormCheckBoxComponent;