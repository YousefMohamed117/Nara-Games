import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { differenceInYears, format } from "date-fns";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { fetchSearchSample } = useAuth();
  const [loading, setLoading] = useState(false);

  const [game, setGame] = useState(null);
  const Navigate = useNavigate();
  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      Navigate(`/search/${search}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchSearchSample(search);
        setGame(data);
        setLoading(false);
      } catch (error) {
        Navigate("/error");
        setLoading(false);
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [search]);

  return (
    <div className="flex justify-between top-0 navbar w-full h-fit sm:left-[89px] pl-5 fixed py-4 border-b-[.2px] z-10 backdrop-blur-xl">
      <div
        className="gap-2 search flex items-center  text-white relative  sm:w-[350px]  duration-300 sm:focus-within:w-[400px] focus-within:w-[200px] w-[150px] rounded-md px-2 py-1 bg-[#ffffff33]"
        style={{
          textShadow: "0px 0px 6px black",
          border: "1px solid #00000047",
        }}
      >
        <span className="material-symbols-outlined">search</span>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder="Search Game"
          className="bg-transparent relative placeholder:text-white w-full group "
          style={{ textShadow: "0px 0px 6px black" }}
        />
      </div>
      <div className=" absolute backdrop:blur-sm top-[48px]  sm:w-[400px] w-[200px] rounded-md">
        {search &&
          game &&
          game.map((e, i) => (
            <Link key={i} to={`/game/${e.id}`}>
              <div className="flex  py-2 px-1 group  justify-between duration-300 hover:bg-[#212121] bg-[#393939]">
                <p className="text-wrap ">{e.name}</p>
                {e.first_release_date && (
                  <p className="">
                    ({new Date(e.first_release_date * 1000).getFullYear()})
                  </p>
                )}
              </div>
            </Link>
          ))}
      </div>
      <div className="icons flex sm:hidden flex-row-reverse">
        <NavLink to="/">
          <li className="flex  p-3 rounded-md cursor-pointer">
            <span
              className="material-symbols-outlined "
              style={{ textShadow: "0px 0px 6px black" }}
            >
              home
            </span>
          </li>
        </NavLink>
        <NavLink to="/search">
          <li className="flex  p-3 rounded-md cursor-pointer">
            <span
              className="material-symbols-outlined "
              style={{ textShadow: "0px 0px 6px black" }}
            >
              stadia_controller
            </span>
          </li>
        </NavLink>
        <NavLink to="/genres">
          <li className="flex  p-3 rounded-md cursor-pointer">
            <span
              className="material-symbols-outlined "
              style={{ textShadow: "0px 0px 6px black" }}
            >
              communities
            </span>
          </li>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
