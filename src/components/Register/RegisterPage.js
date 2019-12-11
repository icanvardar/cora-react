import React, { Fragment, useState, useEffect } from 'react';
import UserRegisterForm from './UserRegisterForm';
import UniversityRegisterForm from './UniversityRegisterForm';

const RegisterPage = ({match, location}) => {
    const [param, setParam] = useState();

    useEffect(() => {
        const searchType = match.params.type;
        setParam(searchType);
    }, [])

    return (
        <div className="page">
            {
                param ===  'user' && <UserRegisterForm /> 
            }
            {
                param ===  'university' && <UniversityRegisterForm/>
            }
        </div>
    )
}

export default RegisterPage;