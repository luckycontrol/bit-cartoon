import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Plotly from "plotly.js";

export default function PlotPresenter({ csvFile }) {
  const [data, setData] = useState({});

  useEffect(() => {
    let data = {
      x: [],
      y: [],
      z: [],
      color: [],
    };
    Plotly.d3.csv(
      `https://raw.githubusercontent.com/luckycontrol/bit-cartoon/master/public/colors/${csvFile}.csv`,
      (err, rows) => {
        for (let row of rows) {
          data.x.push(row.x);
          data.y.push(row.y);
          data.z.push(row.z);
          data.color.push({ x: row.x, y: row.y, z: row.z });
        }

        setData(data);
      }
    );
  });

  return data.color === undefined ? (
    <></>
  ) : (
    <Plot
      data={[
        {
          x: data.x,
          y: data.y,
          z: data.z,
          type: "scatter3d",
          mode: "markers",
          marker: {
            line: {
              color: data.color.map(
                (color) => `rgba(${color.x}, ${color.y}, ${color.z})`
              ),
              width: 0.5,
              opacity: 0.8,
            },
            color: data.color.map(
              (color) => `rgba(${color.x}, ${color.y}, ${color.z})`
            ),
            size: [1, 5, 12, 20, 25],
          },
          labels: ["red (x)", "green (y)", "blue (z)"],
        },
      ]}
      // layout={{ width: 500, height: 500 }}
    />
  );
}
