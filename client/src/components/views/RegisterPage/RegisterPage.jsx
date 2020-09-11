import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUserThunk } from '../../../_modules/user';
import { useLocation } from 'react-router-dom';

const RegisterPage = () => {
  const [inputs, setInputs] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  const location = useLocation();
  const dispatch = useDispatch();

  const { email, name, password, confirmPassword } = inputs;

  const onChangeInput = (e) => {
    const { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert('비밀번호 확인 부탁');
    }

    const body = {
      email,
      password,
      name,
    };

    const { from } = location.state || { from: { pathname: '/' } };

    dispatch(registerUserThunk({ body, from }));
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
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={onChangeInput}
        />
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={onChangeInput}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="패스워드를 입력하세요"
          value={password}
          onChange={onChangeInput}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="패스워드를 다시 한 번 입력하세요"
          value={confirmPassword}
          onChange={onChangeInput}
        />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
