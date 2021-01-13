import React from "react";
import ViewTeam from "./ViewTeam";
import DeleteTeam from "./DeleteTeam";

const TeamInfo = (props) => {
  console.log(props);
  return (
    <div className="row background" key={props.team.id}>
      <div className="info">
        {/* <div className="col-md-1" style={{}}>
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
        </div> */}
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
            {props.team.name}
          </p>
        </div>
        <div style={{ position: "relative", left: "29.2vw" }}>
          <ViewTeam viewTeam={props.team} />
          <DeleteTeam deleteTeam={props.team} />
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
