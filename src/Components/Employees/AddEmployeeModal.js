import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";


const AddEmployeeModal = (props) => {
  const { setRender } = props.render;
  console.log({ setRender });
  // console.log(props);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identity, setIdentity] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [employees, setEmployees] = useState([]);
  const [lastnameErr, setLastnameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [firstnameErr, setFirstnameErr] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  const [identityErr, setIdentityErr] = useState("");
  const [infoErr, setInfoErr] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("identity", identity);
    data.append("firstname", firstName);
    data.append("lastname", lastName);
    data.append("email", email);
    data.append("image", image);
    data.append("phone", phone);

    try {
      await Axios.post("http://localhost:8000/api/employee", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        setEmployees(response.data);
        alert("Successfully Created A New Employee!!!!");
        localStorage.getItem("token");
        setRender((prev) => !prev);
      });
    } catch (error) {
      if (
        error.response.data.error.firstname &&
        error.response.data.error.lastname &&
        error.response.data.error.email &&
        error.response.data.error.phone &&
        error.response.data.error.identity &&
        error.response.data.error.image
      ) {
        setFirstnameErr(error.response.data.error.firstname);
        setLastnameErr(error.response.data.error.lastname);
        setEmailErr(error.response.data.error.email);
        setImageErr(error.response.data.error.image);
        setPhoneErr(error.response.data.error.phone);
        setIdentityErr(error.response.data.error.identity);
      } else if (
        error.response.data.error.firstname ||
        error.response.data.error.lastname ||
        error.response.data.error.email ||
        error.response.data.error.phone ||
        error.response.data.error.identity ||
        error.response.data.error.image
      ) {
        setInfoErr("Your information are not Valid!");
      } else if (!error.response.data.error.firstname) {
        setFirstnameErr("");
      } else if (!error.response.data.error.lastname) {
        setLastnameErr("");
      } else if (!error.response.data.error.email) {
        setEmailErr("");
      } else if (!error.response.data.error.phone) {
        setPhoneErr("");
      } else if (!error.response.data.error.identity) {
        setIdentityErr("");
      } else if (!error.response.data.error.image) {
        setImageErr("");
      } else if (error.response.data.error.firstname) {
        setFirstnameErr(error.response.data.error.firstname);
      } else if (error.response.data.error.lastname) {
        setLastnameErr(error.response.data.error.lastname);
      } else if (error.response.data.error.email) {
        setEmailErr(error.response.data.error.email);
      } else if (error.response.data.error.phone) {
        setPhoneErr(error.response.data.error.phone);
      } else if (error.response.data.error.identity) {
        setIdentityErr(error.response.data.error.identity);
      } else if (error.response.data.error.image) {
        setImageErr(error.response.data.error.image);
      }
    }
  };

  return (
    <div className="modal fade" id="myModal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content" style={{height:"46vw"}}>
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
            <h4 className="modal-title">Add Employee to the list</h4>
          </div>
          <form encType="multipart/form-data">
            <div className="modal-body">
              {infoErr ? <span class="error_msg">{infoErr}</span> : ""}
              <br />
              <label htmlFor="identity" className="label">
                Identity
              </label>
              {identityErr ? <span class="error_msg">{identityErr}</span> : ""}
              <input
                type="text"
                value={identity}
                className="form-control"
                id="identity"
                placeholder="Enter your personal code ...."
                onChange={(e) => {
                  setIdentity(e.target.value);
                }}
              />
              <label htmlFor="name" className="label">
                First name:
              </label>
              {firstnameErr ? (
                <span class="error_msg">{firstnameErr}</span>
              ) : (
                ""
              )}
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
              <label htmlFor="lastname" className="label">
                Last name:
              </label>
              {lastnameErr ? <span class="error_msg">{lastnameErr}</span> : ""}
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
              <label htmlFor="email" className="label">
                Email
              </label>
              {emailErr ? <span class="error_msg">{emailErr}</span> : ""}
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
              <label htmlFor="image" className="label">
                Image
              </label>
              {imageErr ? <span class="error_msg">{imageErr}</span> : ""}
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
              <label htmlFor="phone" className="label">
                Phone Number
              </label>
              {phoneErr ? <span class="error_msg">{phoneErr}</span> : ""}
              <input
                type="text"
                className="form-control"
                name="phone"
                value={phone}
                placeholder="Enter Phone Number..."
                id="phone"
                onChange={(e) => {
                  setPhone(e.target.value);
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

export default AddEmployeeModal;
