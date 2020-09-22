// import libs and utils
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Menu, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { logoutUserThunk } from "../../../../_modules/user";
// import { asyncState } from "../../../../_lib/reducerUtils";
import { history } from "../../../../_helpers/history";

export const RightMenu = ({ mode, current, onChange }) => {
  const { user } = useSelector((state) => state.user.auth.data) || {
    user: null,
  };
  const dispatch = useDispatch();

  const onLogoutHandler = () => {
    console.log("why twice");
    const { from } = { from: { pathname: "/" } };
    dispatch(logoutUserThunk(null, from.pathname));
  };

  const onClickCartHandler = () => {
    history.push("/user/cart");
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
        <Menu.Item key="cart">
          <Badge count={5}>
            <div onClick={onClickCartHandler}>
              <ShoppingCartOutlined style={{ fontSize: "30px" }} />
            </div>
          </Badge>
        </Menu.Item>
        <Menu.Item key="logout">
          <div onClick={onLogoutHandler}>Logout</div>
        </Menu.Item>
      </Menu>
    );
  }
};
