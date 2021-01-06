import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Sidenav from "./Sidenav";
import Pagination from "./Pagination";

const Admins = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [newfirstName, setNewfirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newImage, setNewImage] = useState("");
  const [users, setUsers] = useState([]);
  const [render, setRender] = useState();
  const [lastnameErr, setLastnameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [firstnameErr, setFirstnameErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [success, setSuccess] = useState("");
  const [successUpdate, setSuccessUpdate] = useState("");
  const [imageErr, setImageErr] = useState("");
  const [newlastnameErr, setnewLastnameErr] = useState("");
  const [newemailErr, setnewEmailErr] = useState("");
  const [newfirstnameErr, setnewFirstnameErr] = useState("");
  const [newimageErr, setnewImageErr] = useState("");
  const [infoErr, setInfoErr] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const numOfAdmins = users.length;

  useEffect(() => {
    Axios.get("http://localhost:8000/api/users", {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      setUsers(response.data);
      setLoading(false);
    });
  }, [render]);

  useEffect(() => {
    setFilteredData(
      users.filter(
        (user) =>
          user.firstname.toLowerCase().includes(search.toLowerCase()) ||
          user.lastname.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users, render]);

  useEffect(() => {
    localStorage.getItem("image");
    console.log(localStorage.getItem("image"));
  }, []);

  useEffect(() => {
    localStorage.getItem("id");
    console.log(localStorage.getItem("id"));
  }, []);

  useEffect(() => {
    localStorage.getItem("username");
    console.log(localStorage.getItem("username"));
  }, []);

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
        console.log(response.data);
        localStorage.getItem("token");
        setLoading(false);
        setUsers([
          ...users,
          {
            firstname: firstName,
            lastname: lastName,
            email: email,
            image: image,
            username: userName,
            password: password,
          },
        ]);
        setSuccess("Data has been inserted");
        setFirstnameErr("");
        setLastnameErr("");
        setEmailErr("");
        setUsernameErr("");
        setPassErr("");
        setImageErr("");
      });
    } catch (error) {
      if (
        error.response.data.error.firstname &&
        error.response.data.error.lastname &&
        error.response.data.error.email &&
        error.response.data.error.username &&
        error.response.data.error.password &&
        error.response.data.error.image
      ) {
        setFirstnameErr(error.response.data.error.firstname);
        setLastnameErr(error.response.data.error.lastname);
        setEmailErr(error.response.data.error.email);
        setUsernameErr(error.response.data.error.username);
        setPassErr(error.response.data.error.password);
        setImageErr(error.response.data.error.image);
      } else if (!error.response.data.error.firstname) {
        setFirstnameErr("");
      } else if (
        error.response.data.error.firstname ||
        error.response.data.error.lastname ||
        error.response.data.error.email ||
        error.response.data.error.username ||
        error.response.data.error.password ||
        error.response.data.error.image
      ) {
        setInfoErr("Your information are not Valid!");
      } else if (!error.response.data.error.lastname) {
        setLastnameErr("");
      } else if (!error.response.data.error.email) {
        setEmailErr("");
      } else if (!error.response.data.error.username) {
        setUsernameErr("");
      } else if (!error.response.data.error.password) {
        setPassErr("");
      } else if (!error.response.data.error.image) {
        setImageErr("");
      } else if (error.response.data.error.firstname) {
        setFirstnameErr(error.response.data.error.firstname);
      } else if (error.response.data.error.lastname) {
        setLastnameErr(error.response.data.error.lastname);
      } else if (error.response.data.error.email) {
        setEmailErr(error.response.data.error.email);
      } else if (error.response.data.error.username) {
        setUsernameErr(error.response.data.error.username);
      } else if (error.response.data.error.password) {
        setPassErr(error.response.data.error.password);
      } else if (error.response.data.error.image) {
        setImageErr(error.response.data.error.image);
      }
    }
  };
  if (loading) {
    return <p>Loading data...</p>;
  }
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

  const updateInfo = async (id) => {
    if (!newfirstName && !newLastName && !newEmail && !newImage) {
      setnewFirstnameErr("Firstname is Required!");
      setnewLastnameErr("Lastname is Required!");
      setnewEmailErr("Email is Invalid!");
      setnewImageErr("Image is required!");
    } else if (newfirstName && !newLastName && !newEmail && !newImage) {
      setnewFirstnameErr("");
      setnewLastnameErr("Lastname is Required!");
      setnewEmailErr("Email is Invalid!");
      setnewImageErr("Image is required!");
    } else if (!newfirstName && newLastName && !newEmail && !newImage) {
      setnewFirstnameErr("Firstname is Required!");
      setnewLastnameErr("");
      setnewEmailErr("Email is Invalid!");
      setnewImageErr("Image is required!");
    } else if (!newfirstName && !newLastName && newEmail && !newImage) {
      setnewFirstnameErr("Firstname is Required!");
      setnewLastnameErr("Lastname is Required!");
      setnewEmailErr("");
      setnewImageErr("Image is required!");
    } else if (!newfirstName && newLastName && !newEmail && newImage) {
      setnewFirstnameErr("Firstname is Required!");
      setnewLastnameErr("Lastname is Required!");
      setnewEmailErr("Email is Invalid!");
      setnewImageErr("");
    } else if (!newEmail.includes("@") && !newEmail.includes(".com")) {
      setnewEmailErr("Please enter a valid email address");
    } else {
      const data = new FormData();
      data.append("firstname", newfirstName);
      data.append("lastname", newLastName);
      data.append("email", newEmail);
      data.append("image", newImage);
      try {
        await Axios.post(
          `http://localhost:8000/api/users/${id}?_method=PUT `,
          data,
          {
            headers: {
              "content-type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        ).then((response) => {
          console.log(response);
          setRender(!render);
          setSuccessUpdate("Data has been updated");
          setnewFirstnameErr("");
          setnewLastnameErr("");
          setnewEmailErr("");
          setnewImageErr("");
        });
      } catch (err) {
        console.log(err);
      }
    }

    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  // console.log("indexOfLastPost: ", indexOfLastPost);

  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // console.log("indexOfFirstPost: ", indexOfFirstPost);

  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log("currentPosts: ", currentPosts);

  return (
    <div className="admin">
      <Sidenav />

      <div className="container">
        <div className="header">
          <button
            type="button"
            id="change1"
            className="btn  btn-md"
            data-toggle="modal"
            data-target="#myModal"
          >
            Add Admin
          </button>

          <form className="search">
            <input
              value={search}
              placeholder="Find Admins..."
              type="text"
              name=""
              className="search__field"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </form>
          <div className="username-section">
            <img
              className="user-image"
              src={`http://localhost:8000/storage/${localStorage.getItem(
                "image"
              )}`}
              alt="error"
            />
           
          </div>
          <div className="admin_name">
              <span>{localStorage.getItem("username")}</span>
            </div>
        </div>

        <h1>
          Number of Admins is{"  "}
          <span className="badge badge-secondary">{numOfAdmins}</span>
        </h1>
        {successUpdate ? (
          <p className="alert alert-success">{successUpdate}</p>
        ) : (
          ""
        )}
        <div className="admin">
          {filteredData.length === 0 ? (
            <div className = "no_result">No result found!</div>
          ) : (
            currentPosts.map((arr) => {
              return (
                <div className="parent" key={arr.id}>
                  <img
                    src={`http://localhost:8000/storage/${arr.image}`}
                    alt="error"
                  />
                  <p className="admins">
                    {arr.firstname} {arr.lastname}
                    <span>{arr.email}</span>{" "}
                  </p>
                  <div className="buttons_under_admin">
                    <div className="dropdown">
                      <button
                        id="change2"
                        className="btn  dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                      >
                        Update Admin info<span className="caret"></span>
                      </button>
                      <ul className="dropdown-menu">
                        <p className="error_update">
                          {newfirstnameErr ? (
                            <span className="error_msg">{newfirstnameErr}</span>
                          ) : (
                            ""
                          )}
                        </p>
                        <label className="updateLabel">Firstname</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="enter firstname"
                          onChange={(e) => {
                            setNewfirstName(e.target.value);
                          }}
                        />
                        <p className="error_update">
                          {newlastnameErr ? (
                            <span className="error_msg">{newlastnameErr}</span>
                          ) : (
                            ""
                          )}
                        </p>
                        <label className="updateLabel">Lastname</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="enter lastname"
                          onChange={(e) => {
                            setNewLastName(e.target.value);
                          }}
                        />
                        <p className="error_update">
                          {newemailErr ? (
                            <span className="error_msg">{newemailErr}</span>
                          ) : (
                            ""
                          )}
                        </p>
                        <label className="updateLabel">Email</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="enter email"
                          onChange={(e) => {
                            setNewEmail(e.target.value);
                          }}
                        />
                        <p className="error_update">
                          {newimageErr ? (
                            <span className="error_msg">{newimageErr}</span>
                          ) : (
                            ""
                          )}
                        </p>
                        <br></br>
                        <label className="updateLabel">
                          Image
                        </label>
                        <input
                            className="form-control"
                            type="file"
                            name="image"
                            id="image"
                            placeholder="Enter your Address"
                            onChange={(e) => {
                              setNewImage(e.target.files[0]);
                              console.log(e.target.files[0]);
                            }}
                          />
                        <button
                          id="change1"
                          className="Button_update"
                          onClick={() => {
                            updateInfo(arr.id);
                          }}
                        >
                          Edit
                        </button>
                      </ul>
                    </div>
                    <button
                      className="Button Button_delete"
                      id="change"
                      onClick={() => {
                        deleteItem(arr.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
                <h4 className="modal-title">Add an Admin to the list</h4>
              </div>
              <form encType="multipart/form-data">
                <div className="modal-body">
                  {infoErr ? (
                    <div className="alert alert-danger">{infoErr}</div>
                  ) : (
                    ""
                  )}
                  {success ? (
                    <div className="alert alert-success">{success}</div>
                  ) : (
                    ""
                  )}
                  <label htmlFor="name">First name:</label>
                  <p className="err_pos">
                    {firstnameErr ? (
                      <span className="error_msg">{firstnameErr}</span>
                    ) : (
                      ""
                    )}
                  </p>
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
                  <label htmlFor="lastname">Last name:</label>
                  <p className="err_pos">
                    {lastnameErr ? (
                      <span className="error_msg">{lastnameErr}</span>
                    ) : (
                      ""
                    )}
                  </p>
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
                  <label htmlFor="email">Email</label>
                  <p className="err_pos">
                    {emailErr ? (
                      <span className="error_msg">{emailErr}</span>
                    ) : (
                      ""
                    )}
                  </p>
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
                  <label htmlFor="image">Image</label>
                  <p className="err_pos">
                    {imageErr ? (
                      <span className="error_msg">{imageErr}</span>
                    ) : (
                      ""
                    )}
                  </p>
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
                  <label htmlFor="username">Username:</label>
                  <p className="err_pos">
                    {usernameErr ? (
                      <span className="error_msg">{usernameErr}</span>
                    ) : (
                      ""
                    )}
                  </p>
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
                  <label htmlFor="password">Password:</label>
                  <p className="err_pos">
                    {passErr ? (
                      <span className="error_msg">{passErr}</span>
                    ) : (
                      ""
                    )}
                  </p>
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
        <div className="container mt-5">
          <Pagination
            paginate={paginate}
            postsPerPage={postsPerPage}
            totalPosts={filteredData.length}
          />
        </div>
      </div>
    </div>
  );
};
export default Admins;
