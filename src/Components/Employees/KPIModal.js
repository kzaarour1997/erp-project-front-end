import React from "react";
import { useDialog } from "react-st-modal";
import { useState, useEffect } from "react";
import Charts from "./Charts";
import Axios from "axios";
import Chart from "./Charts";

const KPIModal = (props) => {
  // use this hook to control the dialog
  //  console.log(props.modalKpi.kpis);

  const dialog = useDialog();
  const [value, setValue] = useState();

  const [name, setName] = useState("");
  const [kpiValue, setKpiValue] = useState(1);

  const [kpi, setKpi] = useState(props.modalKpi.kpis);

  const { setRender } = props.render;
  // console.log({ setRender });

  const creatKpi = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("value", kpiValue);
    data.append("employees_id", props.modalKpi.id);

    try {
      await Axios.post("http://localhost:8000/api/kpi", data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then((response) => {
        console.log(response.data);
        localStorage.getItem("token");
        alert("Successfully Created!!");
        setRender((prev) => !prev);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label for="value" style={{ color: "black" }}>
          Choose a Value:
        </label>
        <select
          id="value"
          name="value"
          onChange={(e) => {
            setKpiValue(e.target.value);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </form>
      <button className="Modal-Update-btn" onClick={creatKpi}>
        Creat
      </button>
      {kpi.map((val) => {
        return (
          <div>
            <Chart value={val.value} name={val.name} />
          </div>
        );
      })}
      <button
        onClick={() => {
          // Сlose the dialog and return the value
          dialog.close(value);
        }}
        className="Modal-Update-close-btn"
      >
        Close
      </button>
    </div>
  );
};

export default KPIModal;
