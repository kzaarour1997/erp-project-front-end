import React from "react";
import DeleteTeam from "./DeleteTeamEven";
import ViewTeam from "./ViewTeam";

const TeamInfoEven = (props) => {
  const { setRender } = props.render;
  // console.log({setRender});
  return (
    <div>
      <div
        className="row background"
        key={props.team.id}
        style={{ transform: "skewX(18deg)", border: "1px #bf3c41 solid" }}
      >
        <div className="info">
          {/* <div
            className="col-md-1"
            style={{ position: "relative", left: "-4vw" }}
          >
            <img
              src={`http://localhost:8000/storage/${props.admin.image}`}
              alt="error"
              className="user-image user_image_rot"
              style={{
                transform: "skewX(-20deg)",
                border: " 1.4px #fee715ff solid",
              }}
            />
          </div> */}
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
              {props.team.name}
            </p>
          </div>
          <div
            style={{
              position: "relative",
              left: "31vw",
              transform: "skewX(-34deg)",
            }}
          >
            <ViewTeam viewTeam={props.team} />
            <DeleteTeam deleteTeam={props.team} render={{ setRender }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfoEven;
