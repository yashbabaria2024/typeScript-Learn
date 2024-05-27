import React from "react";
import { useState } from "react";


interface InputBoxType {
  name: string,
  value?:string,
  id?: string,
  placeholder?:string
  label?:string
}


const InputBox = (prop: {textProps: InputBoxType}): React.JSX.Element =>{
  const [name,setName] = useState(prop.textProps.name)
  const [id, setId] = useState(prop.textProps.id)
  const [value, setValue] = useState(prop.textProps.value)
  const [placeHolder] = useState(prop.textProps.placeholder)
  const [label, setLabel] = useState(prop.textProps.label)
  // prop.label? setLabel(prop.label):label
  return(
    
    <div className="flex items-center gap-5">
      <label htmlFor="">{prop.textProps.label?label:"Enter Value :"}</label>
      <input type="text" name={name} id={id} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 w-min" value={value} placeholder={prop.textProps.placeholder?placeHolder:"Enter Value"}/>
    </div>
  )
}

export default InputBox