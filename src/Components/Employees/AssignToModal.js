import { useDialog } from "react-st-modal";
import { useState, useEffect } from "react";
import Axios from "axios";
import React from "react";
import { bottom } from "@popperjs/core";

const AssignToModal = (props) => {
  // use this hook to control the dialog
  //   console.log(props)
  //   console.log(props.assignModal && props.assignModal.team.id);
  // console.log(props.assignModal && props.assignModal.team);
  // console.log(props.assignModal)
  // const [listTeams, setListTeams] = useState([]);
  // console.log(props.data);

  const {setRender} = props.render;
  // console.log(setRender)

  const dialog = useDialog();
  const [value, setValue] = useState();
  const [checked, setChecked] = useState("");

  const handleSubmit = (id) => {
    //   e.preventDefault()
    const data = new FormData();
    data.append("team_id", checked);
    try {
      Axios.post(
        `http://localhost:8000/api/assign/${props.assignModal.id}?_method=PUT`,
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      ).then((response) => {
        console.log(response.data);
        alert("Successfully Assigned A Employee To A Team!!")
        setRender(prev => !prev)
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{marginBottom: "28px"}}>
      <table style={{marginLeft:"18vw"}}>
      {props.data.map((val) => {
        return (
          <tr key={val.id}>
            <td>{val.name}</td>
            <td style={{position:"relative" , left:"2vw"}}><input
              type="radio"
              name="check"
              onChange={() => {
                setChecked(val.id);
              }}
            />
            </td>
          </tr>
        );
      })}
      </table>
      <button onClick={handleSubmit} style={{position:"relative" , left:"20vw"}}>Submit</button>
      <button
        onClick={() => {
          // Сlose the dialog and return the value
          dialog.close(value);
        }}
        className="View_close_btn"
        style={{
          position: "relative",
          left: "13.5vw",
          top:"3vw"
        }}
      >
        Close
      </button>
    </div>
  );
};

export default AssignToModal;
