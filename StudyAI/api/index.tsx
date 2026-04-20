import axios from './axios';

export const signUp = async (userData: any) => {
    return await axios.post('/signup', userData);
}