import './App.css';
import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers';
import LandingPage from '../components/views/LandingPage/LandingPage';
import LoginPage from '../components/views/LoginPage/LoginPage';
import RegisterPage from '../components/views/RegisterPage/RegisterPage';
import AuthService from '../services/auth.service';

import { keepUserLoggedIn } from '../modules/user';
import authGuard from '../hoc/authGuard';
import { PrivateRoute } from '../_components/PrivateRoute';
import { alertActions } from '../modules/alert';

const App = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    // const user = AuthService.getCurrentUser();
    // if (user) {
    //   dispatch(keepUserLoggedIn(user));
    // }

    history.listen((location, action) => {
      // clear alert on location change
      console.log("I'm listening", location, action);
      dispatch(alertActions.clear());
    });
  }, []);

  return (
    <>
      <div className="App">
        {alert.message && <div>{alert.message}</div>}
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/" component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            {/* <Route exact path="/login" component={authGuard(LoginPage, 1)} />
            <Route
              exact
              path="/register"
              component={authGuard(RegisterPage, 1)}
            /> */}
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;
