import React from "react";
import { Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { logoutUserThunk } from "../../../../_modules/user";
import { asyncState } from "../../../../_lib/reducerUtils";
import { Link } from "react-router-dom";

export const RightMenu = (props) => {
  const { data: user } =
    useSelector((state) => state.user.login) || asyncState.initial();

  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    const from = { from: { pathname: "/" } };
    dispatch(logoutUserThunk({ from }));
  };

  if (!user) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="upload">
          <Link to="/product/upload">Upload</Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <span onClick={onLogoutHandler}>Logout</span>
        </Menu.Item>
      </Menu>
    );
  }
};
