import React from "react";
import { Descriptions, Button } from "antd";
import { useDispatch } from "react-redux";
import { addToCartThunk } from "../../../../_modules/user";
export function ProductInfo({ detail }) {
  const dispatch = useDispatch();
  const { price, views, sold, description } = detail;

  const onClickHandler = () => {
    const from = "/";
    dispatch(addToCartThunk({ body: detail._id, from }));
  };
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
