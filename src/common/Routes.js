import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import Sidebar from "./Sidebar";
import App from "../components/App";
import Report from "../components/Report";
import Deltamapping from "../components/Deltamapping";
import Settings from "../components/Settings";
import Graphs from "../components/Graphs";
import Message from "../components/Message";

export default function Routes() {
  return (
    <>
      <Router>
        <Switch>
          {/* <Route path="/login">
            <App />
          </Route> */}
          <Route path="/deltamapping">
            <Sidebar />
            <Deltamapping />
          </Route>
          <Route path="/graphs">
            <Sidebar />
            <Graphs />
          </Route>
          <Route path="/report">
            <Sidebar />
            <Report />
          </Route>
          <Route path="/settings">
            <Sidebar />
            <Settings />
          </Route>
          <Route path="/message">
            <Sidebar />
            <Message />
          </Route>
          <Redirect from="/" to="/deltamapping" />
        </Switch>
      </Router>
    </>
  );
}
