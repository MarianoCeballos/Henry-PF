import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import BookDetail from "./components/BookDetail/BookDetail";
import UserDetail from "./components/UserDetail/UserDetail";
import Searching from "./components/Searching/Searching";
import Register from "./components/Register/Register";
import LogIn from "./components/LogIn/LogIn";
import UserMenu from "./components/UserMenu/UserMenu";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer.jsx"
import "./App.sass";

function App() {
  return (
    <div className="App">
      <Nav />
      <Route exact path={"/book/:ID"} component={BookDetail} />
      <Route exact path={"/user/:ID"} component={UserDetail} />
      <Route exact path={"/search"} component={Searching} />
      <Route exact path={"/register"} component={Register} />
      <Route exact path={"/login"} component={LogIn} />
      {/* //to delete */}
      <Route exact path={"/userMenu"} component={UserMenu} />
      <Route exact path={"/profile"} component={Profile} />
      <Route exact path={"/"} component={Home} />
      <Footer />
    </div>
  );
}

export default App;
