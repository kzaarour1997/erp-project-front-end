import React from "react";
import { CustomDialog } from "react-st-modal";
import AssignToModal from "./AssignToModal";

const AssignTo = (props) => {
  // console.log(props.assignTo)
  const setRender = props.render;
  console.log({setRender})
  return (
    <div
      className="col-md-1"
      style={{ marginTop: "15px", transform: "skewX(20deg)" }}
    >
      <button
        onClick={async () => {
          // console.log(props.teams)
          const result = await CustomDialog(
            <AssignToModal assignModal={props.assignTo} data = {props.teams} render = {setRender} />,
            {
              title: "Assign Employee To A Team",
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
