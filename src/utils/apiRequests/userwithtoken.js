import axios from 'axios';
import {headerSetter} from '../../helper/headerSetter';

export const findUser = async (token, data, callback, errorcallback) => { 
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/usersWithToken/finduser`, data, headerSetter(token))
      .then(res => {
        callback !== null && callback(res)
      })
      .catch(err => {
        errorcallback !== null && errorcallback(err)
      })
}

export const userInfToken = async (token, callback, errorcallback) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/usersWithToken/userinftoken`, '', headerSetter(token))
      .then(res => {
        callback !== null && callback(res)
      })
      .catch(err => {
        errorcallback !== null && errorcallback(err)
      })
  }

export const userInfSearch = async (token, data, callback, errorcallback) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/usersWithToken/userinfSearch`, data, headerSetter(token))
        .then(res => {
          callback !== null && callback(res)
        })
        .catch(err => {
          errorcallback !== null && errorcallback(err)
        })
}

export const update = async (token, data, callback, errorcallback) => {
  await axios.put(`${process.env.REACT_APP_BASE_URL}/api/usersWithToken/update`, data, headerSetter(token))
      .then(res => {
        callback !== null && callback(res)
      })
      .catch(err => {
        errorcallback !== null && errorcallback(err)
      })
}

export const changePassword = async (token, data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/usersWithToken/changepassword`, data, headerSetter(token))
      .then(res => {
        callback !== null && callback(res)
      })
      .catch(err => {
        errorcallback !== null && errorcallback(err)
      })
}

export const topTwenty = async (token, callback, errorcallback) => {
  await axios.get(`${process.env.REACT_APP_BASE_URL}/api/usersWithToken/top20`, headerSetter(token))
      .then(res => {
        callback !== null && callback(res)
      })
      .catch(err => {
        errorcallback !== null && errorcallback(err)
      })
}