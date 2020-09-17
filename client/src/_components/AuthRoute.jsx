import React, { useEffect, useRef, useState } from "react";

import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncState } from "../_lib/reducerUtils";
import { history } from "../_helpers/history";
import { authUserThunk } from "../_modules/user";

/* type
  private: 로그인 안 했으면 못 들어가는 페이지
  noNeedAfterLogin: 로그인 했으면 못 들어가는 페이지
  admin: 특정 어드민 아니면 못 들어가는 페이지
*/
export const AuthRoute = ({
  component: Component,
  forWho = "user",
  ...rest
}) => {
  const dispatch = useDispatch();
  // const [Loading, setLoading] = useState(false);
  const [NeedRedirect, setNeedRedirect] = useState(false);
  const User = useRef();

  console.log("AuthRoute Hooks 실행");

  useEffect(() => {
    console.log("AuthRoute useEffect 실행");
    getUser();
  }, [history]);

  const getUser = async () => {
    const { isAuth, user } = await dispatch(authUserThunk());
    if (!isAuth) {
      setNeedRedirect(true);
    } else {
      User.current = user;
      if ((forWho === "admin" && user.roles === 0) || forWho === "nonUser") {
        goToLandingPage();
      }
    }
  };

  const goToLandingPage = () => {
    history.push("/");
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log("isNeedRe", NeedRedirect);
        if (NeedRedirect) {
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        } else {
          return <Component {...props} user={User.current} />;
        }
      }}
    />
  );
};
