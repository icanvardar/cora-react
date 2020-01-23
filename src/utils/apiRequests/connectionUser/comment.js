import axios from 'axios';
import {headerSetter} from '../../../helper/headerSetter';

export const getComments = async (token, data, callback, errorcallback) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/ucComments/getcomments`, data, headerSetter(token))
      .then(res => {
        callback !== null && callback(res)
      })
      .catch(err => {
        errorcallback !== null && errorcallback(err)
      })
  }

export const deleteComment = async (token, data, callback, errorcallback) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/ucComments/delete`, data, headerSetter(token))
        .then(res => {
        callback !== null && callback(res)
        })
        .catch(err => {
        errorcallback !== null && errorcallback(err)
        })
    }

export const count = async (token, data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/ucComments/count`, data, headerSetter(token))
      .then(res => {
      callback !== null && callback(res)
      })
      .catch(err => {
      errorcallback !== null && errorcallback(err)
      })
  }