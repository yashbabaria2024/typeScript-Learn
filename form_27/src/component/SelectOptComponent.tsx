import React from "react";
import { useState } from "react";


interface SelectComponetType {
  selectName:string,
  selectId:string,
  optValue:string,
  optLabel:string
}


const SelectComponet = (prop:SelectComponetType) =>{
  const [selectName, setSelectName] = useState(prop.selectName)
  const [selectId, setSelectId] = useState(prop.selectId)
  const [optValue, setOptValue] = useState(prop.optValue)
  const [optLabel, setOptLabel] = useState(prop.optLabel)
  return(
    <div>
      <select name={selectName} id={selectId} className="pt-2xl">
        <option value="" selected>Select Option</option>
        <option value={optValue}>{optLabel}</option>
      </select>
    </div>
  )
}

export default SelectComponet