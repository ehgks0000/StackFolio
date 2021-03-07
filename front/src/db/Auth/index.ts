import { AxiosInstance, AxiosResponse } from 'axios'
import LoginInfoTypes from './IAuth'

const base_url: string = '/auth'
const Auth = (requests: AxiosInstance) => ({
  register: (loginInfo: LoginInfoTypes): Promise<AxiosResponse> => {
    return requests.post(`${base_url}/register`, JSON.stringify(loginInfo))
  },
  google: {
    register: (email: string): Promise<AxiosResponse> => {
      return requests.post(`${base_url}/send-register-mail`, JSON.stringify({ email }))
    },
    signIn: (email: string): Promise<AxiosResponse> => {
      return requests.post(`${base_url}/send-login-mail`, JSON.stringify({ email }))
    },
    verify: (code: string): Promise<AxiosResponse> => {
      return requests.get(`${base_url}/verify/${code}`)
    },
    getToken: (): Promise<AxiosResponse> => {
      return requests.get(`${base_url}/google`)
    },
  },
  facebook: {},
  github: {},
})

export default Auth
