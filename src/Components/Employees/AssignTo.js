import React from "react";
import { CustomDialog } from "react-st-modal";
import AssignToModal from "./AssignToModal";

const AssignTo = (props) => {
  // console.log(props.assignTo)
  return (
    <div
      className="col-md-1"
      style={{ marginTop: "15px", transform: "skewX(20deg)" }}
    >
      <button
        onClick={async () => {
          const result = await CustomDialog(
            <AssignToModal assignModal={props.assignTo} />,
            {
              title: "Assign Employee To A Project",
              showCloseIcon: true,
            }
          );
        }}
        className="view-btn"
        style={{
          position: "relative",
          right: "5px",
        }}
      >
        AssignTo
      </button>
    </div>
  );
};

export default AssignTo;
