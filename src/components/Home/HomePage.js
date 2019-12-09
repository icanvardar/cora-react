import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
    return (
        <div>
            <Link to='/selective'>Seçim Ekranı</Link>
            <Link to='/login'>Giriş Ekranı</Link>
            <Link to='/register'>Kayıt Ekranı</Link>
            <h1>This is Home Page Component!</h1>
        </div>
    )
}