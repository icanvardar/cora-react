import axios from 'axios';
import {history} from '../../App';

// sets the header within token as x-access-token which is defined in servers
const setHeader = (token) => (
  {
    headers: {
      'x-access-token': token
    }
  }
)

export const findUser = async (token, data, callback, errorcallback) => { 

    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/usersWithToken/finduser`, data, setHeader(token))
      .then(res => {
        callback !== null && callback(res)
      })
      .catch(err => {
        errorcallback !== null && errorcallback(err)
      })
}

export const userInfToken = async (token, callback, errorcallback) => {

    await axios.post(`${process.env.REACT_APP_BASE_URL}/api/usersWithToken/userinftoken`, '', setHeader(token))
      .then(res => {
        callback !== null && callback(res)
      })
      .catch(err => {
        errorcallback !== null && errorcallback(err)
      })
  }