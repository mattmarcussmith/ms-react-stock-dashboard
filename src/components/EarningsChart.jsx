import React, { useState, useContext } from "react";
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
import ThemeContext from "../context/ThemeContext";

const EarningChart = () => {
  const data = mockHistoricalData.result;

  const { darkMode} = useContext(ThemeContext);

  const handleQuarterButtonClick = (quarter) => {
    setSelectedQuarter(quarter);
  };
  const [selectedQuarter, setSelectedQuarter] = useState(null);

  const filteredQuarter = selectedQuarter
    ? data.filter((item) => item.quarter === selectedQuarter)
    : data;

  return (
  
      <Card >
         <span className={`text-left text-xl mt-2 ${darkMode ? "text-white" : "text-black"}`}>Earnings & Surprises</span>
        <div className="flex absolute top-2 right-2 z-40 ">
          <button
            className={`w-12 m-2 h-8 border-1 rounded-md flex items-center cursor-pointer 
            ${darkMode ? "bg-emerald-600 border-emerald-700 text-gray-100" : "bg-gray-300"
            } ${selectedQuarter === 1 ? "bg-sky-400 text-white" : ""} `}
            onClick={() => handleQuarterButtonClick(1)}
          >
            Q1
          </button>
          <button
            className={`w-12 m-2 h-8 border-1 rounded-md flex items-center cursor-pointer ${
              darkMode
                ? "bg-emerald-700 border-emerald-700 text-gray-100" : "bg-gray-300 "
            } ${selectedQuarter === 2 ? "bg-sky-400 text-white" : ""}`}
            onClick={() => handleQuarterButtonClick(2)}
          >
            Q2
          </button>
          <button
            className={`w-12 m-2  h-8 border-1 rounded-md flex items-center cursor-pointer ${
              darkMode
                ? "bg-emerald-600 border-emerald-700 text-gray-100" : "bg-gray-300 "
            } ${selectedQuarter === 3 ? "bg-sky-400 text-white" : ""}`}
            onClick={() => handleQuarterButtonClick(3)}
          >
            Q3
          </button>
          <button
            className={`w-12 m-2 h-8 border-1 rounded-md flex items-center cursor-pointer ${
              darkMode
                ? "bg-emerald-600 border-emerald-700 text-gray-100" : "bg-gray-300"
            } ${selectedQuarter === 4 ? "bg-sky-400 text-white" : ""}`}
            onClick={() => handleQuarterButtonClick(4)}
          >
            Q4
          </button>
      
        </div>
       
        <ResponsiveContainer >
       
          <AreaChart 
           
            data={filteredQuarter}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
             <Tooltip  
            contentStyle={darkMode ? {backgroundColor:"#023020" } : null}
            itemStyle={darkMode ? {color: "#818cf8" } : null}
            
            />
            
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#24f"
              fill="url(#chartColor)"
              fillOpacity={0.3}
              strokeWidth={0.5}
            />
            <Area
              type="monotone"
              dataKey="estimate"
              stroke="#000"
              fill="url(#chartColor)"
              fillOpacity={0.2}
              strokeWidth={0.5}
            />
            <Area
              type="monotone"
              dataKey="surprise"
              stroke="#bc544b"
              fill="url(#chartColor)"
              fillOpacity={2}
              strokeWidth={0.5}
            />
            <defs>
              <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={darkMode ? "#0e6b0e" : "#000"}
                  stopOpacity={0.8}
                />
                <stop offset="95%" stopColor={darkMode ? "#2b5329" : "rgb(199 210 254)"} stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="period" />
            <YAxis domain={["dataMin", "dataMax"]} />
           
          </AreaChart>
        </ResponsiveContainer>
      </Card>

  );
};

export default EarningChart;
