import { useDialog } from "react-st-modal";
import { useState, useEffect } from "react";
import Axios from "axios";
import React from "react";
import "./AssignToModal.css";
import { left } from "@popperjs/core";

const AssignToModal = (props) => {
  // use this hook to control the dialog

  // console.log(props.teams)

  // console.log(props.assignProject);
  // console.log(props.assignEmployee&&props.assignEmployee.id);

  // console.log(props.empProj);
  // console.log(props.idproj);

  const dialog = useDialog();
  const [value, setValue] = useState();
  const [check, setCheck] = useState([]);
  const [select, setSelect] = useState([]);
  // console.log(select);
  // console.log(select);
  const [options, setOptions] = useState([]);
  const [filterdData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectSearch, setSelectSearch] = useState([]);

  const [searchTeam, setSearchTeam] = useState("");
  const [filterdDataTeam, setFilterdDataTeam] = useState([]);
  useEffect(() => {
    // console.log("sjgsgs");
    for (let i = 0; i < props.assignEmployee.length; i++) {
      setSelect((prev) => [
        ...prev,
        {
          id: props.assignEmployee[i].id,
          checked: false,
          role: props.roless[0].id,
        },
      ]);
    }
  }, []);

  const handleSubmitTeams = async (e) => {
    e.preventDefault();

    // console.log(check);
    // console.log(options);
    try {
      check.map(async (id) => {
        const data = new FormData();
        data.append("project_id", props.idproj);
        data.append("team_id", id);

        await Axios.post("http://localhost:8000/api/teamproject", data, {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }).then((response) => {
          console.log(response.data);
          localStorage.getItem("token");
          alert("Successfully Assigned A Project To A Team!!!");
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Multiple Search with select form

  useEffect(() => {
    setFilteredData(
      props.assignEmployee.filter((value) =>
        value.firstname.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  useEffect(() => {
    setFilterdDataTeam(
      props.teams.filter((value) =>
        value.name.toLowerCase().includes(searchTeam.toLowerCase())
      )
    );
  }, [searchTeam]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(check);
    // console.log(options);
    try {
      select.map(async (element) => {
        if (element.checked) {
          const data = new FormData();
          data.append("project_id", props.idproj);
          data.append("employee_id", element.id);
          data.append("role_id", element.role);
          await Axios.post(
            "http://localhost:8000/api/EmployeeProjectRole",
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
            alert("Successfully Assigned A Project To A Employee!!!");
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <select
        onChange={(e) => {
          setSelectSearch(e.target.value);
          // console.log(selectSearch);
        }}
        className="select"
      >
        <option value="teams">Teams</option>
        <option value="employees">Employees</option>
      </select>

      {selectSearch === "employees" ? (
        <div>
          <div className="searchBar">
            <input
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              placeholder="search by employee"
            />
          </div>
          <h3>List Of Employees :</h3>
          <table>
            <tr>
              <th>Employee Name</th>
              <th>Roles</th>
              <th></th>
            </tr>

            {filterdData.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.firstname}</td>
                  <td>
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          //  console.log(e.target.value , val.id);
                          setSelect((prev) =>
                            prev.map((selectElmts) => {
                              if (selectElmts.id === val.id) {
                                return {
                                  id: selectElmts.id,
                                  checked: selectElmts.checked,
                                  role: e.target.value,
                                };
                              } else {
                                return selectElmts;
                              }
                            })
                          );
                        } else {
                        }
                      }}
                    >
                      {" "}
                      {props.roless.map((i) => {
                        return (
                          <option key={i.id} value={i.id}>
                            {i.name}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        setSelect((prev) =>
                          prev.map((selectElmts) => {
                            if (selectElmts.id === val.id) {
                              return {
                                id: selectElmts.id,
                                checked: e.target.checked,
                                role: selectElmts.role,
                              };
                            } else {
                              return selectElmts;
                            }
                          })
                        );
                      }}
                      style={{
                        marginLeft: "10vw",
                        transform: "scale(1.2)",
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
          <button
            onClick={handleSubmit}
            style={{
              position: "relative",
              marginTop: "26px",
              left: "17vw",
            }}
          >
            Assign Employees
          </button>
        </div>
      ) : (
        <div>
          <div className="searchBar">
            <input
              type="text"
              onChange={(e) => {
                setSearchTeam(e.target.value);
              }}
              value={searchTeam}
              placeholder="search by team"
            />
          </div>
          <h3>List Of Teams :</h3>
          <table
            style={{
              margin: "0 15vw",
            }}
          >
            {filterdDataTeam.map((val) => {
              return (
                <tr key={val.id}>
                  <td className="span">{val.name}</td>
                  <td
                    style={{
                      position: "relative",
                      left: "8vw",
                    }}
                  >
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCheck((prev) => [...prev, val.id]);
                        } else {
                          setCheck((prev) =>
                            prev.filter((element) => element != val.id)
                          );
                        }
                        console.log(e.target.checked);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </table>
          <button
            onClick={handleSubmitTeams}
            style={{
              position: "relative",
              left: "41%",
              marginTop: "19px",
            }}
          >
            Assign Teams
          </button>
        </div>
      )}
      <button
        onClick={() => {
          // Сlose the dialog and return the value
          dialog.close(value);
        }}
        className="View_close_btn"
        style={{
          position: "relative",
          left: "18vw",
        }}
      >
        Close
      </button>
    </div>
  );
};

export default AssignToModal;
