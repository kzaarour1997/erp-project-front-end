import React from "react";
import { CustomDialog } from "react-st-modal";
import ViewModal from "./ViewModal";


const ViewTeam = (props) => {
  
  return (
    <div
      className="col-md-1"
      style={{ marginTop: "15px", transform: "skewX(20deg)" }}
    >
      <button
        onClick={async () => {
          const result = await CustomDialog(
            <ViewModal viewModal={props.viewTeam} />,
            {
              title: "View Team Info",
              showCloseIcon: true,
            }
          );
        }}
        className="view-btn"
        style={{
          position: "relative",
          left: "10px"
        }}
      >
        View
      </button>
    </div>
  );
};

export default ViewTeam;
