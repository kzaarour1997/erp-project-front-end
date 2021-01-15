import React, { useEffect, useState } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import Login from "./Components/Login/Login";
import Admins from "./Components/Admins/Admins";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Teams from "./Components/Teams/Teams";
import Projects from "./Components/Projects/Projects";
import Reports from "./Components/Reports";
import Employees from "./Components/Employees/Employees";
import Axios from "axios";
import dataContext from "./Components/Context/Context";

const App = () => {
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("token");

    console.log(token);
    if (token) {
      setRedirect("/Admins");
    } else {
      setRedirect("/");
    }
  }, []);

  const redirectFunc = () => redirect && <Redirect to={redirect} />;

  const store = createStore(() => [], {}, applyMiddleware());

  const [users, setUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/users", {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      setUsers(response.data);
    });
  }, []);

  const [listEmployee, setListEmployee] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/employee", {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      setListEmployee(response.data);
      // console.log(response.data[0].created_at);
    });
  }, []);

  const [listTeam, setListTeam] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/team", {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      setListTeam(response.data);
    });
  }, []);

  const [listProject, setListProject] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/project", {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      // console.log(response.data&&response.data[0].id);
      setListProject(response.data);
    });
  }, []);

  const [role, setRole] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/role", {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      // console.log(response.data&&response.data[0].id);
      setRole(response.data);
    });
  }, []);

  const [employeeProjectRole, setEmployeeProjectRole] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/EmployeeProjectRole", {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then((response) => {
      // console.log(response.data&&response.data[0].id);
      setEmployeeProjectRole(response.data);
    });
  }, []);

  return (
    <dataContext.Provider
      value={{
        users,
        setUsers,
        listEmployee,
        setListEmployee,
        listTeam,
        setListTeam,
        listProject,
        setListProject,
        role,
        setRole,
        employeeProjectRole,
        setEmployeeProjectRole
      }}
    >
      <Provider store={store}>
        <Router>
          {redirectFunc()}
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Admins" component={Admins} />
            <Route exact path="/Employees" component={Employees} />
            <Route exact path="/Teams" component={Teams} />
            <Route exact path="/Projects" component={Projects} />
            <Route exact path="/Reports" component={Reports} />
          </Switch>
        </Router>
      </Provider>
    </dataContext.Provider>
  );
};

export default App;
