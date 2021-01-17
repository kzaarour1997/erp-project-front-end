import React from "react";
import { CustomDialog } from "react-st-modal";
import KPIModal from "./KPIModal";

const KPI = (props) => {
  // console.log(props.kpiEmployee);
  const setRender = props.render;
  // console.log({setRender})
  return (
    <div
      className="col-md-1"
      style={{
        marginTop: "15px",
        transform: "skewX(20deg)",
        marginLeft: "-7px",
      }}
    >
      <button
        onClick={async () => {
          const result = await CustomDialog(
            <KPIModal modalKpi={props.kpiEmployee} render ={setRender}/>,
            {
              title: "KPI lists",
              showCloseIcon: true,
            }
          );
        }}
        className="KPI_button"
        style={{
          position: "relative",
          left: "7px",
        }}
      >
        KPI
      </button>
    </div>
  );
};

export default KPI;
