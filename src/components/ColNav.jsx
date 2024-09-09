import React from "react";
import { Link } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { BsBoxSeamFill } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { GrTransaction } from "react-icons/gr";
import { FaLightbulb } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { Button } from "@/components/ui/button"


import Headers from './Headers'


const ColNav = () => {
  return (
    <>
      <div className="main flex flex-row gap-3">
        <div className=" flex flex-col bg-black justify-between h-screen">
          <ul className="flex flex-col items-center gap-9 text-base p-5 w-60">
            <Link to="/"><img
              src="https://www.visualcinnamon.com/img/site/visual_cinnamon_logo_512.png"
              alt=""
              className="w-12"
            /></Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 120 2"
              height="2"
              width="120"
              fill="var(--color-border-subtle, #303034)"
            >
              <path d="M0 0h120v2H0z"></path>
            </svg>

            <Link to="/home">
              <li className="hover:text-cyan-500 cursor-pointer flex items-center gap-3 duration-500">
                {" "}
                <MdDashboard className=" size-5" />
                Dashboard
              </li>
            </Link>
            <Link to = "/Strategy">
              <li className="hover:text-cyan-500 cursor-pointer capitalize flex items-center gap-3 duration-500">
                {" "}
                <BsBoxSeamFill className=" size-5" />
                Trade Tool
              </li>
            </Link>
            <Link to = "/Strategy2">
              <li className="hover:text-cyan-500 cursor-pointer capitalize flex items-center gap-3 duration-500">
                {" "}
                <CiDeliveryTruck className=" size-5" />
                index scalping
              </li>
            </Link>
            <Link to = "/Strategy3">
              <li className="hover:text-cyan-500 cursor-pointer capitalize flex items-center gap-3 duration-500">
                <GrTransaction className=" size-5" />
                movementum
              </li>
            </Link>
          </ul>
          <div className="flex flex-row justify-evenly text-blue-500 p-7 gap-4 items-center">
          
            <IoIosLogOut className="  size-7 cursor-pointer text-white hover:text-cyan-500 duration-500" />
            <Button className="text-lg hover:text-cyan-500 cursor-pointer flex items-center gap-3 duration-500">LogOut</Button>
            
            
          </div>
        </div>
        {/* <div><Header/></div> */}
      </div>
    </>
  );
};

export default ColNav;
