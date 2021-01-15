import { useDialog } from "react-st-modal";
import { useState, useEffect } from "react";
import Axios from "axios";
import React from "react";

const AssignToModal = (props) => {
  // use this hook to control the dialog
  //   console.log(props)
  //   console.log(props.assignModal && props.assignModal.teams.id);
  const [listTeams, setListTeams] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/team", {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      setListTeams(response.data);
      // console.log(response.data[0].created_at);
    });
  }, []);

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
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {listTeams.map((val) => {
        return (
          <div key={val.id}>
            {val.name}{" "}
            <input
              type="radio"
              name="check"
              onChange={() => {
                setChecked(val.id);
              }}
            />
          </div>
        );
      })}
      <button onClick={handleSubmit}>Submit</button>
      <button
        onClick={() => {
          // Сlose the dialog and return the value
          dialog.close(value);
        }}
        className="View_close_btn"
        style={{
          position: "relative",
          left: "14vw",
          top: "30vw",
        }}
      >
        Close
      </button>
    </div>
  );
};

export default AssignToModal;
