import React, { useEffect, useRef, useState } from "react";

import { Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  const isFirstRendered = useRef(true);

  console.log("AuthRoute Hooks 실행");

  useEffect(() => {
    console.log("AuthRoute useEffect 실행");
    getUser();
    // eslint-disable-next-line
  }, [history.location.pathname]);

  useEffect(() => {
    console.log("AuthRoute useEffect 실행2");
    if (!isFirstRendered.current) {
      if (NeedRedirect) setNeedRedirect(false);
    } else {
      isFirstRendered.current = false;
    }
  }, [NeedRedirect]);

  const getUser = async () => {
    const { isAuth, user } = await dispatch(authUserThunk());
    console.log("isAuth And User", isAuth, user, forWho);
    if (!isAuth) {
      console.log("인증 실패다");
      if (!["nonUser", "all"].includes(forWho)) {
        // 유저가 없고, 페이지가 for user 라면
        setNeedRedirect(true);
      }
    } else {
      console.log("인증 성공이다");
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
