import React, { useState } from "react";
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
// ... (imports)

const EarningsChart = () => {
  const data = mockHistoricalData.result;

  const flattenedData = data.map((item) => item).flat();
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  
  const filteredData = selectedQuarter
    ? flattenedData.filter((item) => item.quarter === selectedQuarter)
    : flattenedData;

  return (
    <Card>
      <div className="flex justify-center space-x-4">
        {/* Buttons for each quarter */}
        {[1, 2, 3, 4].map((quarter) => (
          <button
            key={quarter}
            onClick={() => setSelectedQuarter(quarter)}
            className={`px-4 py-2 rounded-md ${
              selectedQuarter === quarter
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            Q{quarter}
          </button>
        ))}
      </div>
      <ResponsiveContainer>
        <h2 className="flex justify-center text-neutral-500 text-lg">
          Earnings & Surprises
        </h2>
        <AreaChart
          data={filteredData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="rgb(199 210 254)" stopOpacity={0} />
            </linearGradient>
          </defs>

          {filteredData.map((item, index) => (
            <React.Fragment key={index}>
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#82ca9d"
                fillOpacity={1}
                strokeWidth={1.5}
                fill="url(#chartColor)"
              />
              <Area
                type="monotone"
                dataKey="estimate"
                stroke="#000"
                fillOpacity={1}
                strokeWidth={1.5}
                fill="url(#chartColor)"
              />
              <Area
                type="monotone"
                dataKey="surprise"
                stroke="#000"
                fillOpacity={1}
                strokeWidth={2.5}
                fill="url(#chartColor)"
              />
            </React.Fragment>
          ))}
          <Tooltip />
          <XAxis dataKey="period" />
          <YAxis />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default EarningsChart;
