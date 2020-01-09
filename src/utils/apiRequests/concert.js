import axios from 'axios';
import {headerSetter} from '../../helper/headerSetter';
import {history} from '../../App';

export const getConcerts = async (token, data, callback, errorcallback) => {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/concerts/getconcerts1`, data, headerSetter(token))
      .then(res => {
        callback !== null && callback(res)
      })
      .catch(err => {
        errorcallback !== null && errorcallback(err)
      })
}

export const joinConcert = async (token, data, callback, errorcallback) => {
  await axios.post(`${process.env.REACT_APP_BASE_URL}/api/concerts/joinconcert`, data, headerSetter(token))
    .then(res => {
      callback !== null && callback(res)
    })
    .catch(err => {
      errorcallback !== null && errorcallback(err)
    })
}