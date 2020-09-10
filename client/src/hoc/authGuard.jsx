import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../modules/user/actions";

const AuthenticationCheck = (SpecificComponent, option, adminRoute = null) => {
  // null =>  아무나
  // true => 로그인한 유저만 출입가능 페이지
  // false => 로그인한 유저는 출입 불가능 페이지
  return (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(authUser()).then((res) => {
        console.log(res);

        // 로그인하지않은상태
        if (!res.payload.isAuth) {
          if (option) {
            props.history.push("/login");
          }
        } else {
          if (adminRoute && !res.payload.isAdmin) {
            props.history.push("/");
          } else if (option === false) {
            props.history.push("/");
          }
        }
      });
    }, [dispatch]);

    return <SpecificComponent />;
  };
};
