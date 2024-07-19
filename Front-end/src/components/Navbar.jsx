import React, { useState,useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

const Navbar = () => {
  
  const { navBar, NavbarSelect, scrollToTop } = useContext(ShopContext);
  const [select, setSelect] = useState(navBar)

  const handleNavClick = (selection) => {
    setSelect(selection)
    // Save the selected state to localStorage
   
    if (selection !== "select1") {
      scrollToTop("categoryTop");
    }
    NavbarSelect(selection)
    
  }

  return (
    <div className='flex justify-center items-center gap-6 ' >
      <NavLink to={"/"} onClick={() => handleNavClick("select1")}>
        <span className={`${select === "select1" ? 'border-[#e6e1e1] text-[#a8a3a3] border-b-2 shadow-md' : ''} `}>
          Home
        </span>
      </NavLink>
      <NavLink to={"/mens"} onClick={() => handleNavClick("select2")}>
        <span className={`${select === "select2" ? 'border-[#e6e1e1] text-[#a8a3a3] border-b-2 shadow-md' : ''} `}>
          Men's
        </span>
      </NavLink>
      <NavLink to={"/womens"} onClick={() => handleNavClick("select3")}>
        <span className={`${select === "select3" ? 'border-[#e6e1e1] text-[#a8a3a3] border-b-2 shadow-md' : ''} `}>
          Women's
        </span>
      </NavLink>
      <NavLink to={"/kids"} onClick={() => handleNavClick("select4")}>
        <span className={`${select === "select4" ? 'border-[#e6e1e1] text-[#a8a3a3] border-b-2 shadow-md' : ''} `}>
          Kid's
        </span>
      </NavLink>
    </div>
  )
}

export default Navbar
