import { useState } from 'react';
import Auth ,{UserProps}from './Auth';
import axios from 'axios';
import {BASE_URL,API_KEY} from '../app.json'

class User extends Auth {
  public async verifyEmail(email: string): Promise<number> {
      const response = await axios.post(`${BASE_URL}/otp/`, { email, apiKey: API_KEY });
      return response.data.otp;
  }

  public async register(user: UserProps): Promise<void> {
      const response = await axios.post(`${BASE_URL}/auth/register`, { ...user, apiKey: API_KEY });
      console.log(response.data);
  }
}


export default User;