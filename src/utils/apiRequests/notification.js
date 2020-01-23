import axios from 'axios';
import {headerSetter} from '../../helper/headerSetter';

export const joinCEP = async (token, data, callback, errorcallback) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/notifications/addcepanduser`, data, headerSetter(token))
      .then(res => {
        callback !== null && callback(res)
      })
      .catch(err => {
        errorcallback !== null && errorcallback(err)
      })
}

export const addFollowings = async (token, data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/notifications/addfollowings`, data, headerSetter(token))
    .then(res => {
      callback !== null && callback(res)
    })
    .catch(err => {
      errorcallback !== null && errorcallback(err)
    })
}

export const quitFollowings = async (token, data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/notifications/quitfollowings`, data, headerSetter(token))
    .then(res => {
      callback !== null && callback(res)
    })
    .catch(err => {
      errorcallback !== null && errorcallback(err)
    })
}

export const addLikes = async (token, data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/notifications/addlikes`, data, headerSetter(token))
    .then(res => {
      callback !== null && callback(res)
    })
    .catch(err => {
      errorcallback !== null && errorcallback(err)
    })
}

export const addComments = async (token, data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/notifications/addcomments`, data, headerSetter(token))
    .then(res => {
      callback !== null && callback(res)
    })
    .catch(err => {
      errorcallback !== null && errorcallback(err)
    })
}
