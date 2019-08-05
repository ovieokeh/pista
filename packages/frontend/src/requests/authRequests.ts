import Axios from 'axios';
import dotenv from 'dotenv';

const apiUrl = process.env.API_URL;

interface iUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface iLoginDetails {
  email: string;
  password: string;
}

export const signupRequest = async (
  userDetails: iUserDetails
): Promise<any> => {
  const url = `${apiUrl}/signup`;

  try {
    const response = await Axios.post(url, userDetails);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginRequest = async (
  userDetails: iLoginDetails
): Promise<any> => {
  const url = `${apiUrl}/login`;

  try {
    const response = await Axios.post(url, userDetails);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};
