import React, { useState, useEffect } from "react";
import { mockHistoricalData } from "../constants/mock";
import Card from "./Card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const EarningChart = () => {
  const data = mockHistoricalData.result;

  const handleQuarterButtonClick = (quarter) => {
    setSelectedQuarter(quarter);
  };
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  
  const filteredQuarter = selectedQuarter
    ? data.filter(item => item.quarter === selectedQuarter)
    : data;

  return (
    <>
      <div>
        <button onClick={() => handleQuarterButtonClick(1)}>Q1</button>
        <button onClick={() => handleQuarterButtonClick(2)}>Q2</button>
        <button onClick={() => handleQuarterButtonClick(3)}>Q3</button>
        <button onClick={() => handleQuarterButtonClick(4)}>Q4</button>
      </div>
      <Card>
        <ResponsiveContainer>
          <AreaChart
            data={filteredQuarter}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.3}
              strokeWidth={0.5}
            />
            <Area
              type="monotone"
              dataKey="estimate"
              stroke="#888"
              fill="#888"
              fillOpacity={0.2}
              strokeWidth={0.5}
            />
            <Area
              type="monotone"
              dataKey="surprise"
              stroke="#bc544b"
              fill="#bc544b"
              fillOpacity={2}
              strokeWidth={0.5}
            />
            <Tooltip />
            <XAxis dataKey="year" />
            <YAxis/>
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
};

export default EarningChart;
