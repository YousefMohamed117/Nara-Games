import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="text-left sidebar  pt-5 sm:px-5 border-r-[.2px] fixed h-screen hidden sm:block">
      <ul className="">
        <li className="flex logo ml-3 w-7">
          <img src="./img/logo.png" alt="" />
        </li>
        <NavLink to='/'>  
          <li className="flex  mt-5 p-3 rounded-md cursor-pointer">
            <span
              className="material-symbols-outlined "
              style={{ textShadow: "0px 0px 6px black" }}
            >
              home
            </span>
          </li>
        </NavLink>
        <NavLink to='/search'>
          <li className="flex  mt-5 p-3 rounded-md cursor-pointer">
            <span
              className="material-symbols-outlined "
              style={{ textShadow: "0px 0px 6px black" }}
            >
              stadia_controller
            </span>
          </li>
        </NavLink>
        <NavLink to='/genres'>
          <li className="flex  mt-5 p-3 rounded-md cursor-pointer">
            <span
              className="material-symbols-outlined "
              style={{ textShadow: "0px 0px 6px black" }}
            >
              communities
            </span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
