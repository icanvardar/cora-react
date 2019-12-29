import React, { useState, useEffect, useContext } from 'react';
import UserRegisterForm from './UserRegisterForm';
import UniversityRegisterForm from './UniversityRegisterForm';
import Context from '../../utils/Context';
import {history} from '../../App';

const RegisterPage = ({match, location}) => {
    const [param, setParam] = useState();
    const {token} = useContext(Context);

    useEffect(() => {
        const searchType = match.params.type;

        token ? history.push('/')
        : 
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