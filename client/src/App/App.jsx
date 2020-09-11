import "./App.css";
import React, { useEffect } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../_helpers";
import LandingPage from "../components/views/LandingPage";
import LoginPage from "../components/views/LoginPage";
import ProfilePage from "../components/views/ProfilePage";
import RegisterPage from "../components/views/RegisterPage";
import NavBar from "../components/views/NavBar";
import { AuthRoute } from "../_components/AuthRoute";
import { alertActions } from "../modules/alert";

const App = () => {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="App">
        {alert.message && <div>{alert.message}</div>}
        <Router history={history}>
          <NavBar />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <AuthRoute path="/profile" type="private" component={ProfilePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>
    </>
  );
};

export default App;
