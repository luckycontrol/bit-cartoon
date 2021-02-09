import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Plotly from "plotly.js";

const FilterPresenter = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    let data = {
      x: [],
      y: [],
      z: [],
    }
    Plotly.d3.csv('https://raw.githubusercontent.com/luckycontrol/bit-cartoon/master/public/colors/5Centimater_crop_BGR.csv', (err, rows) => {
      function unpack(rows, key) {
        return rows.map((row) => {
          return row[key];
        });
      }

      data.x = unpack(rows, 'x');
      data.y = unpack(rows, 'y');
      data.z = unpack(rows, 'z');

      setData(data);
    });
  }, []);

  return (
    <>
      <Plot 
        data={[
          {
            x: data.x, y: data.y, z: data.z,
            type: 'scatter3d',
            mode: 'markers',
            marker: {color: `rgba(${data.x}, ${data.y}, ${data.z}, 0.7)`}
          }
        ]}
        layout={ {width: 1000, height: 1000} }
      />
    </>
  );
};

export default FilterPresenter;
