import "./App.css";
import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../_helpers";
import { AuthRoute } from "../_components/AuthRoute";
import { alertActions } from "../_modules/alert";
import { Alert } from "antd";
import AuthService from "../_services/auth.service";
import { userActions } from "../_modules/user";

// pages for this app
import LandingPage from "./views/LandingPage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import UploadProductPage from "./views/UploadProductPage";
import NavBar from "./views/NavBar";

const App = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const onCloseAlert = () => {
    setTimeout(() => dispatch(alertActions.clear()), 300);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      dispatch(userActions.checkUserIsLoggedIn(user));
    }
    // eslint-disable-next-line
  }, []);

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
        <div
          className="App__content"
          style={{ paddingTop: "69px", minheight: "calc(100vh -80px)" }}
        >
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <AuthRoute path="/product/upload" component={UploadProductPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
