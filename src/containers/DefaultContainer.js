import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import HomePage from '../components/Home/HomePage';
import ProfilePage from '../components/Profile/ProfilePage';
import ProtectedRoute from '../helper/ProtectedRoute';

const DefaultContainer = (props) => (
    <Fragment>
      <Navbar/>
      <Route path="/" exact component={() => <HomePage/>}></Route>
      <Route path="/profile/:id" exact render={(props) => (
        <ProfilePage {...props} />
      )}></Route>
    </Fragment>
)

export default DefaultContainer;