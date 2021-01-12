import { useDialog } from "react-st-modal";
import { useState } from "react";
import Axios from "axios";

// The element to be shown in the modal window
function ModalUpdate(props) {
  // use this hook to control the dialog
  const dialog = useDialog();
  const [value, setValue] = useState();

  const [newIdentity, setNewIdentity] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");

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
        //setSuccessUpdate("Data has been updated");
      });
    } catch (err) {
      console.log(err);
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
      <label className="updateLabel">Identity</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter New Identity ..."
        onChange={(e) => {
          setNewIdentity(e.target.value);
          console.log(setNewIdentity(e.target.value));
        }}
      />
      <label className="updateLabel">Firstname</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter New Firstname ..."
        onChange={(e) => {
          setNewFirstName(e.target.value);
        }}
      />
      <label className="updateLabel">Lastname</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter New lastname ..."
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
      <label className="updateLabel">Phone</label>
      <input
        className="form-control"
        type="text"
        name="phone"
        id="phone"
        placeholder="Enter New Phone ..."
        onChange={(e) => {
          setNewPhone(e.target.value);
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
        className="Modal-Update-close-btn"
      >
        Close
      </button>
    </div>
  );
}

export default ModalUpdate;
