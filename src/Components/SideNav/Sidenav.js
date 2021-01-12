import React, { useState } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import zxcvbn from "zxcvbn";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import './SideNav.css';

const Sidenav = () => {
  const [isPassShown, setIsPassShown] = useState(false);

  const toggleVisibility = () => {
    setIsPassShown(!isPassShown);
  };

  const history = useHistory();
  // const [loggedOut, setLoggedOut] = useState(false);
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    history.push("/");
  };

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    setNewPass("");
    setConfirmPass("");
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (newPass === confirmPass) {
      const data = new FormData();
      data.append("password", newPass);
      try {
        Axios.post(
          `http://localhost:8000/api/change/${localStorage.getItem(
            "id"
          )}?_method=PUT`,
          data,
          {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        ).then((response) => {
          console.log(response.data);
          localStorage.getItem("token");
          handleReset(e);
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      setPassError("Passwords didn't match");
    }
  };
  const testResult = zxcvbn(newPass);

  const num = (testResult.score * 100) / 4;
  console.log(num);

  const changePassColor = () => ({
    width: `${num}%`,
    background: progressColor(),
    height: "7px",
  });

  const createPassLabel = () => {
    switch (testResult.score) {
      case 0:
        return "Very weak";

      case 1:
        return "Weak";
      case 2:
        return "Fear";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "Very Strong";
    }
  };

  const progressColor = () => {
    switch (testResult.score) {
      case 0:
        return "#828282";

      case 1:
        return "#EA1111";
      case 2:
        return "#FFAD00";
      case 3:
        return "#9bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };
  return (
    <div>
      <div className="modal fade" id="myModal2" role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
              <h4 className="modal-title">Change your current password</h4>
            </div>
            <form className="pass-form" encType="multipart/form-data">
              <div className="modal-body-password">
                <div className="form-group">
                  {passError ? (
                    <div className="error_message">{passError}</div>
                  ) : (
                    ""
                  )}
                  <label className="label-password-modal">
                    Enter your new password
                    <br />
                    <input
                      type={isPassShown ? "text" : "password"}
                      className="password-field-modal"
                      placeholder="Enter your new password"
                      value={newPass}
                      onChange={(e) => {
                        setNewPass(e.target.value);
                      }}
                    />
                  </label>
                </div>
                <div className="form-group mb1">
                  <label className="label-password-modal">
                    Confirm your new password
                    <div className="eye">
                      <input
                        type={isPassShown ? "text" : "password"}
                        placeholder="Confirm your new password"
                        className="password-field-modal"
                        value={confirmPass}
                        onChange={(e) => {
                          setConfirmPass(e.target.value);
                        }}
                      />
                      <i
                        id="fa2"
                        className="fa fa-eye password-icon"
                        onClick={toggleVisibility}
                      />
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={changePassColor()}
                      ></div>
                    </div>
                    <p>{createPassLabel()}</p>
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn submit-pass-modal"
                  onClick={handleChange}
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="modal-footer-password">
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
      <Menu className="menuside">
        <li>
          <Link className="link" to="/Admins">
            Admins
          </Link>
        </li>
        <li>
          <Link className="link" to="/Employees">
            Employees
          </Link>
        </li>
        <li>
          <Link className="link" to="/Teams">
            Teams
          </Link>
        </li>
        <li>
          <Link className="link" to="/Projects">
            Projects
          </Link>
        </li>
        <li>
          <Link className="link" to="/Reports">
            Reports
          </Link>
        </li>
        <div>
          <button
            type="button"
            id="change"
            className="btn  btn-md"
            data-toggle="modal"
            data-target="#myModal2"
          >
            Change Password
          </button>
        </div>
        <div>
          <button
            type="button"
            id="change"
            className="btn btn-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </Menu>
    </div>
  );
};

export default Sidenav;
