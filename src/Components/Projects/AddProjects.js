import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

const AddProjects = (props) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const [projErr, setProjErr] = useState("");
  const [descErr, setDescErr] = useState("");
  const [infoErr, setInfoErr] = useState("");

  const { setRender } = props.render;
  // console.log(setRender)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        alert("Successfully Created A New Project!!!!");
        setRender((prev) => !prev);
      });
    } catch (error) {
      // console.log(error);
      if (error.response.data.error.name && error.response.data.error.name) {
        setProjErr(error.response.data.error.name);
        setDescErr(error.response.data.error.description);
      } else if (
        error.response.data.error.name ||
        error.response.data.error.name
      ) {
        setInfoErr("Information invalid");
      } else if (!error.response.data.error.name) {
        setProjErr("");
      } else if (error.response.data.error.name) {
        setDescErr(error.response.data.error.name);
      } else if (!error.response.data.error.description) {
        setDescErr("");
      } else if (error.response.data.error.description) {
        setDescErr(error.response.data.error.description);
      }
    }
  };

  return (
    <div className="modal fade" id="myModal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div
          className="modal-content modal-content-project "
          style={{ height: "47vw" }}
        >
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
            <h4 className="modal-title">Add Project to the list</h4>
          </div>
          <form encType="multipart/form-data">
            <div className="modal-body" style={{ lineHeight: "3" }}>
              <form
                style={{
                  marginBottom: "10px",
                  width: "50vw",
                  marginLeft: "50px",
                }}
              ></form>
              {infoErr ? <span class="error_msg">{infoErr}</span> : ""}
              <br />
              <label htmlFor="name" className="label-admin">
                Project Name:
              </label>
              {projErr ? <span class="error_msg">{projErr}</span> : ""}
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
              {descErr ? <span class="error_msg">{descErr}</span> : ""}
              <br />
              <textarea
                id="textarea"
                name="textarea"
                rows="4"
                cols="50"
                style={{ width: "37.5vw" }}
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
          <div
            className="modal-footer modal-footer-project"
            style={{
              position: "relative",
              top: "7.9vw",
            }}
          >
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
