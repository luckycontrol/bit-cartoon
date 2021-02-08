import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Plotly from "plotly.js";

const FilterPresenter = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Plotly.d3.csv('https://raw.githubusercontent.com/luckycontrol/bit-cartoon/master/public/colors/5Centimater_crop_BGR.csv', (err, rows) => {
      console.log(rows)
    })
  }, []);

  return (
    <></>
  );
};

export default FilterPresenter;
