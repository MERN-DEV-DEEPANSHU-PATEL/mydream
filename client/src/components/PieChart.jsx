import React from "react";
import styled from "styled-components";
import { RadialChart } from "react-vis";

const ChartContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
`;

const PieChart = ({ data }) => {
  const chartData = Object.entries(data).map(([category, count]) => ({
    angle: count,
    label: category,
  }));

  return (
    <ChartContainer>
      <h2>Category Distribution</h2>
      <RadialChart
        data={chartData}
        width={300}
        height={300}
        padAngle={0.04}
        labelsAbsolute={true}
        labelsStyle={{
          fontSize: 12,
          fontWeight: "bold",
        }}
        showLabels={true}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </ChartContainer>
  );
};

export default PieChart;
