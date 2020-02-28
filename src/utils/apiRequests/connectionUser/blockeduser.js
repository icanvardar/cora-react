import axios from 'axios';
import { headerSetter } from '../../../helper/headerSetter';

export const add = async (token, data, callback, errorcallback) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/ucBlockedUser/add`, data, headerSetter(token))
        .then(res => {
            callback !== null && callback(res)
        })
        .catch(err => {
            errorcallback !== null && errorcallback(err)
        })
}

export const remove = async (token, data, callback, errorcallback) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/ucBlockedUser/remove`, data, headerSetter(token))
        .then(res => {
            callback !== null && callback(res)
        })
        .catch(err => {
            errorcallback !== null && errorcallback(err)
        })
}

export const list = async (token, data, callback, errorcallback) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/ucBlockedUser/list`, data, headerSetter(token))
        .then(res => {
            callback !== null && callback(res)
        })
        .catch(err => {
            errorcallback !== null && errorcallback(err)
        })
}