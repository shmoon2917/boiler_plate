import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk, registerUserThunk } from '../../../modules/user';
import { useLocation } from 'react-router-dom';

const LoginPage = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.authentication.login);
  const { email, password } = inputs;
  const location = useLocation();

  const onChangeInput = (e) => {
    const { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (email && password) {
      // get return url from location state or default to home page
      const body = {
        email,
        password,
      };

      console.log(location);
      const { from } = location.state || { from: { pathname: '/' } };
      dispatch(loginUserThunk(body, from));
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
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
        <button>{loading ? <span>spinner</span> : <span>Login</span>}</button>
      </form>
    </div>
  );
};

export default LoginPage;
