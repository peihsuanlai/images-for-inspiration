import React, { useState, useEffect } from "react";
import axios from "axios";
import Picture from "../components/Picture";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const Homepage = () => {
  let [data, setData] = useState([]);
  let [input, setInput] = useState("");
  let [page, setPage] = useState(1);
  let [picture, setPicture] = useState([]);
  //input state更新後按更多圖片就出現相關的更多圖片，但應該是要按下search才對
  let [currentSearch, setCurrentSearch] = useState("");
  const auth = "TVvWSkklstWgfkNfx7qx9vhmyBiSaZh8uTuvO0H5U1YV5znBeta1lZAq";
  const initialURL = "https://api.pexels.com/v1/curated?page=1&per_page=15";
  const searchURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=1`;

  //隨機產生banner圖
  const staticBanner = async () => {
    const totalPages = 100;
    const randomPage = Math.floor(Math.random() * totalPages) + 1;
    const url = `https://api.pexels.com/v1/curated?page=${randomPage}&per_page=1`;
    let result = await axios.get(url, {
      headers: { Authorization: auth },
    }); //result是object，裡面有data(object)，裡面有photos(array)
    setPicture(result.data.photos[0]);
  };

  //依據url去抓資料(初始精選圖or搜尋目標圖)
  const search = async (url) => {
    let result = await axios.get(url, {
      headers: { Authorization: auth },
    }); //把API Key一起發出去
    console.log(result);
    setData(result.data.photos);
    setCurrentSearch(input);
  };

  //按下enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search(searchURL);
    }
  };

  //按下更多圖片時，是否有搜尋目標>>>用確定的url去拿更多圖片
  const morePicture = async () => {
    let newURL;
    setPage(page + 1);
    if (currentSearch === "") {
      newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`;
    } else {
      newURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    }
    let result = await axios.get(newURL, {
      headers: { Authorization: auth },
    });
    const newPictures = result.data.photos.filter((newPicture) => {
      return !data.some(
        (existingPicture) => existingPicture.id === newPicture.id
      );
    });

    setData(data.concat(newPictures));
  };

  //頁面load觸發搜尋精選圖函式
  useEffect(() => {
    search(initialURL);
  }, []);

  //頁面load觸發生成banner圖函式
  useEffect(() => {
    staticBanner();
  }, []);

  return (
    <div>
      <div style={{ minHeight: "100vh" }}>
        <Banner
          pic={picture}
          handleKeyDown={handleKeyDown}
          setInput={setInput}
          searchURL={searchURL}
        />

        <div className="pictures">
          {data &&
            data.map((d) => {
              const { id } = d;
              return <Picture data={d} key={id} />;
            })}
        </div>

        <div className="morePicture">
          <button onClick={morePicture}>Load More</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
