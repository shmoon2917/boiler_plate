import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../../modules/user";

const LoginPage = ({ history }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user.user);
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

    const body = {
      email,
      password,
    };

    try {
      await dispatch(loginUserThunk(body));
    } catch (e) {
      console.log("에러", e);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        onSubmit={onSubmitForm}
        style={{ display: "flex", flexDirection: "column" }}
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
        {error && <span style={{ color: "red" }}>{error.message}</span>}
        <button>{loading ? <span>spinner</span> : <span>Login</span>}</button>
      </form>
    </div>
  );
};

export default LoginPage;
