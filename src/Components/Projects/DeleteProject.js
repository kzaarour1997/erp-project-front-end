import React from "react";
import Axios from "axios";
import { useState } from "react";

const DeleteProject = (props) => {
  const { setRender } = props.rendering;
  //   console.log({setRender})

  const deleteItem = async (id) => {
    try {
      await Axios.delete(
        `http://localhost:8000/api/project/${props.project.id} `,
        {
          headers: {
            Accept: "application/json",
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      ).then((data) => {
        if (data.status === 200) {
          console.log(data);
          alert("Successfully Deleted!");
          setRender((prev) => !prev);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="col-md-1"
      style={{ marginTop: "15px", marginLeft: "-13px" }}
    >
      <button
        className="Button Button_delete  Button_delete_Admin Button_delete_Skew_Admin"
        id="change"
        onClick={() => {
          deleteItem(props.project.id);
        }}
      >
        <span> Delete</span>
      </button>
    </div>
  );
};

export default DeleteProject;
