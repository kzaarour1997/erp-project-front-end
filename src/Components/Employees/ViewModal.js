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
      <p
        style={{
          color: "black",
          textAlign: "center",
          marginTop: "3vw",
          lineHeight: "1.2",
        }}
      >
        <span>
          <img
            className="user-image-info"
            src={`http://localhost:8000/storage/${props.employee.image}`}
            alt="error"
          />
        </span>
        <br />
        <span>
          <strong>Identity :</strong>
          <br />
          {props.employee.identity}
        </span>
        <br />
        <span>
          <strong>FirstName :</strong> <br />
          {props.employee.firstname}
        </span>
        <br />
        <span>
          <strong>LastName :</strong> <br />
          {props.employee.lastname}
        </span>
        <br />
        <span>
          <strong>Email :</strong> <br />
          {props.employee.email}
        </span>
        <br />
        <span>
          <strong>Phone Number :</strong> <br />
          {props.employee.phone}
        </span>
        <br />
        <span>
          <strong>Team Name :</strong>
          <br />
          {props.employee && props.employee.teams && props.employee.teams.name}
        </span>
        <br />
        <span>
          <strong>Role :</strong>
        </span>
        {/* {props.employee&&props.employee.projects&&props.employee.projects.roles.name} */}
        {props.employee &&
          props.employee.projects.map((val) => {
            return (
              <div>
                {val.roles.map((i) => {
                  return <p key={i}>{i.name}</p>;
                })}
              </div>
            );
          })}
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
