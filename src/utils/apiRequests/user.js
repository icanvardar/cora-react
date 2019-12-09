import axios from 'axios';
import {history} from '../../App';

export const loginUser = async (data) => { 
    await axios.post('http://localhost:3000/users/login', 
            data
        ).then(res => {
            console.log(res);
            //history.push('/');
        }).catch(err => {
            console.log(err)
        })
}

export const registerUser = async (data) => { 
    await axios.post('http://localhost:3000/users/register', 
            data
        ).then(res => {
            console.log(res);
            // history.push('/login');
        }).catch(err => {
            console.log(err)
        })
}