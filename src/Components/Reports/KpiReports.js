import React, { useContext } from "react";
import Sidenav from "../SideNav/Sidenav";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dataContext from "../Context/Context";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "./Reports.css";

const KpiReports = () => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { listEmployee, setListEmployee, render, setRender } = useContext(
    dataContext
  );
  //   console.log(listEmployee);

  useEffect(() => {
    setFilteredData(
      listEmployee.filter((user) =>
        user.firstname.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, listEmployee, render]);

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
                placeholder="Find Employee..."
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
              style={{
                marginLeft: "2.6%",
                marginBottom: "1vw",
              }}
            />
          </div>
          <table className="customers" id="table-to-xls">
            <tr>
              <th>Employees</th>
              <th>Kpi Name</th>
              <th>Kpi Latest Value</th>
            </tr>
            {filteredData.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.firstname}</td>
                  <td>
                    {val.kpis.map((i) => {
                      return <p>{i.name}</p>;
                    })}
                  </td>
                  <td>
                    {val.kpis.map((j) => {
                      return <p>{j.value}</p>;
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

export default KpiReports;
