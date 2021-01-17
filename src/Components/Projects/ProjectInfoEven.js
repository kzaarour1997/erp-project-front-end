import React from "react";
import ViewProject from "./ViewProject";
import AssignEmployee from "./AssignEmployee";
import DeleteProject from "./DeleteProjectEven";

const ProjectInfoEven = (props) => {
  const {setRender} = props.render;
  return (
    <div
      className="row background"
      key={props.project.id}
      style={{ transform: "skewX(18deg)", border: "1px #bf3c41 solid" }}
    >
      <div className="info">
        <div className="col-md-1" style={{}}></div>
        <div className="col-md-5">
          <p
            style={{
              color: "white",
              transform: "skewX(-20deg)",
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
        <div
          style={{
            position: "relative",
            left: "20vw",
            transform: "skewX(-34deg)",
          }}
        >
          <ViewProject project={props.proj}/>
          <AssignEmployee
            employee={props.employee}
            project={props.projects}
            employeeProjects={props.employeeProject}
            projectId={props.projId}
            listRole={props.role}
            team={props.listTeam}
          />
        <DeleteProject  project = {props.project}  rendering={{setRender}} />
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoEven;
