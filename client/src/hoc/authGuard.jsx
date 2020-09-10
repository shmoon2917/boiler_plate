import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authUserThunk } from '../modules/user';

export default (SpecificComponent, route) => {
  const AuthenticationGuard = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(authUserThunk()).then(
        (response) => {
          console.log('authCheck', response);

          if (response) {
            if (!response.isAuth) {
              props.history.push('/login');
            } else if (route === 1) {
              // 로그인된 사용자가 갈 수 없는 사이트
              props.history.push('/');
            }
          }

          // else {
          //   if (adminRoute && !res.payload.isAdmin) {
          //     props.history.push('/');
          //   } else if (option === false) {
          //     props.history.push('/');
          //   }
          // }
        },
        (err) => {}
      );
    }, [dispatch]);

    return <SpecificComponent />;
  };

  return AuthenticationGuard;
};
