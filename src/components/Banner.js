import React from "react";
import Search from "./Search";

const Banner = ({ pic, handleKeyDown, setInput }) => {
  if (!pic || !pic.src || !pic.src.landscape) {
    return null; // Render nothing if the necessary properties are undefined
  }

  return (
    <div
      style={{ backgroundImage: `url(${pic.src.landscape})` }}
      className="bg"
    >
      <div className="filter"></div>
      <h2>Inspiration Comes from Life</h2>
      <Search handleKeyDown={handleKeyDown} setInput={setInput} />
    </div>
  );
};

export default Banner;
