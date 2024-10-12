import { api } from '@/services/api';
import { ILogin } from '@/interfaces/IUser';

/**
 * Sends a login request to the server.
 * @param email The user's email for login.
 * @param password The user's password for login.
 * @returns The user information if the login is successful, or null if an error occurs.
 */
export async function LoginRequest(login: ILogin) {
  try {
    const response = await api.post('/login/', login);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


/**
 * Retrieves the user profile from the server.
 * @returns The user's profile information.
 */
export async function getProfile() {
  const userDataString = localStorage.getItem('u');
  console.log(userDataString)

  if (!userDataString) {
    throw new Error("User data not found in local storage");
  }

  const userData = JSON.parse(userDataString);
  const token = userData.token;

  if (!token) {
    throw new Error("Token not found in user data");
  }

  try {
    const response = await api.get('/profile/', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
