import React from "react";
import ViewAdmin from "./ViewAdmin";
import UpdateAdmin from "./UpdateAdmin";
import DeleteAdmin from "./DeleteAdminEven";

const AdminInfoEven = (props) => {
  return (
    <div>
      <div
        className="row background"
        key={props.admin.id}
        style={{ transform: "skewX(18deg)", border: "1px #bf3c41 solid" }}
      >
        <div className="info">
          <div
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
          </div>
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
              {props.admin.firstname} {props.admin.lastname}
            </p>
          </div>
          <div
            style={{
              position: "relative",
              left: "20vw",
              transform: "skewX(-34deg)",
            }}
          >
            <ViewAdmin viewAdm={props.admin} />
            <UpdateAdmin updateAdmin={props.admin} />
            <DeleteAdmin deleteAdmin={props.admin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInfoEven;
