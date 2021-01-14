import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

import "./Projects.css";
import { bottom } from "@popperjs/core";

const AddProjects = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [listProject, setListProject] = useState([]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("project_name", projectName);
    data.append("description", description);

    try {
      await Axios.post("http://localhost:8000/api/project", data, {
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

  return (
    <div className="modal fade" id="myModal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content modal-content-project ">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
            <h4 className="modal-title">Add Project to the list</h4>
          </div>
          <form encType="multipart/form-data">
            <div className="modal-body" style={{ lineHeight: "3" }}>
              <label htmlFor="name" className="label-admin">
                Project Name:
              </label>
              <input
                value={projectName}
                className="form-control"
                id="name"
                type="text"
                placeholder="Enter firstname"
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
              />
              <label htmlFor="lastname" className="label-admin">
                Description:
              </label>
              <br />
              <textarea
                id="textarea"
                name="textarea"
                rows="4"
                cols="50"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
              <button
                id="add-button"
                className="btn btn-lg btn-block"
                style={{
                  position: "relative",
                  left: "-25vw",
                  top: "4vw",
                  marginBottom: "2vw",
                }}
                onClick={handleAdd}
              >
                Submit
              </button>
            </div>
          </form>
          <div className="modal-footer modal-footer-project">
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

export default AddProjects;
