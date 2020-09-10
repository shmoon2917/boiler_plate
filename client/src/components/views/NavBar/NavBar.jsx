import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setError } from "../../../modules/error";
import AuthService from "../../../services/auth.service";
import { clearUser } from "../../../modules/user";

const NavBar = ({ history }) => {
  const { data: currentUser } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const onClickLogout = async () => {
    try {
      const a = await AuthService.logout();
      dispatch(clearUser());
      history.push("/");
    } catch (error) {
      dispatch(setError(error));
    }
  };

  return (
    <>
      <Link to="/">Home</Link>&nbsp;
      {!currentUser && <Link to="/login">Sign in</Link>}&nbsp;
      {!currentUser && <Link to="/register">Sign up</Link>}
      <button onClick={onClickLogout}>Sign out</button>
    </>
  );
};

export default NavBar;
