import React, {useEffect} from 'react';
import './App.css';

import Context from './utils/Context';

import {tokenGatherer, usernameGatherer} from './helper/cookieHandler';

import { Router, Switch, Route } from 'react-router-dom';
import { CookiesProvider, withCookies } from 'react-cookie';
import createHistory from 'history/createBrowserHistory';

import DefaultContainer from './containers/DefaultContainer';
import LoginContainer from './containers/LoginContainer';
import RegisterContainer from './containers/RegisterContainer';

export const history = createHistory({forceRefresh: true});

const App = (props) => {
  useEffect(() => {
    console.log('CORA');
  }, [])

  return (
    <Context.Provider value={{token: tokenGatherer(props), username: usernameGatherer(props)}}>
      <CookiesProvider>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={() => <LoginContainer/>}></Route>
            <Route path="/register" component={() => <RegisterContainer/>}></Route>
            <Route component={() => <DefaultContainer/>}></Route>
          </Switch>
        </Router>
      </CookiesProvider>
    </Context.Provider>
  );
}

export default withCookies(App);
