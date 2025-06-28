import { ILogin } from '@/types/api';
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
    return response;
}

export { loginAPI }