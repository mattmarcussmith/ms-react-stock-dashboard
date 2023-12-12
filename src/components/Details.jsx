import React from "react";
import Card from "./Card";

const Details = () => {
  const detailsList = {
    name: "Name",
    country: "Country",
    currency: "Currency",
    exchange: "Exchange",
    ipo: "IPO Date",
    marketCapitalization: "Market Capitalization",
    finnhubIndustry: "Industry",
  };
  const convertMillonToBillion = (number) => {
    return (number / 1000).toFixed(2);
  };
  return (
    <Card>
      <ul className="w-full h-full flex flex-col justify-between divide-y-1">
        {Object.keys(detailsList).map((item) => {
          return (
            <li key={item} className="flex-1 flex justify-between items-center">
              <span>{detailsList}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Details;
