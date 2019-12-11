import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { withCookies } from 'react-cookie';

const HomePage = (props) => {
    useEffect(() => {
        const token = props.cookies.cookies.SESSION_ID;
        console.log(token);
    }, [])

    return (
        <div>
            <Link to='/register'>Seçim Ekranı</Link>
            <Link to='/login'>Giriş Ekranı</Link>
            <h1>This is Home Page Component!</h1>
        </div>
    )
}

export default withCookies(HomePage);