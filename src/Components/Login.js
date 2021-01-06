import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import "../App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [authErr, setAuthErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [isPassShown, setIsPassShown] = useState(false);

  const toggleVisibility = () => {
    setIsPassShown(!isPassShown);
  };

  const HandleLogin = async (e) => {
    e.preventDefault();
    if (!username && !password) {
      setUsernameErr("Username is invalid!");
      setPassErr("Password is invalid!");
      setAuthErr("");
    } else if (username && !password) {
      setUsernameErr("");
      setPassErr("Password is invalid");
      setAuthErr("");
    } else if (!username && password) {
      setPassErr("");
      setUsernameErr("Username is invalid!");
      setAuthErr("");
    } else if (password.length < 6) {
      setPassErr("Password must containt at least 6 characters!");
      setAuthErr("");
      setUsernameErr("");
    } else if (username.length < 5) {
      setUsernameErr("Username must containt at least 5 characters!");
      setAuthErr("");
      setPassErr("");
    } else if (username.length < 5 && password.length < 6) {
      setUsernameErr("Username must containt at least 5 characters!");
      setPassErr("Password must containt at least 6 characters!");
      setAuthErr("");
    } else {
      try {
        await Axios.post("http://localhost:8000/api/login", {
          username: username,
          password: password,
        }).then((response) => {
          setAuthErr(response.data.error + " Username or Password");
          setUsernameErr("");
          setPassErr("");
          setToken(response.data.access_token);
          {
            localStorage.setItem("image", response.data.user.image);
            localStorage.setItem("id", response.data.user.id);
            localStorage.setItem("username", response.data.user.username);
            response &&
              response.data &&
              response.data.access_token &&
              localStorage.setItem("token", response.data.access_token);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="login">
        <div className="login_block">
          <form
            className="login-form"
            style={{ width: "40%", margin: "8% auto" }}
          >
            <div className="form-group">
              <p>
                {authErr ? (
                  <span class="error_msg">
                    {authErr}
                    {"\t"}
                  </span>
                ) : (
                  ""
                )}
              </p>
              <label className="login-label" htmlFor="exampleInputEmail1">
                Username
              </label>
              <p>
                {usernameErr ? (
                  <span class="error_msg">
                    {usernameErr}
                    {"\t"}
                  </span>
                ) : (
                  ""
                )}
              </p>
              <input
                type="text"
                value={username}
                className="form-control-login"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label className="login-label" htmlFor="exampleInputPassword1">
                Password
              </label>
              <br />
              {passErr ? <span class="error_msg">{passErr}</span> : ""}
              <div className="eye">
                <input
                  type={isPassShown ? "text" : "password"}
                  value={password}
                  className="form-control-login"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />{" "}
                <i
                  id="fa1"
                  className="fa fa-eye password-icon"
                  onClick={toggleVisibility}
                />
              </div>
            </div>

            <button type="submit" className="btn" onClick={HandleLogin}>
              <span className="submit"> Submit</span>
            </button>
          </form>
          {token ? <Redirect exact to="/Admins" /> : <Redirect exact to="/" />}
        </div>
      </div>
    </div>
  );
};

export default Login;
