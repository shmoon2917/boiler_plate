import "./LandingPage.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductService from "../../../_services/product.service";
import { alertThunk } from "../../../_modules/alert";
import { Card, Col, Row } from "antd";
import { RocketFilled } from "@ant-design/icons";
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
    let body = {
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
    let skip = Skip + Limit;

    let body = {
      skip,
      limit: Limit,
      loadMore: true,
      filters: { ...Filters },
    };

    getProducts(body);
    setSkip(skip);
  };

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters,
    };

    getProducts(body);
    setSkip(0);
  };

  const onHandleFilters = (category) => (filters) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    setFilters(newFilters);

    showFilteredResults(newFilters);
  };

  return (
    <div className="pageWrapper" style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel AnyWhere <RocketFilled />
        </h2>
      </div>

      {/* Filter */}
      <CheckBox
        list={continents}
        handleFilters={onHandleFilters("continent")}
      />

      <Row gutter={[16, 16]}>
        {Products &&
          Products.map((product, index) => {
            return (
              <Col key={index} lg={6} md={8} sm={24}>
                <Card hoverable cover={<ImageSlider images={product.images} />}>
                  <Meta title={product.title} description={product.price} />
                </Card>
              </Col>
            );
          })}
      </Row>
      {PostSize >= Limit && (
        <div style={{ textAlign: "center" }}>
          <button onClick={onLoadMoreProducts}>더보기</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
