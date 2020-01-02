import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import HomePage from '../components/Home/HomePage';
import ProfilePage from '../components/Profile/ProfilePage';
import PostPreviewProvider from '../components/PostPreview/PostPreviewProvider';
import ProtectedRoute from '../helper/ProtectedRoute';

const DefaultContainer = (props) => (
    <Fragment>
      <Navbar/>
      <Route path="/" exact component={() => <HomePage/>}></Route>
      <Route path="/profile/:id" exact render={(props) => (
        <ProfilePage {...props} />
      )}></Route>
      <Route path="/post/:id" exact render={(props) => (
        <PostPreviewProvider {...props} />
      )}></Route>
      <Footer />
    </Fragment>
)

export default DefaultContainer;