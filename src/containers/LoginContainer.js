import React, {Fragment} from 'react';
import {Route} from 'react-router-dom'
import LoginPage from '../components/Login/LoginPage';
import ProtectedRoute from '../helper/ProtectedRoute';

const LoginContainer = (props) => (
    <Fragment>
      <ProtectedRoute path="/login" component={() => <LoginPage />}></ProtectedRoute>
    </Fragment>
  )

export default LoginContainer;