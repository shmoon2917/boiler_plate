// import style
import "./App.css";

// import libs and utils
import React, { useEffect, useRef } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../_helpers";
import { AuthRoute } from "../_components/AuthRoute";
import { alertActions } from "../_modules/alert";
import { Alert, Layout } from "antd";
import AuthService from "../_services/auth.service";
import { userActions } from "../_modules/user";

// pages for this app
import LandingPage from "./views/LandingPage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import UploadProductPage from "./views/UploadProductPage";
import NavBar from "./views/NavBar";

const { Header, Content, Footer } = Layout;

const App = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const timeout = useRef();

  const onCloseAlert = () => {
    timeout = setTimeout(() => dispatch(alertActions.clear()), 300);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      dispatch(userActions.checkUserIsLoggedIn(user));
    }
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Layout className="App">
      {alert.message && (
        <Alert
          className="alert"
          type={alert.type}
          message={alert.message}
          closable
          onClose={onCloseAlert}
        />
      )}
      <Router history={history}>
        <Header className="header">
          <NavBar />
        </Header>
        <Content className="content">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <AuthRoute path="/product/upload" component={UploadProductPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </Content>
      </Router>
      <Footer className="footer">Shop App ©2020 Created by Sangho Moon</Footer>
    </Layout>
  );
};

export default App;
