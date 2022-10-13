import React, { useEffect, useState } from "react";
import axios from "axios";
import s from "./Slider.module.css";
export const Slider = () => {
  const [count, setCount] = useState(0);
  const [lengthImages, setLengthImages] = useState(1);
  const [image, setImage] = useState("");

  useEffect(() => {
    const id = setInterval(() => setCount((prevState) => prevState + 1), 5000);
    if (count > lengthImages - 1) {
      setCount(0);
    }
    axios
      .get(`${process.env.REACT_APP_URL}imageSlider${count}`)
      .then(({ data }) => {
        setLengthImages(data.length);
        setImage(data.image);
      });
    return () => clearInterval(id);
  }, [count, lengthImages]);

  return (
    <div className={s.container}>
      <img key={count} className={s.img} src={image} alt={image} />
    </div>
  );
};
