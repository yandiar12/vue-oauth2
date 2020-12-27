import { API_BASE_URL } from '../config/constant'
import service from '../config/service.config'

const UserService = {
  getUserDetails(token) {
    const url = API_BASE_URL + 'user/me'
    const options = {
      headers : {
        'Authorization': 'Bearer ' + token
      }
    }

    return service.get(url, options)
  }
}

export default UserService