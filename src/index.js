import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./index.css";
import "bulma/css/bulma.css";

import App2 from "./App2";
import * as serviceWorker from "./serviceWorker";

function RouterWrapper() {
  return (
    <div style={{ width: "100%" }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/setup/intro" />
          </Route>
          <Route path="/*">
            <App2 />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(<RouterWrapper />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
