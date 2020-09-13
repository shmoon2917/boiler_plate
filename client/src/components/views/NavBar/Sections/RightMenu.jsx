// import libs and utils
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { logoutUserThunk } from "../../../../_modules/user";
import { asyncState } from "../../../../_lib/reducerUtils";

export const RightMenu = ({ mode, current, onChange }) => {
  const user =
    useSelector((state) => state.user.login.data) || asyncState.initial().data;
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    const from = { from: { pathname: "/" } };
    dispatch(logoutUserThunk({ from }));
  };

  if (!user) {
    return (
      <Menu onClick={onChange} selectedKeys={[current]} mode={mode}>
        <Menu.Item key="mail">
          <Link to="/login">Sign In</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/register">SignUp</Link>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu onClick={onChange} selectedKeys={[current]} mode={mode}>
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
