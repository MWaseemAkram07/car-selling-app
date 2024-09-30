import axios from 'axios';

export const signInUser = async (email, password) => {
  try {
    // Make the API call to the backend to validate the user
    const response = await axios.post('http://localhost:5000/api/sign-in', { email, password });
    console.log({response})

    // Handle success response (e.g., return user data or token)
    if (response.data.success) {
      return { success: true, message: 'Logged in successfully!', token: response.data.token };
    } else {
      return { success: false, message: 'Invalid Email or Password' };
    }
  } catch (error) {
    console.error('Error signing in:', error);
    return { success: false, message: 'server error, user not found' };
  }
};
