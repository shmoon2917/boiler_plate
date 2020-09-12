import React from "react";
import { Typography, Button, Form, Input } from "antd";
import { Formik, yupToFormErrors } from "formik";
import * as Yup from "yup";
const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
];

export default function UploadProductPage() {
  const onSubmitForm = (values) => {
    console.log("submit", values);
  };
  return (
    <div style={{ minWidth: "700px", margin: "2rem auto" }}>
      <Formik
        initialValues={{ title: "", description: "", price: "", continent: 0 }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("Title is Required"),
          description: Yup.string().required("Description is Required"),
          price: Yup.number().required("price is Required"),
          continent: Yup.number().required("Continent is Required"),
        })}
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
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <Title level={2}>여행 상품 업로드</Title>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Item required label="Title">
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
                <Form.Item required label="Description">
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
                    <div className="input-feedback">{errors.textArea}</div>
                  )}
                </Form.Item>
                <Form.Item required label="Price">
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
                  <select onChange={handleChange} value={values.continent}>
                    {Continents.map((con) => (
                      <option key={con.key} value={con.value}>
                        {con.value}
                      </option>
                    ))}
                  </select>
                </Form.Item>
                <Button
                  onSubmit={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                  style={{ minWidth: "100%" }}
                >
                  확인
                </Button>
              </Form>
            </>
          );
        }}
      </Formik>
    </div>
  );
}
