// import style
import "./FileUpload.css";
// import libs
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

export default function FileUpload({ refreshFunction }) {
  const [Images, setImages] = useState([]);

  const onDropImage = async (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    const response = await axios.post("/api/product/image", formData, config);
    if (response.data.data.success) {
      console.log(response);
      const imageInfo = response.data.data;
      setImages([...Images, imageInfo.filePath]);
      refreshFunction([...Images, imageInfo.filePath]);
    } else {
      console.log(response);
      alert("파일을 저장하는 데 실패했습니다");
    }
  };

  const onDeleteImage = (image) => (e) => {
    const currentIndex = Images.indexOf(image);
    setImages((prevImages) =>
      prevImages.filter((_img, index) => index !== currentIndex)
    );
  };
  return (
    <div className="FileUpload">
      <Dropzone onDrop={onDropImage}>
        {({ getRootProps, getInputProps }) => (
          <div className="FileUpload__dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>
      <div className="FileUpload__displayzone">
        {Images.map((image, index) => (
          <div
            className="FileUpload__imageBox"
            onClick={onDeleteImage(image)}
            key={index}
          >
            <img
              alt="uploadImg"
              className="FileUpload__image"
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
