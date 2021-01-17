import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

import Sidenav from "../SideNav/Sidenav";
import Pagination from "../Pagination/Pagination";
import AddAdmin from "./AddAdminModal";
import AdminInfo from "./AdminInfo";
import AdminInfoEven from "./AdminInfoEven";



const Admins = () => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  //to refresh the page on click
  const [render, setRender] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const [users, setUsers] = useState([]);
  const numOfAdmins = users.length;

  //Set state render inside useEffect for refresh

  useEffect(() => {
    Axios.get("http://localhost:8000/api/users", {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      setUsers(response.data);
    });
  }, [render]);

  useEffect(() => {
    setFilteredData(
      users.filter((user) =>
        user.firstname.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, users, render]);
  

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log("currentPosts: ", currentPosts);

  return (
    <div className="container container-xs">
      <Sidenav />
      <div className="container">
        <div className="row header">
          <div className="col-md-2 col-sm-2">
            <button
              type="button"
              id="change1"
              className="btn  btn-md"
              data-toggle="modal"
              data-target="#myModal"
            >
              Add Admin
            </button>
          </div>
          <div className="col-md-8 col-sm-6">
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
          </div>
          <div className="col-md-2 profile_admin">
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
        </div>
        <h1>
          Number of Admins is{"  "}
          <span className="badge badge-secondary">{numOfAdmins}</span>
        </h1>
        <div className="sections">
          {filteredData.length === 0 ? (
            <div className="no_result">No result found!</div>
          ) : (
            currentPosts.map((arr, index) => {
              if (index % 2 === 0) {
                // render={{setRender}} for refresh
                return (
                  <AdminInfo key={arr.id} admin={arr} render={{ setRender }} />
                );
              } else {
                return (
                  <AdminInfoEven
                    key={arr.id}
                    admin={arr}
                    render={{ setRender }}
                  />
                );
              }
            })
          )}
        </div>
        <AddAdmin render={{ setRender }} />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6" style={{ textAlign: "center" }}>
            <Pagination
              paginate={paginate}
              postsPerPage={postsPerPage}
              totalPosts={filteredData.length}
            />
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
};
export default Admins;
