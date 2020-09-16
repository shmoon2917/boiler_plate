import "./ImageSlider.css";
import React from "react";
import { Carousel } from "antd";
import { history } from "../_helpers/history";

function ImageSlider({ images, id }) {
  // const Arrow = ({ type, style, className, onClick }) => (
  //   <ArrowRightOutlined
  //   type={type}
  //   style={style}
  //   className={className}
  //   onClick={onClick}
  // />
  // );
  const onClickProduct = (e) => {
    history.push(`product/${id}`);
  };

  return (
    <div className="carouselWrapper">
      <Carousel
        autoplay
        // arrows
        // nextArrow={<Arrow type="right" />}
        // prevArrow={<Arrow type="left" />}
      >
        {images &&
          images.map((image, index) => {
            return (
              <div key={index} onClick={onClickProduct}>
                <img src={`http://localhost:5000/${image}`} />
              </div>
            );
          })}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
