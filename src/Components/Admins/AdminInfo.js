import React from "react";
import ViewAdmin from "./ViewAdmin";
import UpdateAdmin from "./UpdateAdmin";
import DeleteAdmin from "./DeleteAdmin";

const AdminInfo = (props) => {
  const { setRender } = props.render;
  // console.log({setRender});


  return (
    <div className="row background" key={props.admin.id}>
      <div className="info">
        <div className="col-md-1" style={{}}>
          <img
            src={`http://localhost:8000/storage/${props.admin.image}`}
            alt="error"
            className="user-image user_image_rot"
            style={{
              border: "1.4px #bf3c41 solid",
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
            {props.admin.firstname} {props.admin.lastname}
          </p>
        </div>
        <div style={{ position: "relative", left: "18.4vw" }}>
          <ViewAdmin viewAdm={props.admin} />
          <UpdateAdmin updateAdmin={props.admin} rendering = {{setRender}}/>
          <DeleteAdmin deleteAdmin={props.admin} rendering = {{setRender}}/>
        </div>
      </div>
    </div>
  );
};

export default AdminInfo;
