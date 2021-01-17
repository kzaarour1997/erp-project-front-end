import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

import "./Teams.css";

const AddTeam = (props) => {
  // console.log(props);
  const [teamName, setTeamName] = useState("");

  const { setRender } = props.render;
  console.log(setRender);


  const handleAdd = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", teamName);

    try {
      await Axios.post("http://localhost:8000/api/team", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        console.log(response.data);
        // console.log(employees);
        localStorage.getItem("token");
        alert("Successfully Created A New Team!!!!");
        setRender((prev) => !prev);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal fade" id="myModal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content modal-content-team">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
            <h4 className="modal-title">Add Team to the list</h4>
          </div>
          <form encType="multipart/form-data">
            <div className="modal-body">
              <label htmlFor="team" className="label">
                Name
              </label>
              <input
                type="text"
                value={teamName}
                className="form-control"
                id="team"
                placeholder="Enter Team Name ...."
                onChange={(e) => {
                  setTeamName(e.target.value);
                }}
              />
              <button
                id="add-button"
                className="btn btn-lg btn-block"
                onClick={handleAdd}
              >
                Submit
              </button>
            </div>
          </form>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeam;
