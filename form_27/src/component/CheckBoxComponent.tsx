import React, { useState } from "react";


interface CheckBoxType {
  name: string,
  id: string,
  value:string,
  label:string
}


const CheckBoxComponent = (prop: { checkBoxProps:CheckBoxType}) =>{

  const [name,setName] = useState(prop.checkBoxProps.name)
  const [id,setId] = useState(prop.checkBoxProps.id)
  const [value,setValue] = useState(prop.checkBoxProps.value)
  const [label,setLabel] = useState(prop.checkBoxProps.label)
  

  return(
    <div className="flex gap-2">
      <input type="checkbox" name={name} id={id} value={value}  />
      <label htmlFor={id} className="text-l">{label}</label>
    </div>
  )
}

export default CheckBoxComponent;