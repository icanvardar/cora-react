import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import HomePage from '../components/Home/HomePage';
import ProfilePage from '../components/Profile/ProfilePage';

const DefaultContainer = () => (
    <Fragment>
      <Navbar/>
      <Route path="/" exact component={() => <HomePage/>}></Route>
      <Route path="/profile" component={() => <ProfilePage/>}></Route>
    </Fragment>
)

export default DefaultContainer;