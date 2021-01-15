import { useDialog } from "react-st-modal";
import { useState, useEffect } from "react";
import Axios from "axios";
import React from "react";

const AssignToModal = (props) => {
  // use this hook to control the dialog

  console.log(props.assignProject);
  console.log(props.assignEmployee);

  // console.log(props.empProj);
  const dialog = useDialog();
  const [value, setValue] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("project_id");
    data.append("employee_id");

    try {
      await Axios.post("http://localhost:8000/api/EmployeeProjectRole", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        console.log(response.data);
        localStorage.getItem("token");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [check, setCheck] = useState("");

  return (
    <div>
      {props.assignEmployee.map((val) => {
        return (
          <div key={val.id}>
            {val.firstname}{" "}
            <input
              type="checkbox"
              onChange={(e) => {
                setCheck(e.target.value);
              }}
            />
          </div>
        );
      })}
      <button onClick={handleSubmit}>Submit</button>
      {props.assignProject.map((val) => {
        return (
          <div key={val.id}>
            {"chougfaaaaaaaa"} {val.id}
          </div>
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

export default AssignToModal;
