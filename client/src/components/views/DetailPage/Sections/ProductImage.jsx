import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";

export function ProductImage({ images }) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (images) {
      console.log("img", images);
      const imageArray = images.map((item) => ({
        original: `http://localhost:5000/${item}`,
        thumbnail: `http://localhost:5000/${item}`,
      }));

      setImages(imageArray);
    }
  }, [images]);

  return (
    <div>
      <ImageGallery items={Images} />
    </div>
  );
}
