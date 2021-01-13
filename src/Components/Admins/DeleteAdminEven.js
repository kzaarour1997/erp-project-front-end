import React from "react";
import Axios from 'axios';
import {useState} from 'react';

import  './Admin.css';

const DeleteEmployee = (props) => {

    const [users , setUsers] = useState("");

    const deleteItem = async (id) => {
        try {
          await Axios.delete(`http://localhost:8000/api/users/${id} `, {
            headers: {
              Accept: "application/json",
              "content-type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }).then((data) => {
            if (data.status === 200) {
              console.log(data);
              // alert("Deleted!");
              const newData = users.filter((item) => item.id !== id);
              setUsers(newData);
            }
          });
        } catch (err) {
          console.log(err);
        }
      };
  return (
    <div className="col-md-1" style = {{marginTop: "15px" , marginLeft: "-16px"}}>
      <button
        className="Button Button_delete_Admin_Even Button_delete_Skew_Admin_Even"
        id="change"
        onClick={() => {
          deleteItem(props.deleteAdmin.id);
        }}
      >
       <span> Delete</span>
      </button>
    </div>
  );
};

export default DeleteEmployee;
