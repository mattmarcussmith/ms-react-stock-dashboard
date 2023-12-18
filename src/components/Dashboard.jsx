import React, { useContext, useEffect, useState } from "react";

import Header from "./Header";
import Details from "./Details";
import Overview from "./Overview";
import EarningsChart from "./EarningsChart";
import ThemeContext from "../context/ThemeContext";
import StockContext from "../context/StockContext";
import { fetchQuote, fetchStockDetails } from "../api/api";

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);

  const { stockSymbol } = useContext(StockContext);

  const [stockDetails, setStockDetails] = useState({});

  const [quote, setQuote] = useState({});

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };

    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result);
      } catch (error) {
        setQuote({});
        console.log(error);
      }
    };
    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol]);

  return (
    <div
      className={`h-screen grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 grid-rows-8 md:grid-rows-6 xl:grid-rows-5 auto-rows-fr gap-6  p-5 font-quicksand ${
        darkMode ? "bg-neutral-900 text-white" : "bg-sky-100 text-neutral-700"
      }`}
      
    >
      <h1 className="text-3xl">StockShark</h1>

      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header name={stockDetails.name} />
      </div>
      <div className="md:col-span-2 row-span-4">
        <EarningsChart />
      </div>
      <div>
        <Overview
          symbol={stockSymbol}
          price={quote.pc}
          change={quote.d}
          changePercent={quote.dp}
          currency={stockDetails.currency}
        />
      </div>
      <div className="row-span-4 xl:row-span-3">
        <Details details={stockDetails} />
      </div>
    </div>
  );
};

export default Dashboard;
