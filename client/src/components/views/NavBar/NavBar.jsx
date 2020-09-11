import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "antd";
import AuthService from "../../../services/auth.service";
import { logoutUserThunk } from "../../../modules/user";

const NavBar = () => {
  const user = AuthService.getCurrentUser();
  const dispatch = useDispatch();

  const onClickLogout = async () => {
    const from = { from: { pathname: "/" } };
    dispatch(logoutUserThunk({ from }));
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link>&nbsp;
        {user ? (
          <Button type="primary" onClick={onClickLogout}>
            Sign out
          </Button>
        ) : (
          <Link to="/login">Sign in</Link>
        )}
      </nav>
    </>
  );
};

export default NavBar;
