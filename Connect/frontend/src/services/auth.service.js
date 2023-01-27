import axios from 'axios'

const API_URL = "/auth/"

const register = (user) => {
  // const user = {
  //   email: email,
  //   name: name,
  //   username: username,
  //   password: password,
  // }
  return axios.post(API_URL + "register", user)
}

const login = (username, password) => {
  return axios.post(API_URL + "login", {
    username,
    password
  })
    .then((response) => {
      console.log(response.data)
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data))
      }
      return response.data
    })
}

const logout = () => {
  localStorage.removeItem("user")
}


export default {
  register,
  login,
  logout
}