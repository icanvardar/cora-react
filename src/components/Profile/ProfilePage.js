import React from 'react';
import { withCookies } from 'react-cookie';

const ProfilePage = (props) => {
    return (
        <h1>This is Profile Page Component!</h1>
    )
}

export default withCookies(ProfilePage);