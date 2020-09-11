import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from '../../../_modules/user';
import { useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './LoginPage.css';

const { Title } = Typography;

const LoginPage = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user.login);
  const location = useLocation();

  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail = localStorage.getItem('rememberMe')
    ? localStorage.getItem('rememberMe')
    : '';

  // const onChangeInput = (e) => {
  //   const { value, name } = e.target;
  //   setInputs({
  //     ...inputs,
  //     [name]: value,
  //   });
  // };

  const onSubmitForm = (values, { setSubmitting }) => {
    console.log(values);

    // if (email && password) {
    //   // get return url from location state or default to home page
    //   const body = {
    //     email,
    //     password,
    //   };

    //   const { from } = location.state || { from: { pathname: '/' } };
    //   dispatch(loginUserThunk({ body, from }));
    // }
  };

  return (
    <Formik
      initialValues={{ email: initialEmail, password: '' }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is Required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is Required'),
      })}
      onSubmit={onSubmitForm}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <>
            <Title level={2}>Sign In</Title>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>
              <Form.Item required>
                <Input
                  id="email"
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter your email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>
              <Form.Item required>
                <Input
                  id="password"
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {error && (
                <label>
                  <p
                    style={{
                      color: '#ff0000bf',
                      fontSize: '0.7rem',
                      border: '1px solid',
                      padding: '1rem',
                      borderRadius: '10px',
                    }}
                  >
                    {error}
                  </p>
                </label>
              )}
              <Form.Item>
                <Checkbox
                  id="rememberMe"
                  onChange={handleRememberMe}
                  checked={rememberMe}
                >
                  Remember me
                </Checkbox>
                <a
                  className="login-form-forgot"
                  href="/reset_user"
                  style={{ float: 'right' }}
                >
                  forgot password
                </a>
                <div>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    style={{ minWidth: '100%' }}
                    disabled={isSubmitting}
                  >
                    Log in
                  </Button>
                </div>
                Or <a href="/register">register now!</a>
              </Form.Item>
            </form>
          </>
        );
      }}
    </Formik>
  );
};

export default LoginPage;

{
  /* <form
  onSubmit={onSubmitForm}
  style={{ display: 'flex', flexDirection: 'column' }}
>
  <label htmlFor="email">Email</label>
  <input
    type="email"
    name="email"
    placeholder="이메일을 입력하세요"
    value={email}
    onChange={onChangeInput}
  />
  <label htmlFor="password">Password</label>
  <input
    type="password"
    name="password"
    placeholder="패스워드를 입력하세요"
    value={password}
    onChange={onChangeInput}
  />
  <br />
  {error && <span style={{ color: 'red' }}>{error}</span>}
  <button>{loading ? 'spinner' : 'Login'}</button>
</form>; */
}
