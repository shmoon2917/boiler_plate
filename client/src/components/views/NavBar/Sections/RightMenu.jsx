import React from 'react';
import { Menu } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUserThunk } from '../../../../_modules/user';
import AuthService from '../../../../_services/auth.service';

export const RightMenu = (props) => {
  // const { data: user } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const user = AuthService.getCurrentUser();

  const onLogoutHandler = () => {
    const from = { from: { pathname: '/' } };
    dispatch(logoutUserThunk({ from }));
  };

  if (!user) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={onLogoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
};
