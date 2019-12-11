import React from 'react';
import './App.css';

import { Router, Switch, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import createHistory from 'history/createBrowserHistory';

import DefaultContainer from './containers/DefaultContainer';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';

export const history = createHistory({forceRefresh: true});

const App = (props) => {
  return (
    <CookiesProvider>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={() => <LoginContainer/>}></Route>
          <Route path="/register" component={() => <RegisterContainer/>}></Route>
          <Route component={() => <DefaultContainer/>}></Route>
        </Switch>
      </Router>
    </CookiesProvider>
  );
}

export default App;
