import React from "react";
import { CustomDialog } from "react-st-modal";
import ViewModal from "./ViewModal";

const ViewProject = (props) => {
  // console.log(props.project);
  return (
    <div
      className="col-md-1"
      style={{ marginTop: "15px", transform: "skewX(20deg)" }}
    >
      <button
        onClick={async () => {
          const result = await CustomDialog(<ViewModal projj = {props.project}/>, {
            title: "View Project Info",
            showCloseIcon: true,
          });
        }}
        className="view-btn"
        style={{
          position: "relative",
          left: "12px",
          backgroundColor: "#FFFFCC",
        }}
      >
        View
      </button>
    </div>
  );
};

export default ViewProject;
