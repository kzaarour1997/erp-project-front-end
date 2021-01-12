import { useDialog } from "react-st-modal";
import { useState } from "react";

import React from "react";

const ViewModal = (props) => {
  // use this hook to control the dialog
  const dialog = useDialog();
  const [value, setValue] = useState();
  return (
    <div>
      <p style={{ color: "black", textAlign: "center" , marginTop:"3vw" , lineHeight:"1.2" }}>
        <span>
          <img
            className="user-image-info"
            src={`http://localhost:8000/storage/${props.admin.image}`}
            alt="error"
          />
        </span>
        <br />
        <span>
          <strong>FirstName :</strong>
          <br />
          {props.admin.firstname}
        </span>
        <br />
        <span>
          <strong>LastName :</strong> <br />
          {props.admin.lastname}
        </span>
        <br />
        <span>
          <strong>Email :</strong> <br />
          {props.admin.email}
        </span>
        <br />
        <span>
          <strong>UserName :</strong> <br />
          {props.admin.username}
        </span>
      </p>
      <button
        onClick={() => {
          // Сlose the dialog and return the value
          dialog.close(value);
        }}
        className="View_close_btn"
      >
        Close
      </button>
    </div>
  );
};

export default ViewModal;
