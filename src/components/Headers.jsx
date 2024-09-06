import React from "react";
import { TfiSearch } from "react-icons/tfi";
import { LuMessagesSquare } from "react-icons/lu";
import { VscBellDot } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
const Headers = () => {
  return (
    <>
      <div className=" bg-black flex justify-between items-center p-2">
        <div className="searchbar flex items-center gap-4 p-2 w-full">
          <input
            type="search"
            placeholder="Search"
            className=" text-sm h-10 focus:outline-none active:outline-none w-[23rem] rounded-lg border border-slate-500 p-2"
          />
          <TfiSearch className=" size-6 cursor-pointer" />
        </div>
        <div className="sidebutton flex items-center justify-evenly gap-6">
          <LuMessagesSquare className=" size-6 cursor-pointer"/>
          <VscBellDot className=" size-6 cursor-pointer"/>
          <CgProfile className=" size-6 cursor-pointer"/>
        </div>
      </div>
    </>
  );
};

export default Headers;