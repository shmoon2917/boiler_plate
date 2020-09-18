import "./DetailPage.css";
import React, { useEffect, useState } from "react";
import ProductService from "../../../_services/product.service";
import { ProductInfo, ProductImage } from "./Sections";
import { Row, Col } from "antd";
function DetailPage({ match }) {
  const [Product, setProduct] = useState({});

  useEffect(() => {
    const productId = match.params.id;
    getProductsById(productId);
    // eslint-disable-next-line
  }, []);

  const getProductsById = async (id) => {
    try {
      const product = await ProductService.getProductsById(id);
      setProduct(product[0]);
    } catch (e) {
      alert("상세 정보 가져오기를 실패했습니다");
    }
  };

  return (
    <div className="pageWrapper">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          <ProductImage images={Product.images} />
        </Col>
        <Col lg={12} sm={24}>
          <ProductInfo detail={Product} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailPage;
