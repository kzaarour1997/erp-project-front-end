import { useDialog } from "react-st-modal";
import { useState } from "react";
import Axios from "axios";

// The element to be shown in the modal window
function ModalUpdate(props) {
  // use this hook to control the dialog
  const dialog = useDialog();
  const [value, setValue] = useState();

  const { setRender } = props.render;
  // console.log({ setRender });

  const [newIdentity, setNewIdentity] = useState(props.updateinfo.identity);
  const [newFirstName, setNewFirstName] = useState(props.updateinfo.firstname);
  const [newLastName, setNewLastName] = useState(props.updateinfo.lastname);
  const [newImage, setNewImage] = useState(null);
  const [newPhone, setNewPhone] = useState(props.updateinfo.phone);
  const [newEmail, setNewEmail] = useState(props.updateinfo.email);
  const [infoErr, setInfoErr] = useState("");
  const [lastnameErr, setLastnameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [firstnameErr, setFirstnameErr] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [phoneErr, setPhoneErr] = useState("");

  const updateInfo = async (id) => {
    const data = new FormData();
    data.append("firstname", newFirstName);
    data.append("lastname", newLastName);
    data.append("email", newEmail);
    data.append("image", newImage);
    data.append("phone", newPhone);
    data.append("identity", newIdentity);

    try {
      await Axios.post(
        `http://localhost:8000/api/employee/${props.updateinfo.id}?_method=PUT `,
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
        error.response.data.error.phone &&
        error.response.data.error.image
      ) {
        setFirstnameErr(error.response.data.error.firstname);
        setLastnameErr(error.response.data.error.lastname);
        setEmailErr(error.response.data.error.email);
        setImageErr(error.response.data.error.image);
        setPhoneErr(error.response.data.error.phone);
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
      } else if (error.response.data.error.image) {
        setImageErr(error.response.data.error.image);
      }
    }
  };

  return (
    <div
      className="col-md-12"
      style={{
        position: "relative",
        left: "8.4vw",
        marginTop: "15px",
      }}
    >
      {infoErr ? <span class="error_msg">{infoErr}</span> : ""}
      <br />
      <label className="updateLabel">Identity</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter New Identity ..."
        onChange={(e) => {
          setNewIdentity(e.target.value);
          console.log(setNewIdentity(e.target.value));
        }}
        value={newIdentity}
      />
      {firstnameErr ? <span class="error_msg">{firstnameErr}</span> : ""}
      <label className="updateLabel">Firstname</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter New Firstname ..."
        onChange={(e) => {
          setNewFirstName(e.target.value);
        }}
        value={newFirstName}
      />
      <label className="updateLabel">Lastname</label>
      {lastnameErr ? <span class="error_msg">{lastnameErr}</span> : ""}
      <input
        type="text"
        className="form-control"
        placeholder="Enter New lastname ..."
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
        placeholder="Enter New Email ..."
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
      <label className="updateLabel">Phone</label>
      {phoneErr ? <span class="error_msg">{phoneErr}</span> : ""}
      <input
        className="form-control"
        type="text"
        name="phone"
        id="phone"
        placeholder="Enter New Phone ..."
        onChange={(e) => {
          setNewPhone(e.target.value);
        }}
        value={newPhone}
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
        className="Modal-Update-close-btn"
      >
        Close
      </button>
    </div>
  );
}

export default ModalUpdate;
