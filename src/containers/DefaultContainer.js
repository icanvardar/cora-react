import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ProfilePage from '../components/Profile/ProfilePage';
import SettingsPage from '../components/SettingsPage/SettingsPage';
import ProtectedRoute from '../helper/ProtectedRoute';

import Tabs from  '../components/Tabs/Tabs';

const DefaultContainer = (props) => (
    <Fragment>
      <Navbar/>

      <Route path="/" exact render={(props) => (
        <Tabs {...props} />
      )}></Route>

      <Route path="/profile/:id" exact render={(props) => (
        <ProfilePage {...props} />
      )}></Route>

      {
        // Homepage tabs are linkable
      }

      <Route path="/concerts" render={(props) => (
        <Tabs {...props} />
      )}></Route>

      <Route path="/events" render={(props) => (
        <Tabs {...props} />
      )}></Route>

      <Route path="/parties" render={(props) => (
        <Tabs {...props} />
      )}></Route>

      <ProtectedRoute path="/settings" component={() => <SettingsPage />}></ProtectedRoute>

      <Footer />
    </Fragment>
)

export default DefaultContainer;