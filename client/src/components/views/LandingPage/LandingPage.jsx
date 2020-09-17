// import styles
import "./LandingPage.css";

// import libs and utils
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Card, Col, Row, Button } from "antd";
import { RocketFilled } from "@ant-design/icons";
import ProductService from "../../../_services/product.service";
import { alertThunk } from "../../../_modules/alert";
import ImageSlider from "../../../_components/ImageSlider";
import {
  CheckBox,
  RadioBox,
  SearchFeature,
  continents,
  price,
} from "./Sections";
const { Meta } = Card;

const LandingPage = ({ history }) => {
  const [Products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(4);
  const [PostSize, setPostSize] = useState();
  const [Filters, setFilters] = useState({
    continent: [],
    price: [],
  });
  const [SearchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  const getProducts = async (body) => {
    setLoading(true);
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
    setLoading(false);
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

  const handlePrice = (value) => {
    const priceData = price;
    const array = priceData.find((data) => data._id === parseInt(value, 10))
      .array;

    return array;
  };

  const onHandleFilters = (category) => (filters) => {
    const handledFilters = { ...Filters };

    if (category === "price") {
      let priceValues = handlePrice(filters);
      handledFilters[category] = priceValues;
    } else {
      handledFilters[category] = filters;
    }

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

  const onUpdateSearchTerm = (updatedTerm) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: updatedTerm,
    };

    setSkip(0);
    setSearchTerm(updatedTerm);
    getProducts(body);
  };

  const onClickProduct = (product) => (e) => {
    console.log("card");
    history.push(`product/${product._id}`);
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
          <RadioBox
            className="filter"
            list={price}
            handleFilters={onHandleFilters("price")}
          />
        </Col>
      </Row>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature handleSearchFilter={onUpdateSearchTerm} />
      </div>

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
                  onClick={onClickProduct(product)}
                  className="productList__item"
                  hoverable
                  cover={
                    <ImageSlider id={product._id} images={product.images} />
                  }
                >
                  <Meta title={product.title} description={product.price} />
                </Card>
              </Col>
            );
          })}
      </Row>
      {PostSize >= Limit && (
        <div className="showProductButton">
          <Button
            type="primary"
            size="large"
            loading={Loading}
            onClick={onLoadMoreProducts}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
