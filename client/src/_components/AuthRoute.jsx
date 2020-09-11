import React from "react";

import { Route, Redirect } from "react-router-dom";

/* type
  private: 로그인 안 했으면 못 들어가는 페이지
  noNeedAfterLogin: 로그인 했으면 못 들어가는 페이지
  admin: 특정 어드민 아니면 못 들어가는 페이지
*/
export const AuthRoute = ({ component: Component, type, ...rest }) => {
  const user = localStorage.getItem("user");

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        } else {
          if (type === "noNeedAfterLogin") {
            return <Redirect to="/" />;
          } else if (type === "admin") {
            if (user.roles === "1") return <Component {...props} />;
            else return <Redirect to="/" />;
          } else {
            return <Component {...props} />;
          }
        }
      }}
    />
  );
};
