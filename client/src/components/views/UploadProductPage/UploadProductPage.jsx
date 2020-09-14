// import css
import "./UploadProductPage.css";
// import lib
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Typography, Button, Form, Input, Select } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import ProductService from "../../../_services/product.service";
import { alertThunk } from "../../../_modules/alert";

// import component
import FileUpload from "../../../_components/FileUpload";

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

// constant values
const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
];

export default function UploadProductPage({ user, history }) {
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);
  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    description: "",
    price: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    description: Yup.string().required("Description is Required"),
    price: Yup.number().required("price is Required"),
  });

  const onChangeContinent = (value) => {
    setContinent(value);
  };

  const onUpdateImages = (newImages) => {
    setImages(newImages);
  };

  const onSubmitForm = async (values, { setSubmitting }) => {
    const { title, description, price } = values;

    const body = {
      writer: user._id,
      title,
      description,
      price,
      images: Images,
      continent: Continent,
    };

    try {
      const response = await ProductService.registerProduct(body);
      // dispatch(alertThunk(response.message, 'success'));
      history.push("/");
    } catch (e) {
      dispatch(alertThunk(e, "error"));
      setSubmitting(false);
    }
  };

  return (
    <div className="pageWrapper">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitForm}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <>
              <div className="pageTitle">
                <Title level={2}>여행 상품 업로드</Title>
              </div>
              <Form
                className="pageForm"
                onSubmit={handleSubmit}
                {...formItemLayout}
              >
                <FileUpload refreshFunction={onUpdateImages} />
                <Form.Item
                  className="pageForm__Item"
                  required
                  label="Title"
                  labelAlign="left"
                >
                  <Input
                    id="title"
                    placeholder="Enter product title"
                    type="text"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.title && touched.title
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.title && touched.title && (
                    <div className="input-feedback">{errors.title}</div>
                  )}
                </Form.Item>
                <Form.Item
                  className="pageForm__Item"
                  required
                  label="Description"
                  labelAlign="left"
                >
                  <TextArea
                    id="description"
                    placeholder="Enter product description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.description && touched.description
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.description && touched.description && (
                    <div className="input-feedback">{errors.description}</div>
                  )}
                </Form.Item>
                <Form.Item
                  className="pageForm__Item"
                  required
                  label="Price"
                  labelAlign="left"
                >
                  <Input
                    id="price"
                    placeholder="Enter product price"
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.price && touched.price
                        ? "text-input error"
                        : "text-input"
                    }
                  />
                  {errors.price && touched.price && (
                    <div className="input-feedback">{errors.price}</div>
                  )}
                  <br />
                  <br />
                  <Select onChange={onChangeContinent} value={Continent}>
                    {Continents.map((item) => (
                      <Option key={item.key} value={item.key}>
                        {item.value}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item className="pageForm__Item">
                  <Button
                    onClick={handleSubmit}
                    type="primary"
                    disabled={isSubmitting}
                    style={{ minWidth: "100%" }}
                  >
                    확인
                  </Button>
                </Form.Item>
              </Form>
            </>
          );
        }}
      </Formik>
    </div>
  );
}
