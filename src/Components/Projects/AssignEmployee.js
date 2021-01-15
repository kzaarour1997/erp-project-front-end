import React from "react";
import { CustomDialog } from "react-st-modal";
import AssignToModal from "./AssignToModal";

const AssignEmployee = (props) => {
  // console.log(props.employee);
  // console.log(props.project);
  // console.log(props.employeeProjects)
  return (
    <div
      className="col-md-1"
      style={{ marginTop: "15px", transform: "skewX(20deg)" }}
    >
      <button
        onClick={async () => {
          const result = await CustomDialog(
            <AssignToModal
              assignModal={props.assignTo}
              assignEmployee={props.employee}
              assignProject={props.project}
              empProj = {props.employeeProjects}
            />,
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

export default AssignEmployee;
