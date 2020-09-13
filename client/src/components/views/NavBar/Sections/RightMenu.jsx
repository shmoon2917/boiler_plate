import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { logoutUserThunk } from "../../../../_modules/user";
import { asyncState } from "../../../../_lib/reducerUtils";
import { Link } from "react-router-dom";
import { history } from "../../../../_helpers/history";

export const RightMenu = (props) => {
  const { data: user } =
    useSelector((state) => state.user.login) || asyncState.initial();
  const [current, setCurrent] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      if (location.pathname === "/" && current === "upload") {
        setCurrent("");
      }
    });
  }, []);

  const onClickTab = (e) => {
    setCurrent(e.key);
    if (current === "upload") {
      console.log(props);
    }
  };

  const onLogoutHandler = () => {
    const from = { from: { pathname: "/" } };
    dispatch(logoutUserThunk({ from }));
  };

  if (!user) {
    return (
      <Menu mode={props.mode}>
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
      <Menu selectedKeys={[current]} mode={props.mode}>
        <Menu.Item key="upload">
          <Link to="/product/upload">Upload</Link>
          {/* <span>Upload</span> */}
        </Menu.Item>
        <Menu.Item key="logout">
          <span onClick={onLogoutHandler}>Logout</span>
        </Menu.Item>
      </Menu>
    );
  }
};
