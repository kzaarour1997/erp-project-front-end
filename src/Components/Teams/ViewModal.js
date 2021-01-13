import { useDialog } from "react-st-modal";
import { useState } from "react";
import React from "react";

const ViewModal = (props) => {
  // use this hook to control the dialog
  console.log(props.viewModal && props.viewModal.employees);
  const dialog = useDialog();
  const [value, setValue] = useState();
  const [viewModal, setViewModal] = useState(props.viewModal.employees);

  return (
    <div>
      <strong
        style={{
          position: "relative",
          left: "42%",
          top: "1vw",
          fontSize: "30px",
        }}
      >
        {props.viewModal.name}
      </strong>
      {viewModal.map((val) => {
        return (
          <p
            style={{
              color: "black",
              textAlign: "center",
              marginTop: "3vw",
              lineHeight: "1.2",
            }}
            key={val.id}
          >
            <span>
              <img
                className="user-image-info"
                src={`http://localhost:8000/storage/${val.image}`}
                alt="error"
              />
              <br />
              {val.firstname}
            </span>
            <br />
          </p>
        );
      })}

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
