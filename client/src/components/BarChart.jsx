import React from "react";
import styled from "styled-components";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
} from "react-vis";

const ChartContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
`;

const BarChart = ({ data }) => {
  const chartData = Object.entries(data).map(([range, count]) => ({
    x: range,
    y: count,
  }));

  return (
    <ChartContainer>
      <h2>Price Range Distribution</h2>
      <XYPlot
        width={500}
        height={300}
        xType="ordinal"
        stackBy="y"
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: "10px",
        }}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries data={chartData} />
      </XYPlot>
    </ChartContainer>
  );
};

export default BarChart;
