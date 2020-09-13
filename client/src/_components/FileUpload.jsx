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
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={onDropImage}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PlusOutlined style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: " scroll",
        }}
      >
        {Images.map((image, index) => (
          <div onClick={onDeleteImage(image)} key={index}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
