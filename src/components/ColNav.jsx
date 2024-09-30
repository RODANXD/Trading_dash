import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { MdDashboard } from "react-icons/md"
import { BsBoxSeamFill } from "react-icons/bs"
import { CiDeliveryTruck } from "react-icons/ci"
import { GrTransaction } from "react-icons/gr"
import { IoIosLogOut } from "react-icons/io"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const NavLink = ({ to, icon: Icon, children, isActive, onClick }) => (
  <Link to={to} onClick={onClick} className="w-full">
    <li className={`hover:text-cyan-500 cursor-pointer flex items-center gap-3 duration-500 p-2 rounded-md ${isActive ? 'bg-cyan-700 text-white' : ''}`}>
      <Icon className="size-5" />
      <span className=" md:inline">{children}</span>
    </li>
  </Link>
)

const NavContent = ({ className = "" }) => {
  const [activeLink, setActiveLink] = useState('/home')

  const handleLinkClick = (path) => {
    setActiveLink(path)
  }
  return(
  <ul className={`flex flex-col items-center gap-9 text-base p-4 ${className}`}>
    <Link to="/">
      <img
        src="https://www.visualcinnamon.com/img/site/visual_cinnamon_logo_512.png"
        alt=""
        className="w-12"
      />
    </Link>
    <div className="w-full h-[2px] bg-[var(--color-border-subtle,#303034)]" />
    <NavLink to="/home" icon={MdDashboard} isActive={activeLink === '/home'} onClick={() => handleLinkClick('/home')}>Dashboard</NavLink>
    <NavLink to="/Strategy" icon={BsBoxSeamFill} isActive={activeLink === '/strategy'} onClick={() => handleLinkClick('/strategy')}>Trade Tool</NavLink>
    <NavLink to="/Strategy2" icon={CiDeliveryTruck} isActive={activeLink === '/strategy2'}
          onClick={() => handleLinkClick('/strategy2')}>Index Scalping</NavLink>
    <NavLink to="/Strategy3" icon={GrTransaction} isActive={activeLink === '/strategy3'}
          onClick={() => handleLinkClick('/strategy3')}>Movementum</NavLink>
  </ul>
  )
}

const ColNav = () => {
  
  return (
    <div className="flex">

      <div className="hidden md:flex flex-col justify-between h-screen w-16 md:w-60">
        <NavContent />
        <div className="flex flex-col md:flex-row justify-evenly text-blue-500 p-7 gap-4 items-center">
          <IoIosLogOut className="size-7 cursor-pointer text-white hover:text-cyan-500 duration-500" />
          <Button className="hidden md:flex text-lg hover:text-cyan-500 cursor-pointer items-center gap-3 duration-500">
            LogOut
          </Button>
        </div>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-black text-white">
          <NavContent className="w-full" />
          <div className="flex justify-center mt-8">
            <Button className="text-lg hover:text-cyan-500 cursor-pointer flex items-center gap-3 duration-500">
              LogOut
            </Button>
          </div>
        </SheetContent>
      </Sheet>

    
    </div>
  )
}

export default ColNav