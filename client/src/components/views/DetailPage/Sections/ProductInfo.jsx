import React from "react";
import { Descriptions, Button } from "antd";
export function ProductInfo({ detail }) {
  const { price, views, sold, description } = detail;

  const onClickHandler = () => {};
  return (
    <div>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price">{price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{sold}</Descriptions.Item>
        <Descriptions.Item label="View">{views}</Descriptions.Item>
        <Descriptions.Item label="Description">{description}</Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          size="large"
          shape="round"
          type="danger"
          onClick={onClickHandler}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
