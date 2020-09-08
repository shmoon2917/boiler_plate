import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../modules/user/action';

import { withRouter } from 'react-router-dom';

const LoginPage = ({ history }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const { email, password } = inputs;

  const onChangeInput = (e) => {
    const { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    let body = {
      email,
      password,
    };

    const res = await dispatch(loginUser(body));

    if (res.payload.loginSuccess) {
      history.push('/');
    } else {
      alert('Error');
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
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력하세요"
          value={email}
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
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default withRouter(LoginPage);
