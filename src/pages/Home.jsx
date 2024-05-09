import React from "react";
import Main from "../components/Main";
import Navbar from "../components/Navbar";

const Home = ({ setUrl }) => {
  return (
    <div className="  relative  text-white sm:ml-[89px]  ">
      <Navbar />
      <Main setUrl={setUrl} />
    </div>
  );
};

export default Home;
