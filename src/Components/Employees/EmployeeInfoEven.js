import React from "react";
import DeleteEmployeeEven from "./DeleteEmployeeEven";
import KPI from "./KPI";
import UpdateEmployee from "./UpdateEmployee";
import  ViewEmployee from "./ViewEmployee";

const EmployeeInfoEven = (props) => {
  // console.log(props);
  return (
    <div className="row background" key={props.employee.id} style={{transform: "skewX(18deg)" , border:"1px #bf3c41 solid"}}>
      <div className="info">
      <div className="col-md-1" style={{position: "relative",
  left: "-4vw" }}>
        <img
          src={`http://localhost:8000/storage/${props.employee.image}`}
          alt="error"
          className="user-image user_image_rot"
          style={{transform: "skewX(-20deg)" ,border:" 1.4px #fee715ff solid"}}
        />
      </div>
      <div className="col-md-5">
        <p
          style={{
            color: "white",
            transform: "skewX(-20deg)",
            fontSize: "14px",
            margin: "24px 0",
            position:"relative",
            left:"12vw",
            width: "22vw",
            textAlign: "center"

          }}
        >
          {props.employee.firstname} {props.employee.lastname}
        </p>
      </div>
      <div style = {{position:"relative",left:"16.4vw" , transform: "skewX(-34deg)"}}>
      <ViewEmployee viewEmp={props.employee} />
      <UpdateEmployee updateEmployee={props.employee} />
      <KPI kpiEmployee = {props.employee}/>
      <DeleteEmployeeEven deleteEmployee={props.employee}/>
      </div>
      </div>
    </div>
  );
};

export default EmployeeInfoEven;
