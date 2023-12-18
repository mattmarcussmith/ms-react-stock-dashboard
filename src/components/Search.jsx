import React, { useContext, useState } from "react";
import { XIcon, SearchIcon } from "@heroicons/react/solid";
import SearchResults from "./SearchResults";
import ThemeContext from "../context/ThemeContext";
import { searchSymbols } from "../api/api";
import StockContext from "../context/StockContext";

const Search = () => {
  const [input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState([]);
  const { darkMode } = useContext(ThemeContext);
  const { setStockSymbol } = useContext(StockContext);

  const updateBestMatches = async () => {
    try {
      if (input) {
        const searchResults = await searchSymbols(input);
        const result = searchResults.result;
        const filteredResult = result.filter(
          (item) => !item.symbol.includes(":") && !item.symbol.includes(".")
        );

        setBestMatches(filteredResult);
      }
    } catch (error) {
      setBestMatches([]);
      console.error(error);
    }
  };

  const clear = () => {
    setInput("");
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key is pressed");
      event.preventDefault();
      updateBestMatches();

      // Assuming you want to select the first item from bestMatches
      if (bestMatches.length > 0) {
        console.log("Setting stock symbol:", bestMatches[0].symbol);
        setStockSymbol(bestMatches[0].symbol);
        clear();
      }
    }
  };

  return (
    <div
      className={`flex items-center my-4 border-2 rounded-md relative z-50 w-96 ${
        darkMode
          ? "bg-gray-900 border-gray-800"
          : " bg-white border-neutral-200"
      }`}
    >
      <input
        type="text"
        value={input}
        className={`w-full px-4 py-2 focus:outline-none rounded-md ${
          darkMode ? "bg-gray-900" : ""
        }`}
        placeholder="Search company by acronym.."
        onChange={(event) => {
          setInput(event.target.value);
        }}
        onKeyUp={handleKeyUp}
      />
      {input && (
        <button onClick={clear}>
          <XIcon className="h-4 w-4 m-1 fill-gray-500" />
        </button>
      )}

      <button
        onClick={() => {
          updateBestMatches();
        }}
        className="h-8 bg-gray-800 rounded-md flex justify-center items-center m-1 p-2"
      >
        <SearchIcon className="h-4 w-4 fill-slate-100" />
      </button>

      {input && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches} />
      ) : null}
    </div>
  );
};

export default Search;
