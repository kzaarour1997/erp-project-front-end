import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";


const AddEmployeeModal = (props) => {
  // console.log(props);  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [identity, setIdentity] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [employees, setEmployees] = useState([]);


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
        setEmployees([...employees, {
          identity: identity,
          firstname: firstName,
          lastname: lastName,
          email: email,
          image: image,
          phone: phone,
        }]);
        console.log(response.data);
        console.log(employees);
        localStorage.getItem("token");
      });
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="modal fade" id="myModal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
            <h4 className="modal-title">Add Employee to the list</h4>
          </div>
          <form encType="multipart/form-data">
            <div className="modal-body">
              <label htmlFor="identity" className="label">
                Identity
              </label>
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
