import React, { useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import AuthService from "./services/auth.service";
import { useDispatch } from "react-redux";
import { keepUserLoggedIn } from "./modules/user";
import NavBar from "./components/views/NavBar/NavBar";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("app start");
    const user = AuthService.getCurrentUser();
    if (user) {
      dispatch(keepUserLoggedIn(user));
    }
  }, [dispatch]);
  return (
    <>
      <div className="App">
        <NavBar />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </div>
    </>
  );
};

export default App;
