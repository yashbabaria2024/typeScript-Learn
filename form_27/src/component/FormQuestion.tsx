import React from "react";
import { useState } from "react";

const QuestionFun = ()=>{
  const [value,setValue] = useState("")

  




  return(
    <div className="flex items-center gap-5">
    <input type="text" id={"id_" + value.trim().slice(0, 5)} value={value ? value : "Untitled Question"} name={"name" + value.trim().slice(0, 5)} onChange={(e) => setValue(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 w-min" />

      <select name="inputType" id="inputType" className="p-2 rounded-xl">
        <option value="checkbox" >CheckBox</option>
        <option value="dropdown">DropDown</option>
    </select>
    </div>
  )
}

export default QuestionFun