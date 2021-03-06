import axios from 'axios'
import _Auth from './Auth'

axios.defaults.baseURL = process.env.REACT_APP_ENDPOINT
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const Auth = _Auth(axios)
