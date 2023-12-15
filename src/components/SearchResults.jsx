import React, {useContext} from 'react'
import ThemeContext from '../context/ThemeContext';

const SearchResults = ({results}) => {
  const { darkMode} = useContext(ThemeContext);

  return (
   <ul className={`absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll  custom-scrollbar ${darkMode ? "bg-zinc-900 border-gray-800 custom-scrollbar custom-scrollbar-dark" : "bg-white border-neutral-200 custom-scrollbar"}`}>
    {results.map((item) => {
        return(
        <li 
        key={item.symbol} 
        className={`cursor-pointer p-4 m-2 flex justify-between rounded-md ${darkMode ? "hover:bg-emerald-900" : "hover:bg-indigo-200"}`}> 
          <span>{item.symbol}</span>
          <span>{item.description}</span>
        </li>
        )
    })}
   </ul>
  )
}

export default SearchResults