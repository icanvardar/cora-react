import axios from 'axios';
import {headerSetter} from '../../../helper/headerSetter';

export const getUserData = async (token, data, callback, errorcallback) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/ucAlldata/getUserData`, data, headerSetter(token))
      .then(res => {
        callback !== null && callback(res)
      })
      .catch(err => {
        errorcallback !== null && errorcallback(err)
      })
}

export const getUsers = async (token, data, callback, errorcallback) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/ucAlldata/getusers`, data, headerSetter(token))
      .then(res => {
        callback !== null && callback(res)
      })
      .catch(err => {
        errorcallback !== null && errorcallback(err)
      })
}

// Gets homepage posts that belong to current user
export const getAllData = async (token, data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/ucAlldata/getallData`, data, headerSetter(token))
    .then(res => {
      callback !== null && callback(res)
    })
    .catch(err => {
      errorcallback !== null && errorcallback(err)
    })
}

// Makes user join CEP
export const joinCEP = async (token, data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/ucAlldata/addcepanduser`, data, headerSetter(token))
    .then(res => {
      callback !== null && callback(res)
    })
    .catch(err => {
      errorcallback !== null && errorcallback(err)
    })
}

// Makes use quit CEP
export const quitCEP = async (token, data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/ucAlldata/quit`, data, headerSetter(token))
    .then(res => {
      callback !== null && callback(res)
    })
    .catch(err => {
      errorcallback !== null && errorcallback(err)
    })
}

// Checks if user joined CEP or not
export const isJoinedCEP = async (token, data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/ucAlldata/isIt`, data, headerSetter(token))
    .then(res => {
      callback !== null && callback(res)
    })
    .catch(err => {
      errorcallback !== null && errorcallback(err)
    })
}