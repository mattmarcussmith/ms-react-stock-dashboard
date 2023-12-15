import {useState} from "react";
import Dashboard from './components/Dashboard';
import ThemeContext from "./context/ThemeContext";
import StockContext from "./context/StockContext";
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("FB");


  return (
    <ThemeContext.Provider value={{darkMode, setDarkMode} }>
      <StockContext.Provider value={{stockSymbol, setStockSymbol}}>
      <Dashboard />
      </StockContext.Provider>
    </ThemeContext.Provider>
  
  )
}

export default App