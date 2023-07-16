import React from "react";
import SearchIcon from "@mui/icons-material/Search";
// import axios from "axios";

const Search = ({ setInput, handleKeyDown }) => {
  //將input state改成輸入的值
  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search">
      <label for="search">
        <SearchIcon className="icon" />
      </label>
      <input
        id="search"
        type="text"
        onChange={inputHandler}
        onKeyDown={handleKeyDown}
        className="input"
        placeholder="Search high-resolution images"
      />
    </div>
  );
};

export default Search;
