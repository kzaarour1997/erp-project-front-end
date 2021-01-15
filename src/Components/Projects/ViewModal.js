import { useDialog } from "react-st-modal";
import { useState } from "react";

import React from "react";

const ViewModal = (props) => {
  // use this hook to control the dialog
  // console.log(props.employee&&props.employee.teams.name);

  const dialog = useDialog();
  const [value, setValue] = useState();
  return (
    <div>
      <p>
       skhsjsk
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
