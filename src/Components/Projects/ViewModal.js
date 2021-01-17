import { useDialog } from "react-st-modal";
import { useState } from "react";

import React from "react";

const ViewModal = (props) => {
  // use this hook to control the dialog
  // console.log(props.employee&&props.employee.teams.name);

  const dialog = useDialog();
  const [value, setValue] = useState();

  console.log(props.projj && props.projj.team);

  return (
    <div>
      <h3>Description </h3>
      <p style={{ textAlign: "center" }}>{props.projj.description}</p>
      <h3>Assigned To</h3>
      <table style={{margin:"0 auto"}}>
        {props.projj &&
          props.projj.team.map((val) => {
            return <tr>{val.name}</tr>;
          })}
      </table>
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
