import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import 'bulma/css/bulma.css';

import App from './App';
import App2 from './App2';
import * as serviceWorker from './serviceWorker';

function RouterWrapper() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route exact path="/v2">
            <App2 />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<RouterWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
