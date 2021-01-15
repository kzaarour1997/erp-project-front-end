import React from "react";


const AddProjectsEmployee = (props) => {
  console.log(props.projectEmployee.id);
  return (
    <div
      key={props.projectEmployee.id}
      className="col-md-12"
      style={{ marginTop: "20px", width: "600px" }}
    >
      <div className="row">
        <div className="col-md-3">
          <img
            src={`http://localhost:8000/storage/${props.projectEmployee.image}`}
            className="user-image"
            alt="error"
          />
        </div>
        <div className="col-md-3" style={{ marginTop: "20px" }}>
          {props.projectEmployee.firstname}
        </div>
        <div className="col-md-3" style={{ marginTop: "20px" }}>
          hahahahah
        </div>
      </div>
    </div>
  );
};

export default AddProjectsEmployee;
