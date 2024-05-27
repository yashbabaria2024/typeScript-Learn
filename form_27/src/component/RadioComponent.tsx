import React from "react"
import { useState } from "react"

interface RadioComponentType {
  name : string,
  value: string,
  label: string,
  id?: string,
  className?: string
}

const RadioComponentFun = (prop: { radioProps:RadioComponentType }): JSX.Element =>{

const [name,setName] = useState(prop.radioProps.name)
const [id,setId] = useState(prop.radioProps.id)
const [value,setValue] = useState(prop.radioProps.value)
const [label,setLabel] = useState(prop.radioProps.label)
const [className,setClassName] = useState(prop.radioProps.className)
  return(
    <div className="flex items-center gap-2">
      <input type="Radio" name={name} id={id} value={value} />
      <label className={className} htmlFor={id}>{label}</label>
    </div>
  )
}

export default RadioComponentFun;