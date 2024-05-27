import React from "react";
import { useState } from "react";
import FormTitle from "./FormTitleComponent";
import { Form } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';

const AddComponent = ():JSX.Element => {
  const [data, setData] = useState<JSX.Element[]>([])

  const setDataFun = ()=>{
   setData([...data, <FormTitle />]) 
  }


  return (
    <div>
      <i className="fa fa-plus" title="Add Title" aria-hidden="true" onClick={setDataFun}></i>
      <div>
        {data}
      </div>
    </div>
  )
}

export default AddComponent