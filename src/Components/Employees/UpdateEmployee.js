import { CustomDialog } from "react-st-modal";
import React from "react";
import ModalUpdate from "./ModalUpdate";

function UpdateEmployee(props) {
  const setRender = props.render;
  // console.log({setRender})
  return (
    <div
      className="col-md-1"
      style={{
        marginTop: "15px",
        transform: "skewX(20deg)",
        position: "relative",
        left: "3px"
      }}
    >
      <button
        onClick={async () => {
          const result = await CustomDialog(
            <ModalUpdate updateinfo={props.updateEmployee} render ={setRender}/>,
            {
              title: "Update Employees Information",
              showCloseIcon: true,
            }
          );
          
        }}
        className="update-btn"
      >
        Update
      </button>
    </div>
  );
}

export default UpdateEmployee;
