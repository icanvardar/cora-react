import axios from 'axios';

export const loginUser = async (data, callback, errorcallback) => { 

    await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, data)
      .then(res => {
        callback !== null && callback(res)
      })
      .catch(err => {
        errorcallback !== null && errorcallback(err)
      })
}

export const registerUser = async (data, callback, errorcallback) => { 
    await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, data)
      .then(res => {
          callback !== null && callback(res)
      })
      .catch(err => {
          errorcallback !== null && errorcallback(err)
      })
}

export const sendVerification = async (data, callback, errorcallback) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/users/mailcontrol`, data)
      .then(res => {
        callback !== null && callback(res)
      })
      .catch(err => {
        errorcallback !== null && errorcallback(err)
      })
}

export const forgottenpassword1 = async (data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/users/forgottenpassword1`, data)
    .then(res => {
      callback !== null && callback(res)
    })
    .catch(err => {
      errorcallback !== null && errorcallback(err)
    })
}

export const forgottenpassword2 = async (data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/users/forgottenpassword2`, data)
    .then(res => {
      callback !== null && callback(res)
    })
    .catch(err => {
      errorcallback !== null && errorcallback(err)
    })
}

export const forgottenpassword3 = async (data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/users/forgottenpassword3`, data)
    .then(res => {
      callback !== null && callback(res)
    })
    .catch(err => {
      errorcallback !== null && errorcallback(err)
    })
}