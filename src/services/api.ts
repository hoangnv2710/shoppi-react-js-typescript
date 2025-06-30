import { ILogin, IRegister } from '@/types/api';
import axios from 'services/axios.customize'

interface IResponse<T> {
    error?: string | string[];
    message: string;
    statusCode: number;
    data?: T;
}

const loginAPI = async (username: string, password: string) => {
    const url = "/api/v1/auth/login";
    const response = await axios.post<IResponse<ILogin>>(url, { username, password });
    return response.data;
}


const registerAPI = async (fullName: string, email: string, password: string, phone: string) => {
    // console.log(fullName, email, password, phone);
    const url = "/api/v1/user/register";
    const response = await axios.post<IResponse<IRegister>>(url, { fullName, email, password, phone });
    return response.data;
}

export { loginAPI, registerAPI }