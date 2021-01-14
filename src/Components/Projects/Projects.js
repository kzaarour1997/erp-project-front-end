import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import Sidenav from "../SideNav/Sidenav";
import Pagination from "../Pagination/Pagination";
import AddProjects from "./AddProjects";

const Projects = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  const [listProject, setlistProject] = useState([]);
  // const [nestedListProject , setNestedListProject] = useState([]);

  const numOfProjects = listProject.length;

  useEffect(() => {
    Axios.get("http://localhost:8000/api/project", {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      // console.log(response.data&&response.data[0].id);
      setlistProject(response.data);
    });
  }, []);

  useEffect(() => {
    setFilteredData(
      listProject.filter((project) =>
        project.project_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, listProject]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  console.log("currentPosts: ", currentPosts);
  return (
    <div>
      <Sidenav />
      <div className="container container-xs">
        <div className="row header">
          <div className="col-md-2 col-sm-2">
            <button
              type="button"
              id="change1"
              className="btn  btn-md"
              data-toggle="modal"
              data-target="#myModal"
            >
              Add Projects
            </button>
          </div>
          <div className="col-md-8 col-sm-6">
            <form className="search">
              <input
                value={search}
                placeholder="Find Project..."
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
          Number of Projects is{"  "}
          <span className="badge">
            <span className="badge-secondary">{numOfProjects}</span>
          </span>
        </h1>
        <div className="sections">
          {filteredData.length === 0 ? (
            <div className="no_result">No result found!</div>
          ) : (
            // currentPosts.map((arr, index) => {
            //   if (index % 2 === 0) {
            //     return <EmployeeInfo key={arr.id} employee={arr} />;
            //   } else {
            //     return <EmployeeInfoEven key={arr.id} employee={arr} />;
            //   }
            // })
            currentPosts.map((val) => {
              return <div key={val.id}>{val.project_name}</div>;
            })
          )}
        </div>
        <AddProjects />
      </div>
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
  );
};

export default Projects;
