import { CustomDialog } from "react-st-modal";
import React from "react";
import ModalUpdate from "./ModalUpdate";

function UpdateEmployee(props) {
  return (
    <div
      className="col-md-1"
      style={{
        marginTop: "15px",
        transform: "skewX(20deg)",
        position: "relative",
        left: "-11px",
      }}
    >
      <button
        onClick={async () => {
          const result = await CustomDialog(
            <ModalUpdate updateinfo={props.updateEmployee} />,
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
