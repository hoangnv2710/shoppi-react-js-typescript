import { ILogin, IResponse, IPageginate, IRegister } from '@/types/api';
import axios from 'services/axios.customize'

const loginAPI = async (username: string, password: string) => {
    const url = "/api/v1/auth/login";
    const response = await axios.post<IResponse<ILogin>>(url, { username, password }, {
        headers: {
            delay: 500,
        }
    });
    return response.data;
}

const registerAPI = async (fullName: string, email: string, password: string, phone: string) => {
    // console.log(fullName, email, password, phone);
    const url = "/api/v1/user/register";
    const response = await axios.post<IResponse<IRegister>>(url, { fullName, email, password, phone });
    return response.data;
}

const fetchAccountAPI = async () => {
    const url = "/api/v1/auth/account";
    const response = await axios.get<IResponse<{ user: IUser }>>(url, {
        headers: {
            delay: 500,
        }
    });
    return response.data;
}

const logoutAPI = async () => {
    const url = "/api/v1/auth/logout";
    const response = await axios.post<IResponse<string>>(url);
    return response.data;
}

// const getUsersAPI = async (current: number, pageSize: number) => {
//     const url = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
//     const response = await axios.get<IResponse<IPageginate<IUserDetail[]>>>(url);
//     return response.data;
// }

const getUsersAPI = async (query: string) => {
    const url = `/api/v1/user?${query}`;
    const response = await axios.get<IResponse<IPageginate<IUserDetail[]>>>(url);
    return response.data;
}

export { loginAPI, registerAPI, fetchAccountAPI, logoutAPI, getUsersAPI }