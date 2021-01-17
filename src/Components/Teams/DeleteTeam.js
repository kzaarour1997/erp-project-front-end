import React from "react";
import Axios from "axios";
import { useState } from "react";

const DeleteTeam = (props) => {
  const [team, setteam] = useState("");
  const [deleteList, setDeleteList] = useState(props.deleteTeam.employees);
  const [deleteItemErr, setDeleteItemErr] = useState("");

  const {setRender} = props.render ;
  // console.log({setRender})

  const deleteItem = async (id) => {
    try {
      await Axios.delete(`http://localhost:8000/api/team/${id} `, {
        headers: {
          Accept: "application/json",
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((data) => {
        if (data.status === 200) {
          console.log(data);
          alert('Successfully Deleted!!')
          setRender(prev => !prev);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="col-md-1"
      style={{ marginTop: "15px", marginLeft: "-16px" }}
    >
      {deleteList.length > 0 ? (
        <button
          className="Button Button_delete  Button_delete_Admin Button_delete_Skew_Admin"
          id="change"
          disabled={true}
          onClick={() => {
            setDeleteItemErr(
              "You Can Not Delete A Team That Contain A Project"
            );
          }}
        >
          <span> Delete</span>
        </button>
      ) : (
        <button
          className="Button Button_delete  Button_delete_Admin Button_delete_Skew_Admin"
          id="change"
          onClick={() => {
            deleteItem(props.deleteTeam.id);
          }}
        >
          <span>Delete</span>
        </button>
      )}
    </div>
  );
};

export default DeleteTeam;
