import React from "react";
import { CustomDialog } from "react-st-modal";
import ViewModal from "./ViewModal";

const ViewAdmin = (props) => {
  return (
    <div
      className="col-md-1"
      style={{ marginTop: "15px", transform: "skewX(20deg)"  }}
    >
      <button
        onClick={async () => {
          const result = await CustomDialog(
            <ViewModal admin={props.viewAdm} />,
            {
              title: "View Admin Info",
              showCloseIcon: true,
            }
          );
        }}
        className="view-btn"
      >
        View
      </button>
    </div>
  );
};

export default ViewAdmin;
