import React from "react";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

const Picture = ({ data }) => {
  return (
    <div className="picture">
      <div className="imageContainer">
        <img src={data.src.large} alt={data.alt} />
        <a target="_blank" href={data.src.large}>
          <SystemUpdateAltIcon className="updateIcon" />
        </a>
      </div>
    </div>
  );
};

export default Picture;
