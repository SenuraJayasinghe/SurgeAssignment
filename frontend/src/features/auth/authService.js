import axios from 'axios'

//The rest of the path is under "proxy" in the FE package.json
const API_URL = '/api/users/'

//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//Login user
const login = async (userData) => {
    // console.log(userData)
    const response = await axios.post(API_URL + 'login', userData)
    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

//update user
const update = async (userData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
    const response = await axios.put(API_URL + 'update', userData, config);
  
    return response.data;
  };

const authService = {
    register,
    logout,
    login,
    update
}

export default authService