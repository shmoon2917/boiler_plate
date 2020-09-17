import "./ImageSlider.css";
import React, { useEffect, useRef } from "react";
import { Carousel } from "antd";
import { history } from "../_helpers/history";

function ImageSlider({ images, id, bubbling }) {
  const carousel = useRef();

  useEffect(() => {
    const buttons = carousel.current.getElementsByTagName("button");
    Array.from(buttons).forEach((button) => {
      button.addEventListener("click", onClickDot);
    });
  }, []);

  const onClickDot = () => {
    console.log("dot");
  };

  // const Arrow = ({ type, style, className, onClick }) => (
  //   <ArrowRightOutlined
  //   type={type}
  //   style={style}
  //   className={className}
  //   onClick={onClick}
  // />
  // );
  const onClickProduct = (e) => {
    console.log("image");
    // history.push(`product/${id}`);
  };

  return (
    <div className="carouselWrapper" ref={carousel}>
      <Carousel
        autoplay

        // arrows
        // nextArrow={<Arrow type="right" />}
        // prevArrow={<Arrow type="left" />}
      >
        {images &&
          images.map((image, index) => {
            return (
              <div key={index}>
                <img src={`http://localhost:5000/${image}`} />
              </div>
            );
          })}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
