import React from 'react';

import './App.css';

import HomePage from './components/Home/HomePage';
import LoginForm from './components/Login/LoginPage';
import RegisterForm from './components/Register/RegisterPage';
import ProfilePage from './components/Profile/ProfilePage';
import SelectivePage from './components/Selective/SelectivePage';

import { Router, Switch, Route, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory({forceRefresh: true});

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={() => <HomePage/>}></Route>
        <Route path="/selective" component={() => <SelectivePage/>}></Route>
        <Route path="/login" component={() => <LoginForm />}></Route>
        <Route path="/register" component={() => <RegisterForm/>}></Route>
        <Route path="/profile" component={() => <ProfilePage/>}></Route>
      </Switch>
    </Router>
  );
}

export default App;
