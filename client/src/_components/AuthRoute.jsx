import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const AuthRoute = ({ component: Component, roles, ...rest }) => {
  const dispatch = useDispatch();

  const user = localStorage.getItem('user');

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        } else {
          // logged in so return component
          return <Component {...props} />;
        }
      }}
    />
  );
};
