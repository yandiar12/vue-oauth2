import { API_BASE_URL } from '../config/constant'
import service from '../config/service.config'

const AuthService = {
  
  signup(data) {
    const url = API_BASE_URL + 'auth/signup'
    return service.post(url, data)
  },

  signin(data) {
    const url = API_BASE_URL + 'auth/login'
    return service.post(url, data)
  }

}

export default AuthService
export { AuthService }