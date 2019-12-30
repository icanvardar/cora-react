import axios from 'axios';
import {headerSetter} from '../../../helper/headerSetter';

export const deleteLike = async (token, data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/ucLikes/delete`, data, headerSetter(token))
    .then(res => {
      callback !== null && callback(res)
    })
    .catch(err => {
      errorcallback !== null && errorcallback(err)
    })
}

export const isIt = async (token, data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/ucLikes/isIt`, data, headerSetter(token))
    .then(res => {
      callback !== null && callback(res)
    })
    .catch(err => {
      errorcallback !== null && errorcallback(err)
    })
}