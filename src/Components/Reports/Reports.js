import React, { useContext } from "react";
import Sidenav from "../SideNav/Sidenav";
// import Pagination from '../Pagination/Pagination';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dataContext from "../Context/Context";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "./Reports.css";

const Reports = () => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { listProject, setListProject, render, setRender } = useContext(
    dataContext
  );
  console.log(listProject);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    setFilteredData(
      listProject.filter((user) =>
        user.project_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, listProject, render]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="container container-xs" style={{ marginBottom: "1vw" }}>
      <Sidenav />
      <div className="container">
        <div className="row header">
          <div className="col-md-2 col-sm-2"></div>
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
        <div className="sections">
          <ul>
            <li>
              <Link style={{ color: "#fee715ff" }} to="/Reports">
                Project Reports{" "}
              </Link>
              <Link style={{ color: "#fee715ff" }} to="/KpiReports">
                / Kpi Reports
              </Link>
            </li>
          </ul>
          <div
            style={{
              marginLeft: "3.5%",
              marginBottom: "1vw",
            }}
          >
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button"
              table="table-to-xls"
              filename="tablexls"
              sheet="tablexls"
              buttonText="Download as XLS"
            />
          </div>
          <table className="customers" id="table-to-xls">
            <thead>
              <tr>
                <th>Projects</th>
                <th>Teams</th>
                <th>Employees</th>
              </tr>
            </thead>
            {currentPosts.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.project_name}</td>
                  <td>
                    {val.team.map((i) => {
                      return <p>{i.name}</p>;
                    })}
                  </td>
                  <td>
                    {val.employees.map((j) => {
                      return <p>{j.firstname}</p>;
                    })}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
