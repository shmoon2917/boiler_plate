// import styles
import "./LandingPage.css";

// import libs and utils
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Card, Col, Row } from "antd";
import { RocketFilled } from "@ant-design/icons";
import ProductService from "../../../_services/product.service";
import { alertThunk } from "../../../_modules/alert";
import ImageSlider from "../../../_components/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import { continents } from "./Sections/Datas";
const { Meta } = Card;

const LandingPage = () => {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(4);
  const [PostSize, setPostSize] = useState();
  const [Filters, setFilters] = useState({
    continent: [],
    price: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  const getProducts = async (body) => {
    try {
      const response = await ProductService.getProducts(body);

      if (body.loadMore) {
        setProducts((prevState) => prevState.concat(response.productsInfo));
      } else {
        setProducts(response.productsInfo);
      }
      setPostSize(response.postSize);
    } catch (e) {
      dispatch(alertThunk(e, "error"));
    }
  };

  const onLoadMoreProducts = () => {
    const skip = Skip + Limit;

    let body = {
      skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
    };

    setSkip(skip);
    getProducts(body);
  };

  const onHandleFilters = (category) => (filters) => {
    const handledFilters = {
      ...Filters,
      [category]: filters,
    };

    setFilters(handledFilters);

    showFilteredResults(handledFilters);
  };

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters,
    };

    setSkip(0);
    getProducts(body);
  };

  return (
    <div className="pageWrapper">
      <div className="title">
        <h2>
          Let's Travel AnyWhere <RocketFilled />
        </h2>
      </div>

      <Row gutter={[16, 16]}>
        <Col lg={12} md={12} sm={24} className="">
          <CheckBox
            className="filter"
            list={continents}
            handleFilters={onHandleFilters("continent")}
          />
        </Col>
        <Col lg={12} md={12} sm={24}>
          hello
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="productList">
        {Products &&
          Products.map((product, index) => {
            return (
              <Col
                key={index}
                lg={6}
                md={8}
                sm={24}
                className="productList__row"
              >
                <Card
                  className="productList__item"
                  hoverable
                  cover={<ImageSlider images={product.images} />}
                >
                  <Meta title={product.title} description={product.price} />
                </Card>
              </Col>
            );
          })}
      </Row>
      {PostSize >= Limit && (
        <div className="showProductButton">
          <button onClick={onLoadMoreProducts}>더보기</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
