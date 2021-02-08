import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import Plotly from "plotly.js";

const FilterPresenter = () => {
  

  useEffect(() => {
    Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/3d-scatter.csv', (err, rows) => {
      rows.map((row) => console.log(row.x1))
    })
  }, []);

  return (
    <></>
  );
};

export default FilterPresenter;
