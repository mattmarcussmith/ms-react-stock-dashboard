import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { fetchEarnings } from "../api/api";

const EarningChart = () => {
  const { darkMode } = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [selectedQuarter, setSelectedQuarter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchEarnings(stockSymbol);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();
  }, [stockSymbol]);

  useEffect(() => {
    if (selectedQuarter !== null) {
      const newData = data.filter((item) => item.quarter === selectedQuarter);
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  }, [selectedQuarter, data]);

  const handleQuarterButtonClick = (quarter) => {
    setSelectedQuarter(quarter);
  };

  return (
    <Card>
      <span
        className={`text-left text-xl mt-2 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        Earnings & Surprises
      </span>
      <div className="flex absolute top-2 right-2 z-40 ">
        <button
          className={`w-12 m-2 h-8 border-1 rounded-md flex items-center cursor-pointer 
            ${
              darkMode
                ? "bg-emerald-600 border-emerald-700 text-gray-100"
                : "bg-gray-300"
            } ${selectedQuarter === 1 ? "bg-sky-400 text-white" : ""} `}
          onClick={() => handleQuarterButtonClick(1)}
        >
          Q1
        </button>
        <button
          className={`w-12 m-2 h-8 border-1 rounded-md flex items-center cursor-pointer ${
            darkMode
              ? "bg-emerald-700 border-emerald-700 text-gray-100"
              : "bg-gray-300 "
          } ${selectedQuarter === 2 ? "bg-sky-400 text-white" : ""}`}
          onClick={() => handleQuarterButtonClick(2)}
        >
          Q2
        </button>
        <button
          className={`w-12 m-2  h-8 border-1 rounded-md flex items-center cursor-pointer ${
            darkMode
              ? "bg-emerald-600 border-emerald-700 text-gray-100"
              : "bg-gray-300 "
          } ${selectedQuarter === 3 ? "bg-sky-400 text-white" : ""}`}
          onClick={() => handleQuarterButtonClick(3)}
        >
          Q3
        </button>
        <button
          className={`w-12 m-2 h-8 border-1 rounded-md flex items-center cursor-pointer ${
            darkMode
              ? "bg-emerald-600 border-emerald-700 text-gray-100"
              : "bg-gray-300"
          } ${selectedQuarter === 4 ? "bg-sky-400 text-white" : ""}`}
          onClick={() => handleQuarterButtonClick(4)}
        >
          Q4
        </button>
      </div>

      <ResponsiveContainer>
        <BarChart
          data={filteredData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="actual" fill="rgba(136, 132, 216, 0.6)" name="Actual" />
          <Bar
            dataKey="estimate"
            fill="rgba(130, 202, 157, 0.6)"
            name="Estimate"
          />
          <Bar dataKey="surprise" fill="rgba(188, 42, 42, 1)" name="Surprise" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default EarningChart;
