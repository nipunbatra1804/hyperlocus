import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import ExplorePage from "../ExplorePage/ExplorePage";
import AdminPage from "../AdminPage/AdminPage";
import CreatePage from "../CreatePage/CreatePage";
import LoginPage from "../LoginPage/LoginPage";
import EstatePage from "../EstatePage/EstatePage";

export default function AppPage() {
  const [user, setUser] = useState("");
  console.log(user);
  return (
    <BrowserRouter>
      <div>
        <NavBar username={user} />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            path="/explore/:long/:lat/:search"
            render={props => <ExplorePage {...props} />}
          />
          <Route path="/explore" component={ExplorePage} />
          <Route path="/admin" component={AdminPage} />
          <Route
            path="/create/:id"
            render={props => <CreatePage {...props} />}
          />
          <Route path="/create" component={CreatePage} />
          <Route
            path="/login"
            render={props => <LoginPage {...props} updateUsername={setUser} />}
          />
          <Route
            path="/estate/:town"
            render={props => <EstatePage {...props} />}
          />
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
//<Route path="/login" component={LoginPage} />
