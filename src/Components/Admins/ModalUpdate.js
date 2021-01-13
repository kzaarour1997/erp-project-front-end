import {useDialog } from "react-st-modal";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

// The element to be shown in the modal window
function ModalUpdate(props) {
  // use this hook to control the dialog
  const dialog = useDialog();
  const [value, setValue] = useState();

  const [newfirstName, setNewfirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newImage, setNewImage] = useState("");


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
        });
      } catch (err) {
        console.log(err);
      }
    
    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
  };

  return (
    <div
      className="col-md-12"
      style = {{
        position: "relative",
        left: "8.4vw",
        marginTop:"15px",
        top : "1vw"
    }}
    >
      <label className="updateLabel">FirstName</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter New FirstName ..."
        onChange={(e) => {
          setNewfirstName(e.target.value);
        }}
      />
      <label className="updateLabel">LastName</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter New LastName ..."
        onChange={(e) => {
          setNewLastName(e.target.value);
        }}
      />
      <label className="updateLabel">Email</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter New Email ..."
        onChange={(e) => {
          setNewEmail(e.target.value);
        }}
      />
      <label className="updateLabel">Image</label>
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






