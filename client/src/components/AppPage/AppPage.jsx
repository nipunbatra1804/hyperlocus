import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import ExplorePage from "../ExplorePage/ExplorePage";
import AdminPage from "../AdminPage/AdminPage";

export default function AppPage() {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            path="/explore/:long/:lat/:search"
            render={props => <ExplorePage {...props} />}
          />
          <Route path="/explore" component={ExplorePage} />
          <Route path="/admin" component={AdminPage} />
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
