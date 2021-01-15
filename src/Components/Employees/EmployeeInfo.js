import React from "react";
import DeleteEmployee from "./DeleteEmployee";
import KPI from "./KPI";
import UpdateEmployee from "./UpdateEmployee";
import ViewEmployee from "./ViewEmployee";
import AssignTo from "./AssignTo";

const EmployeeInfo = (props) => {
  console.log(props.employee.firstname);
  return (
    <div className="row background" key={props.employee.id}>
      <div className="info">
        <div className="col-md-1" style={{}}>
          <img
            src={`http://localhost:8000/storage/${props.employee.image}`}
            alt="error"
            className="user-image user_image_rot"
            style={{
              border: " 1.4px #bf3c41 solid",
              position: "relative ",
              left: "27px",
            }}
          />
        </div>
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
            {props.employee.firstname} {props.employee.lastname}
          </p>
        </div>
        <div style={{ position: "relative", left: "9.4vw" }}>
          <ViewEmployee viewEmp={props.employee} />
          <AssignTo assignTo = {props.employee}/>
          <UpdateEmployee updateEmployee={props.employee} />
          <KPI kpiEmployee={props.employee} />
          <DeleteEmployee deleteEmployee={props.employee} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;
