import { useDialog } from "react-st-modal";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

// The element to be shown in the modal window
function ModalUpdate(props) {
  const { setRender } = props.rendering;
  console.log({ setRender });

  // use this hook to control the dialog
  const dialog = useDialog();
  const [value, setValue] = useState();

  const [newfirstName, setNewfirstName] = useState(props.updateinfo.firstname);
  const [newLastName, setNewLastName] = useState(props.updateinfo.lastname);
  const [newEmail, setNewEmail] = useState(props.updateinfo.email);
  const [newImage, setNewImage] = useState(null);
  const [lastnameErr, setLastnameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [firstnameErr, setFirstnameErr] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [infoErr, setInfoErr] = useState("");

  // console.log(props.updateinfo.image);

  const updateInfo = async (id) => {
    const data = new FormData();
    data.append("firstname", newfirstName);
    data.append("lastname", newLastName);
    data.append("email", newEmail);
    data.append("image", newImage);

    try {
      await Axios.post(
        `http://localhost:8000/api/users/${props.updateinfo.id}?_method=PUT `,
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      ).then((response) => {
        console.log(response);
        alert("Successfully Updated!!");
        setRender((prev) => !prev);
      });
    } catch (error) {
      if (
        error.response.data.error.firstname &&
        error.response.data.error.lastname &&
        error.response.data.error.email &&
        error.response.data.error.image
      ) {
        setFirstnameErr(error.response.data.error.firstname);
        setLastnameErr(error.response.data.error.lastname);
        setEmailErr(error.response.data.error.email);
        setImageErr(error.response.data.error.image);
      } else if (
        error.response.data.error.firstname ||
        error.response.data.error.lastname ||
        error.response.data.error.email ||
        error.response.data.error.image
      ) {
        setInfoErr("Your information are not Valid!");
      } else if (!error.response.data.error.firstname) {
        setFirstnameErr("");
      } else if (!error.response.data.error.lastname) {
        setLastnameErr("");
      } else if (!error.response.data.error.email) {
        setEmailErr("");
      } else if (!error.response.data.error.image) {
        setImageErr("");
      } else if (error.response.data.error.firstname) {
        setFirstnameErr(error.response.data.error.firstname);
      } else if (error.response.data.error.lastname) {
        setLastnameErr(error.response.data.error.lastname);
      } else if (error.response.data.error.email) {
        setEmailErr(error.response.data.error.email);
      } else if (error.response.data.error.image) {
        setImageErr(error.response.data.error.image);
      }
    }

    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
  };

  return (
    <div
      className="col-md-12"
      style={{
        position: "relative",
        left: "8.4vw",
        marginTop: "15px",
        top: "1vw",
      }}
    >
      {infoErr ? <span class="error_msg">{infoErr}</span> : ""} <br />
      <label className="updateLabel">FirstName</label>
      {firstnameErr ? <span class="error_msg">{firstnameErr}</span> : ""}
      <input
        type="text"
        className="form-control"
        // placeholder="Enter New FirstName ..."
        onChange={(e) => {
          setNewfirstName(e.target.value);
        }}
        value={newfirstName}
      />
      <label className="updateLabel">LastName</label>
      {lastnameErr ? <span class="error_msg">{lastnameErr}</span> : ""}
      <input
        type="text"
        className="form-control"
        // placeholder="Enter New LastName ..."
        onChange={(e) => {
          setNewLastName(e.target.value);
        }}
        value={newLastName}
      />
      <label className="updateLabel">Email</label>
      {emailErr ? <span class="error_msg">{emailErr}</span> : ""}
      <input
        type="text"
        className="form-control"
        // placeholder="Enter New Email ..."
        onChange={(e) => {
          setNewEmail(e.target.value);
        }}
        value={newEmail}
      />
      <label className="updateLabel">Image</label>
      {imageErr ? <span class="error_msg">{imageErr}</span> : ""}
      <input
        className="form-control"
        type="file"
        name="image"
        id="image"
        placeholder="Enter New Address ..."
        onChange={(e) => {
          setNewImage(e.target.files[0]);
          console.log(e.target.files[0]);
        }}
      />
      <button
        id="change1"
        className="Modal-Update-btn"
        onClick={() => {
          updateInfo(props.updateinfo);
        }}
      >
        Update
      </button>
      <button
        onClick={() => {
          // Сlose the dialog and return the value
          dialog.close(value);
        }}
        className="Modal-Update-close-btn-Admin"
      >
        Close
      </button>
    </div>
  );
}

export default ModalUpdate;
