
const AuthHeader = {
  getAuthData() {
    const data = JSON.parse(localStorage.getItem('user'));
    return data;
  },

  saveAuthData(data) {
    localStorage.setItem("user", JSON.stringify(data))
  },

  removeAuthData() {
    localStorage.removeItem("user")
  }
}

export { AuthHeader } 