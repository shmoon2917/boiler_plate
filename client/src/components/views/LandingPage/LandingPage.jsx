import "./LandingPage.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductService from "../../../_services/product.service";
import { alertThunk } from "../../../_modules/alert";
import { Card, Col, Row } from "antd";
import { RocketFilled } from "@ant-design/icons";
import ImageSlider from "../../../_components/ImageSlider";
const { Meta } = Card;

const LandingPage = () => {
  const [Products, setProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const products = await ProductService.getProducts();
      setProducts(products);
    } catch (e) {
      dispatch(alertThunk(e, "error"));
    }
  };

  return (
    <div className="pageWrapper" style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel AnyWhere <RocketFilled />
        </h2>
      </div>
      <Row gutter={[16, 16]}>
        {Products &&
          Products.map((product, index) => {
            return (
              <Col lg={6} md={8} sm={24}>
                <Card
                  key={index}
                  hoverable
                  cover={<ImageSlider images={product.images} />}
                >
                  <Meta title={product.title} description={product.price} />
                </Card>
              </Col>
            );
          })}
      </Row>

      <div style={{ justifyContent: "center" }}>
        <button>더보기</button>
      </div>
    </div>
  );
};

export default LandingPage;
