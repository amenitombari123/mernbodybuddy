import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** Make API Requests */

/** authenticate function */
export async function authenticate(username){
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

/** get User details */
export async function getUser({ username }){
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}

/** register user function */
export async function registerUser(data) {
    try {
      const response = await axios.post('/api/register', data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle bad request errors
        return error.response.data;
      } else {
        // Handle other errors
        return { error: 'Could not Register' };
      }
    }
  }
  

/** login function */
export async function verifyPassword({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}
/** update user profile function */


export async function updateUser(response) {
  try {
    const token = await localStorage.getItem('token');
    const data = await axios.put('/api/updateuser', response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Check if the API request was successful
    if (data.status === 200) {
      return Promise.resolve({ data });
    } else {
      return Promise.reject({ error: 'Failed to update profile' });
    }
  } catch (error) {
    if (error.response && error.response.data) {
      // If the server provides an error message, return it
      return Promise.reject({ error: error.response.data.message });
    } else {
      // Handle other types of errors
      console.error('Error updating profile:', error);
      return Promise.reject({ error: 'Failed to update profile' });
    }
  }
}

/** generate OTP */
export async function generateOTP(username){
    try {
        const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { username }});

        // send mail with the OTP
        if(status === 201){
            let { data : { email }} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}
/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}
