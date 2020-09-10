import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { setError } from "../../../modules/error";
import AuthService from "../../../services/auth.service";
import { clearUser } from "../../../modules/user";

const NavBar = ({ history }) => {
  const { data: currentUser } = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const onClickLogout = async () => {
    try {
      await AuthService.logout();
      dispatch(clearUser());
      history.push("/");
    } catch (error) {
      dispatch(setError(error));
    }
  };

  return (
    <>
      <nav>
        <Link to="/">Home</Link>&nbsp;
        {currentUser ? (
          <button onClick={onClickLogout}>Sign out</button>
        ) : (
          <>
            <Link to="/login">Sign in</Link>&nbsp;
            <Link to="/register">Sign up</Link>
          </>
        )}
      </nav>
    </>
  );
};

export default withRouter(NavBar);
