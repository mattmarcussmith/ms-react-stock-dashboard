import React, { useContext } from 'react'
import Search from './Search';
import ThemeIcon from './ThemeIcon';
import ThemeContext from '../context/ThemeContext';
const Header = ({name}) => {

  const {darkMode} = useContext(ThemeContext);
  return (
    <>
      <div className='xl:px-32'>
      <h1 className={`text-3xl ${darkMode ? "text-white" : ""}`}>{name}</h1>
      <Search />
      </div>
      <ThemeIcon />
    </>
  )
}

export default Header