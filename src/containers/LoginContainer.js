import React, {Fragment} from 'react';
import {Route} from 'react-router-dom'
import LoginPage from '../components/Login/LoginPage';

const LoginContainer = (props) => (
    <Fragment>
      <Route path="/login" component={() => <LoginPage />}></Route>
    </Fragment>
  )

export default LoginContainer;