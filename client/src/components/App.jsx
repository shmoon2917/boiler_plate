import './App.css';
import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { history } from '../_helpers';
import { AuthRoute } from '../_components/AuthRoute';
import { alertActions } from '../_modules/alert';
import { Alert } from 'antd';

// pages for this app
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import ProfilePage from './views/ProfilePage';
import RegisterPage from './views/RegisterPage';
import NavBar from './views/NavBar';

const App = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
    // eslint-disable-next-line
  }, []);

  const onCloseAlert = () => {
    setTimeout(() => dispatch(alertActions.clear()), 300);
  };

  return (
    <div className="App">
      {alert.message && (
        <Alert
          className="App__alert"
          type={alert.type}
          message={alert.message}
          closable
          onClose={onCloseAlert}
        />
      )}
      <Router history={history}>
        <NavBar />
        <div style={{ paddingTop: '69px', minheight: 'calc(100vh -80px' }}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <AuthRoute path="/profile" type="private" component={ProfilePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
