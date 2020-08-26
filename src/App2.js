import React, { useState } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Grommet } from 'grommet';
import constate from 'constate';

import theme from './config/theme';
import { defaultInitials } from './config';

import Setup from './phases/setup';
import Hatch from './phases/hatch';
import Trade from './phases/trade';

function useInitials() {
  const [initials, setInitials] = useState(defaultInitials);

  const setInitial = (initial) => {
    setInitials({ ...initials, ...initial });
  };

  return { initials, setInitial };
}

export const [InitialsProvider, useInitialsContext] = constate(useInitials);

export default function App() {
  let location = useLocation();

  return (
    <Grommet theme={theme}>
      <InitialsProvider>
        <Switch location={location}>
          <Route path="/v2">
            <Redirect to="/setup" />
          </Route>
          <Route path="/setup">
            <Setup />
          </Route>

          <Route path="/hatch">
            <Hatch />
          </Route>

          <Route path="/trade">
            <Trade />
          </Route>
        </Switch>
      </InitialsProvider>
    </Grommet>
  );
}
