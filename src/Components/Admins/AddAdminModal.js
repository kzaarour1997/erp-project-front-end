import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";

const AddAdminModal = (props) => {
  // console.log(props);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { setRender } = props.render;
  // console.log(setRender)

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("firstname", firstName);
    data.append("lastname", lastName);
    data.append("email", email);
    data.append("image", image);
    data.append("username", userName);
    data.append("password", password);
    try {
      await Axios.post("http://localhost:8000/api/register", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        // console.log(response.data);
        localStorage.getItem("token");
        alert("Successfully Created A New Admin!!!!")
        setRender((prev) => !prev);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modal fade" id="myModal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content modal-content-admin">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
            <h4 className="modal-title">Add an Admin to the list</h4>
          </div>
          <form encType="multipart/form-data">
            <div className="modal-body">
              <label htmlFor="name" className="label-admin">
                First name:
              </label>
              <input
                value={firstName}
                className="form-control"
                id="name"
                type="text"
                placeholder="Enter firstname"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <label htmlFor="lastname" className="label-admin">
                Last name:
              </label>
              <input
                value={lastName}
                className="form-control"
                id="lastname"
                type="text"
                placeholder="Enter lastname"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <label htmlFor="email" className="label-admin">
                Email
              </label>
              <input
                value={email}
                className="form-control"
                id="email"
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="image" className="label-admin">
                Image
              </label>
              <input
                className="form-control"
                type="file"
                name="image"
                id="image"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  console.log(e.target.files[0]);
                }}
              />
              <label htmlFor="username" className="label-admin">
                Username:
              </label>
              <input
                value={userName}
                className="form-control"
                id="username"
                type="text"
                placeholder="Enter username"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <label htmlFor="password" className="label-admin">
                Password:
              </label>
              <input
                value={password}
                className="form-control"
                id="password"
                type="password"
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
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

export default AddAdminModal;
