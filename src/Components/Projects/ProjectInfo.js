import React from "react";
import ViewProject from "./ViewProject";
import AssignEmployee from "./AssignEmployee";

const ProjectInfo = (props) => {
  //   console.log(props.projects);
  // console.log(props.employee);
  console.log(props.project);
    console.log(props.employeeProject)
  return (
    <div className="row background" key={props.project.id}>
      <div className="info">
        <div className="col-md-1" style={{}}></div>
        <div className="col-md-5">
          <p
            style={{
              color: "white",
              transform: "skewX(20deg)",
              fontSize: "14px",
              margin: "24px 0",
              position: "relative",
              left: "12vw",
              width: "22vw",
              textAlign: "center",
            }}
          >
            {props.project.project_name}
          </p>
        </div>
        <div style={{ position: "relative", left: "18.4vw" }}>
          <ViewProject />
          <AssignEmployee employee={props.employee} project={props.projects}  employeeProjects={props.employeeProject}/>
          {/*  <UpdateAdmin updateAdmin={props.admin} />
          <DeleteAdmin deleteAdmin={props.admin} /> */}
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
