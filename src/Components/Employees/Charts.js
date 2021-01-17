import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Axios from "axios";
import { useState, useEffect } from "react";

const Chart = (props) => {
  const [value, setValue] = useState([]);

  const data = [
    {
      from: 1,
      value: 1,
    },
    {
      from: 2,
      value: 3,
    },
    {
      from: props.date,
      value: 4,
    },
    {
      from: props.date,
      value: props.value,
    },
  ];

  //Need to add active color for chosen category

  let xAxisLabels = [];
  let isVisible = false;

  data.map((item) => {
    const options = { month: "short", day: "numeric" };
    const fromDate = new Date(item.from).toLocaleDateString("de-DE", options);
    const toDate = new Date(item.to).toLocaleDateString("de-DE", options);

    return (
      //   bookings.push(item.bookings),
      //   revenue.push(item.revenue),
      //   costs.push(item.costs),
      value.push(item.value), xAxisLabels.push(`${fromDate} - ${toDate}`)
    );
  });

  const options = {
    title: {
      text: props.name,
    },
    series: [
      {
        name: "value",
        data: value,
        color: "#7fbfd6",
      },
      //   {
      //     name: "Revenue",
      //     data: revenue,
      //     visible: isVisible,
      //     color: "#000",
      //   },
      //   {
      //     name: "Costs",
      //     data: costs,
      //     visible: false,
      //     color: "#000",
      //   },
    ],
    chart: {
      type: "spline",
    },
    yAxis: {
      lineWidth: 1,
      lineColor: "#9BA2A6",
      gridLineColor: "#ebeced",
      title: {
        text: null,
      },
      labels: {
        style: {
          color: "#9BA2A6",
          fontSize: "10px",
        },
      },
    },
    xAxis: {
      categories: xAxisLabels,
      crosshair: {
        color: "rgba(243,244,245,.5)",
        dashStyle: "solid",
      },
      lineWidth: 1,
      lineColor: "#9BA2A6",
      gridLineWidth: 1,
      gridLineColor: "#ebeced",
      labels: {
        style: {
          color: "#9BA2A6",
          fontSize: "10px",
        },
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      series: {
        color: "#7fbfd6",
        marker: {
          states: {
            hover: {
              fillColor: "#007fad",
            },
          },
        },
      },
    },
    tooltip: {
      padding: 10,
      style: {
        fontSize: "12px",
        lineHeight: "20px",
      },
      shape: "square", // removes arrow on tooltip
      backgroundColor: "#fff",
      formatter: function () {
        var series = this.series.chart.series,
          x = this.x,
          each = Highcharts.each,
          txt = '<span"><b>' + this.key + "</b></span><br/>";

        each(series, function (serie, i) {
          each(serie.data, function (data, j) {
            if (data.category === x) {
              txt +=
                '<span style="color:' +
                data.series.color +
                '">' +
                data.series.name +
                ": " +
                data.y +
                "</span><br/>";
            }
          });
        });

        return txt;
      },
    },
  };
  return (
    <div>
      <HighchartsReact Highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
