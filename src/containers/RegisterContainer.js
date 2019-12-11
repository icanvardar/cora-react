import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import SelectivePage from '../components/Selective/SelectivePage';
import RegisterPage from '../components/Register/RegisterPage';

const RegisterContainer = (props) => (
    <Fragment>
      <Route path="/register" exact component={() => <SelectivePage/>}></Route>
      <Route path="/register/:type" exact render={(props) => (
        <RegisterPage {...props} />
      )}></Route>
    </Fragment>
)

export default RegisterContainer;