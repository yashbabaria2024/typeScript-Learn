import React from "react";
import FormTitle from "./component/FormTitleComponent";
import AddComponent from "./component/AddComponent";
import QuestionFun from "./component/FormQuestion";
import CheckBoxComponent from "./component/CheckBoxComponent";
import checkBoxInput from "./Propsinput/CheckBoxInput";
import InputBox from "./component/InputBoxComponent";
import FormCheckBoxComponent from "./component/FormCheckBoxComponent";

function App() {
  return (
    <div className="container m-auto p-10" id="addComp">
      <div className="flex flex-col gap-5">
        <div className="bg-blue-900 p-4 rounded-b-lg"></div>
        <FormTitle />
      </div>
        <AddComponent/>
        <QuestionFun />
      {/* <CheckBoxComponent checkBoxProps={checkBoxInput.fruit.banana}/> */}
      <FormCheckBoxComponent />
      </div>
  );
}

export default App;
